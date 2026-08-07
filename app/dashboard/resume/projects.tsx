import { Card } from "@/components/ui/card";

export default function ResumeProjects() {
  return (
    <>
    <Card className="w-full p-4 gap-1">
      <h2 className="text-lg font-bold">Projects</h2>
      <p className="text-sm text-muted-foreground">
        Here you can manage your projects, including project descriptions, technologies used, and durations.
      </p>
    </Card>
    </>
  );
}