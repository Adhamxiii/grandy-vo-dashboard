"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

interface Project {
  id: string;
  title: string;
  videoUrl: string;
  duration: string;
  description: string;
}

const Projects = ({ initialProjects }: { initialProjects: Project[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [editProjectId, setEditProjectId] = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newProject, setNewProject] = useState({
    title: "",
    videoUrl: "",
    duration: "",
    description: "",
  });

  const openDialogForNew = () => {
    setNewProject({ title: "", videoUrl: "", duration: "", description: "" });
    setEditProjectId(null);
    setIsOpen(true);
  };

  const openDialogForEdit = (project: Project) => {
    setNewProject({
      title: project.title,
      videoUrl: project.videoUrl,
      duration: project.duration,
      description: project.description,
    });
    setEditProjectId(project.id);
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editProjectId) {
      try {
        const response = await fetch(`/api/projects?id=${editProjectId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProject),
        });
        if (!response.ok) throw new Error("Failed to update project");
        toast.success("Project is added");
        const updatedProject = await response.json();
        setProjects((prev) =>
          prev.map((project) =>
            project.id === editProjectId ? updatedProject : project
          )
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProject),
        });
        if (!response.ok) throw new Error("Failed to add project");
        const createdProject = await response.json();
        setProjects((prev) => [...prev, createdProject]);
      } catch (error) {
        console.error(error);
      }
    }

    setIsOpen(false);
    setNewProject({ title: "", videoUrl: "", duration: "", description: "" });
    setEditProjectId(null);
  };

  const deleteProject = async (id: string) => {
    console.log(id);
    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete project");
      setProjects((prev) => prev.filter((project) => project.id !== id));
      toast.success("Project is deleted");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={openDialogForNew}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add Project
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Title
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Video ID
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Duration
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Description
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {projects?.map((project) => (
                    <tr key={project.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {project.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {project.videoUrl}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {project.duration}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {project.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => openDialogForEdit(project)}
                          className="ml-4 text-indigo-600 hover:text-indigo-900"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {projects.length === 0 && (
                <div className="text-center flex flex-col items-center w-full py-4">
                  <CameraIcon className="h-8 w-8 text-gray-400" />
                  <p className="text-black">No Data Available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        {editProjectId ? "Update Project" : "Add New Project"}
                      </Dialog.Title>
                      <div className="mt-2 space-y-4">
                        <div>
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Title
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            className="mt-1 block w-full rounded-md border-2 border-indigo-300 shadow-sm focus:border-indigo-500 sm:text-sm focus:border-2 focus:outline-none text-gray-700 py-2 px-3"
                            value={newProject.title}
                            onChange={(e) =>
                              setNewProject({
                                ...newProject,
                                title: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="videoUrl"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Video ID
                          </label>
                          <input
                            type="text"
                            name="videoUrl"
                            id="videoUrl"
                            className="mt-1 block w-full rounded-md border-2 border-indigo-300 shadow-sm focus:border-indigo-500 sm:text-sm focus:border-2 focus:outline-none text-gray-700 py-2 px-3"
                            value={newProject.videoUrl}
                            onChange={(e) =>
                              setNewProject({
                                ...newProject,
                                videoUrl: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="duration"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Duration
                          </label>
                          <input
                            type="text"
                            name="duration"
                            id="duration"
                            className="mt-1 block w-full rounded-md border-2 border-indigo-300 shadow-sm focus:border-indigo-500 sm:text-sm focus:border-2 focus:outline-none text-gray-700 py-2 px-3"
                            value={newProject.duration}
                            onChange={(e) =>
                              setNewProject({
                                ...newProject,
                                duration: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <textarea
                            name="description"
                            id="description"
                            rows={3}
                            className="mt-1 block w-full rounded-md border-2 border-indigo-300 shadow-sm focus:border-indigo-500 sm:text-sm focus:border-2 focus:outline-none text-gray-700 py-2 px-3"
                            value={newProject.description}
                            onChange={(e) =>
                              setNewProject({
                                ...newProject,
                                description: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        {editProjectId ? "Update" : "Add"}
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Projects;
