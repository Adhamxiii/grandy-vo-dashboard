import Projects from "@/components/Projects";


const getProjects = async () => {
  const res = await fetch(`http://localhost:3000/api/projects`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }
  return res.json();
};
export default async function page() {
  const projects = await getProjects();
  
  return <Projects initialProjects={projects} />;
}
