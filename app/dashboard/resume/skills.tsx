import { verifySession } from "@/app/lib/dal";
import { Card } from "@/components/ui/card";
import SkillCardList from "@/components/resume/skill-card-list";
import prisma from "@/lib/prisma";
import ResumeSkillButton from "@/components/resume/resume-skill-button";

async function getResumeSkills(userId: string) {
  return await prisma.resume.findUnique({
    where: { userId },
    select: {
      skills: {
        where: { softDeleted: false },
        select: {
          id: true,
          skill: true,
          proficiency: true,
          yearsOfExperience: true,
        },
        orderBy: [
          {
            yearsOfExperience: "desc"
          },
          {
            skill: "asc"
          }
        ],
      },
    },
  });
}

export default async function ResumeSkills() {
  const session = await verifySession();
  const resumeSkills = await getResumeSkills(session.userId);
  return (
    <>
      <Card className="w-full p-4 gap-1">
        <div className="flex flex-col md:flex-row md:justify-between gap-2 md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Skills</h2>
            <p className="text-sm text-muted-foreground">
              Here you can manage your skills, including skill names, proficiency levels
              and years of experience.
            </p>
          </div>
          <ResumeSkillButton />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between gap-2 mt-4">
          <SkillCardList skills={resumeSkills?.skills || []} />
        </div>
      </Card>
    </>
  );
}
