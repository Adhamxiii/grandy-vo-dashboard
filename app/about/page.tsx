"use client";

import { useEffect, useState } from "react";
import { CameraIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

export default function AboutPage() {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>(["", ""]);
  const [loading, setLoading] = useState(false);
  const [isContentCreated, setIsContentCreated] = useState(false);
  const [numberOfClients, setNumberOfClients] = useState<number | "">("");
  const [voiceStyles, setVoiceStyles] = useState<number | "">("");
  const [language, setLanguage] = useState<number | "">("");
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (index: number, file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "grandy");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const newImages = [...images];
      newImages[index] = data.secure_url;
      setImages(newImages);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    const getAbout = async () => {
      setDataLoading(true);
      try {
        const response = await axios.get("/api/about");

        if (response.data) {
          setContent(response.data.content);
          setImages([response.data.imageUrl, response.data.imageUrl2]);
          setNumberOfClients(response.data.clients);
          setVoiceStyles(response.data.voiceStyles);
          setLanguage(response.data.language);
          setIsContentCreated(true);
        }
      } catch (error) {
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", error);
      } finally {
        setDataLoading(false);
      }
    };
    getAbout();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || images.some((image) => !image)) {
      alert("Please add content and upload two images.");
      return;
    }

    setLoading(true);

    try {
      let response;
      if (isContentCreated) {
        response = await axios.put("/api/about", {
          content,
          images,
          numberOfClients,
          voiceStyles,
          language,
        });
      } else {
        response = await axios.post("/api/about", {
          content,
          images,
          numberOfClients,
          voiceStyles,
          language,
        });
      }

      if (!response.data) {
        throw new Error("Failed to save data");
      }

      toast.success("Data saved successfully");
      setIsContentCreated(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          About Page Content
        </h3>
        {dataLoading ? (
          <div className="text-center text-indigo-400">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-6">
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Content
              </label>
              <div className="mt-1">
                <textarea
                  id="content"
                  rows={4}
                  className="shadow-sm focus:ring-indigo-500 border focus:border focus:ring-2 focus:outline-none focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-3 py-2 text-gray-700"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    {image ? (
                      <Image
                        src={image}
                        alt={`Uploaded ${index + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="h-48 flex items-center justify-center">
                        <CameraIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(index, file);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 space-x-4 justify-between max-md:flex-col">
              <div className="flex-1">
                <label
                  htmlFor="numberOfClients"
                  className="block text-sm font-medium text-gray-700"
                >
                  Number of Clients
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="numberOfClients"
                    className="shadow-sm focus:ring-indigo-500 border focus:border focus:ring-2 focus:outline-none focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-3 py-2 text-gray-700"
                    value={numberOfClients}
                    onChange={(e) => setNumberOfClients(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="voiceStyles"
                  className="block text-sm font-medium text-gray-700"
                >
                  Voice Styles
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="voiceStyles"
                    className="shadow-sm focus:ring-indigo-500 border focus:border focus:ring-2 focus:outline-none focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-3 py-2 text-gray-700"
                    value={voiceStyles}
                    onChange={(e) => setVoiceStyles(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700"
                >
                  Language
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="language"
                    className="shadow-sm focus:ring-indigo-500 border focus:border focus:ring-2 focus:outline-none focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-3 py-2 text-gray-700"
                    value={language}
                    onChange={(e) => setLanguage(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
