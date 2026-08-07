import { Card } from "@/components/ui/card";

export default function ResumeCertifications() {
  return (
    <>
    <Card className="w-full p-4 gap-1">
      <h2 className="text-2xl font-bold">Certifications</h2>
      <p className="text-sm text-muted-foreground">
        Here you can manage your certifications, including certification names, issuing organizations, and dates.
      </p>
    </Card>
    </>
  );
}