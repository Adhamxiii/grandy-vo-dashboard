import Projects from "@/components/Projects";
import axios from "axios";

const getProjects = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`
  );
  if (!res) {
    throw new Error("Failed to fetch projects");
  }
  return res.data;
};
export default async function page() {
  const projects = await getProjects();

  return <Projects initialProjects={projects} />;
}
