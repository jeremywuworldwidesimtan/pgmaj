import { ResumeProjectProps } from "@/app/types";
import ProjectCard from "./project-card";

export default function ProjectCardList({
  projects,
}: {
  projects: ResumeProjectProps[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
      {projects.length > 0 ? projects.map((project) => (
        <ProjectCard key={project?.id} project={project} />
      )) : <p className="text-sm text-muted-foreground">No projects found. Please add some projects.</p>}
    </div>
  );
}
