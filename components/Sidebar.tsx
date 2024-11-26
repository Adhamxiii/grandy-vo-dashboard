"use client";

import {
  ArrowLeftOnRectangleIcon,
  FolderIcon,
  HomeIcon,
  NewspaperIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen flex-col justify-between bg-indigo-900">
      <div className="px-4 py-6">
        <Link href="/dashboard" className="flex items-center gap-2 h-10">
          <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
            <span className="text-indigo-200 font-bold text-xl">G</span>
          </div>
          <span className="text-xl font-bold text-white max-md:hidden">
            <Image
              src="/logo.png"
              alt="logo"
              width={150}
              height={100}
              className="h-20 object-cover"
            />
          </span>
        </Link>

        <nav className="mt-8 space-y-2 max-md:hidden">
          <Link
            href="/about"
            className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              pathname === "/about"
                ? "bg-indigo-800 text-white"
                : "text-indigo-200 hover:bg-indigo-800 hover:text-white"
            }`}
          >
            <HomeIcon className="h-5 w-5" />
            About
          </Link>

          <Link
            href="/projects"
            className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              pathname === "/projects"
                ? "bg-indigo-800 text-white"
                : "text-indigo-200 hover:bg-indigo-800 hover:text-white"
            }`}
          >
            <FolderIcon className="h-5 w-5" />
            Projects
          </Link>

          <Link
            href="/contact"
            className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              pathname === "/contact"
                ? "bg-indigo-800 text-white"
                : "text-indigo-200 hover:bg-indigo-800 hover:text-white"
            }`}
          >
            <NewspaperIcon className="h-5 w-5" />
            Contact
          </Link>
        </nav>

        <nav className="mt-8 space-y-2 block md:hidden">
          <Link
            href="/about"
            className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              pathname === "/about"
                ? "bg-indigo-800 text-white"
                : "text-indigo-200 hover:bg-indigo-800 hover:text-white"
            }`}
          >
            <HomeIcon className="h-5 w-5" />
            <span className="hidden md:inline">About</span> {/* Hide on small screens */}
          </Link>

          <Link
            href="/projects"
            className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              pathname === "/projects"
                ? "bg-indigo-800 text-white"
                : "text-indigo-200 hover:bg-indigo-800 hover:text-white"
            }`}
          >
            <FolderIcon className="h-5 w-5" />
            <span className="hidden md:inline">Projects</span> {/* Hide on small screens */}
          </Link>

          <Link
            href="/contact"
            className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              pathname === "/contact"
                ? "bg-indigo-800 text-white"
                : "text-indigo-200 hover:bg-indigo-800 hover:text-white"
            }`}
          >
            <NewspaperIcon className="h-5 w-5" />
            <span className="hidden md:inline">Contact</span> {/* Hide on small screens */}
          </Link>
        </nav>
      </div>

      {/* <div className="sticky inset-x-0 bottom-0 border-t border-indigo-800 p-4">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
            <UserCircleIcon className="h-6 w-6 text-indigo-200" />
          </div>

          <div>
            <p className="text-sm">
              <strong className="block font-medium text-white">
                Admin User
              </strong>
              <span className="text-indigo-200">admin@grandy.com</span>
            </p>
          </div>

          <button
            onClick={() => {
              signOut()
            }}
            className="ml-auto rounded-lg p-2 text-indigo-200 hover:bg-indigo-800 hover:text-white"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          </button>
        </div>
      </div> */}
    </div>
  );
}
