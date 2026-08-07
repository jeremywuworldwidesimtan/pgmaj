import { Card } from "@/components/ui/card";

export default function ResumeExperience() {
  return (
    <>
    <Card className="w-full p-4 gap-1">
      <h2 className="text-lg font-bold">Experience</h2>
      <p className="text-sm text-muted-foreground">
        Here you can manage your job experiences, including your roles, responsibilities, and durations.
      </p>
    </Card>
    </>
  );
}