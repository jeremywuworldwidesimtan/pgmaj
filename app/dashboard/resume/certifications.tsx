import { verifySession } from "@/app/lib/dal";
import CertificationCardList from "@/components/resume/certification-card-list";
import ResumeCertificationButton from "@/components/resume/resume-certification-button";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/prisma";

async function getResumeCertifications(userId: string) {
  return await prisma.resume.findUnique({
    where: { userId },
    select: {
      certifications: {
        where: { softDeleted: false },
        select: {
          id: true,
          name: true,
          issuingOrganization: true,
          issueDate: true,
          expirationDate: true,
          credentialId: true,
          credentialUrl: true,
        },
        orderBy: {
          issueDate: "desc",
        },
      },
    },
  });
}

export default async function ResumeCertifications() {
  const session = await verifySession();
  const resumeCertifications = await getResumeCertifications(session.userId);
  return (
    <>
      <Card className="w-full p-4 gap-1">
        <div className="flex flex-col md:flex-row md:justify-between gap-2 md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Certifications</h2>
      <p className="text-sm text-muted-foreground">
        Here you can manage your certifications, including certification names, issuing organizations, and dates.
      </p>
          </div>
          <ResumeCertificationButton />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between gap-2 mt-4">
          <CertificationCardList certifications={resumeCertifications?.certifications || []} />
        </div>
      </Card>
    </>
  );
}