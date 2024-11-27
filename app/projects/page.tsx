"use client";

import Projects from "@/components/Projects";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Projects initialProjects={projects} />;
}
