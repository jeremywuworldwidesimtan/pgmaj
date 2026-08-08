import { ResumeCertificationProps } from "@/app/types";
import CertificationCard from "./certification-card";

export default function CertificationCardList({
  certifications,
}: {
  certifications: ResumeCertificationProps[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
      {certifications.length > 0 ? certifications.map((certification) => (
        <CertificationCard key={certification?.id} certification={certification} />
      )) : <p className="text-sm text-muted-foreground">No certifications found. Please add some certifications.</p>}
    </div>
  );
}
