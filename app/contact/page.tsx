"use client";
import axios from "axios";
import { useEffect, useState } from "react";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function ContactPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/contact");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">
          Contact Messages
        </h1>

        {loading ? (
          <div className="text-center text-indigo-700">Loading...</div>
        ) : messages.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200"
              >
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {message.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{message.email}</p>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <p className="text-sm text-gray-500">{message.message}</p>
                </div>
                <div className="px-4 py-4 sm:px-6">
                  <div className="text-sm text-gray-500">
                    Received on:{" "}
                    {new Date(message.createdAt).toLocaleDateString("en-GB")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-indigo-700">No messages yet</div>
        )}
      </div>
    </div>
  );
}
