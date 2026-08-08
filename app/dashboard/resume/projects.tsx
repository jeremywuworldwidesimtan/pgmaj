import { verifySession } from "@/app/lib/dal";
import ProjectCardList from "@/components/resume/project-card-list";
import ResumeProjectButton from "@/components/resume/resume-project-button";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/prisma";

async function getResumeProject(userId: string) {
  return await prisma.resume.findUnique({
    where: { userId },
    select: {
      projects: {
        where: { softDeleted: false },
        select: {
          id: true,
          name: true,
          link: true,
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

export default async function ResumeProject() {
  const session = await verifySession();
  const resumeProject = await getResumeProject(session.userId);
  return (
    <>
      <Card className="w-full p-4 gap-1">
        <div className="flex flex-col md:flex-row md:justify-between gap-2 md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Projects</h2>
            <p className="text-sm text-muted-foreground">
              Here you can manage your projects, including project descriptions,
              links, descriptions, and durations.
            </p>
          </div>
          <ResumeProjectButton />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between gap-2 mt-4">
          <ProjectCardList projects={resumeProject?.projects || []} />
        </div>
      </Card>
    </>
  );
}
