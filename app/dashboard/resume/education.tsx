import { verifySession } from "@/app/lib/dal";
import { ResumeEducationProps } from "@/app/types";
import EducationCardList from "@/components/resume/education-card-list";
import ResumeEducationButton from "@/components/resume/resume-education-button";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/prisma";

async function getResumeEducation(userId: string) {
  return await prisma.resume.findUnique({
    where: { userId },
    select: {
      educations: {
        where: { softDeleted: false },
        select: {
          id: true,
          institution: true,
          degree: true,
          fieldOfStudy: true,
          gpa: true,
          startDate: true,
          endDate: true,
          description: true,
        },
        orderBy: {
          startDate: "desc",
        },
      },
    },
  });
}

export default async function ResumeEducation() {
  const session = await verifySession();
  const resumeEducation = await getResumeEducation(session.userId);
  return (
    <>
      <Card className="w-full p-4 gap-1">
        <div className="flex flex-col md:flex-row md:justify-between gap-2 md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Education</h2>
            <p className="text-sm text-muted-foreground">
              Here you can manage your educational background, including your
              degrees, institutions, and durations.
            </p>
          </div>
          <ResumeEducationButton />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between gap-2 mt-4">
          <EducationCardList
            educations={resumeEducation?.educations || []}
          />
        </div>
      </Card>
    </>
  );
}
