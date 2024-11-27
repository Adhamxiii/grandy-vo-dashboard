import Projects from "@/components/Projects";
import axios from "axios";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const getProjects = async () => {
  const res = await axios.get(`/api/projects`);
  if (!res) {
    throw new Error("Failed to fetch projects");
  }
  return res.data;
};
export default async function page() {
  const projects = await getProjects();

  console.log(projects);

  return <Projects initialProjects={projects} />;
}
