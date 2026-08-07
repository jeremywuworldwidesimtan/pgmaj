import { Card } from "@/components/ui/card";

export default function ResumeSkills() {
  return (
    <>
    <Card className="w-full p-4 gap-1">
      <h2 className="text-lg font-bold">Skills</h2>
      <p className="text-sm text-muted-foreground">
        Here you can manage your skills, including skill levels, endorsements, and relevant experience.
      </p>
    </Card>
    </>
  );
}