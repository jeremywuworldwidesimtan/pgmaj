import { getUser } from "@/app/actions/getUserInfo";
import { verifySession } from "@/app/lib/dal";
import ExperienceCardList from "@/components/resume/experience-card-list";
import ResumeExperienceButton from "@/components/resume/resume-experience-button";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/prisma";

async function getResumeExperiences(userId: string) {
  return await prisma.resume.findUnique({
    where: { userId },
    select: {
      experiences: {
        select: {
          id: true,
          company: true,
          position: true,
          location: true,
          jobType: true,
          jobMode: true,
          lastSalary: true,
          startDate: true,
          endDate: true,
          description: true,
        },
      },
    },
  });
}

export default async function ResumeExperience() {
  const session = await verifySession();
  const user = await getUser(session.userId);
  const resumeExperiences = await getResumeExperiences(session.userId);
  return (
    <>
      <Card className="w-full p-4 gap-1">
        <div className="flex flex-col md:flex-row md:justify-between gap-2 md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Experience</h2>
            <p className="text-sm text-muted-foreground">
              Here you can manage your job experiences, including your roles,
              responsibilities, and durations.
            </p>
          </div>
          <ResumeExperienceButton />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between gap-2 mt-4">
          <ExperienceCardList experiences={resumeExperiences?.experiences || []} preferredCurrency={user?.preferredCurrency || "$"} />
        </div>
      </Card>
    </>
  );
}
