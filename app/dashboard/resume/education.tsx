import { Card } from "@/components/ui/card";

export default function ResumeEducation() {
  return (
    <>
    <Card className="w-full p-4 gap-1">
      <h2 className="text-lg font-bold">Education</h2>
      <p className="text-sm text-muted-foreground">
        Here you can manage your educational background, including your degrees, institutions, and durations.
      </p>
    </Card>
    </>
  );
}