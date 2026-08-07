import { ResumeEducationProps } from "@/app/types";
import EducationCard from "./education-card";

export default function EducationCardList({
  educations,
}: {
  educations: ResumeEducationProps[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
      {educations.length > 0 ? educations.map((education) => (
        <EducationCard key={education?.id} education={education} />
      )) : <p className="text-sm text-muted-foreground">No educations found. Please add some educations.</p>}
    </div>
  );
}
