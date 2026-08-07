import { ResumeExperienceProps } from "@/app/types";
import ExperienceCard from "./experience-card";

export default function ExperienceCardList({
  experiences,
  preferredCurrency,
}: {
  experiences: ResumeExperienceProps[];
  preferredCurrency: string;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
      {experiences.length > 0 ? experiences.map((experience) => (
        <ExperienceCard key={experience?.id} experience={experience} preferredCurrency={preferredCurrency} />
      )) : <p className="text-sm text-muted-foreground">No experiences found. Please add some experiences.</p>}
    </div>
  );
}
