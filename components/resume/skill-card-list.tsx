import { ResumeSkillProps } from "@/app/types";
import SkillCard from "./skill-card";

export default function SkillCardList({
  skills,
}: {
  skills: ResumeSkillProps[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
      {skills.length > 0 ? skills.map((skill) => (
        <SkillCard key={skill?.id} skill={skill} />
      )) : <p className="text-sm text-muted-foreground">No skills found. Please add some skills.</p>}
    </div>
  );
}
