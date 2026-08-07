import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BasicDetails from "./basic-details";
import ResumeExperience from "./experience";
import ResumeEducation from "./education";
import ResumeProjects from "./projects";
import ResumeCertifications from "./certifications";
import ResumeSkills from "./skills";
import { getFullUserInfo } from "@/app/actions/getUserInfo";
import { verifySession } from "@/app/lib/dal";

export default async function ResumeDashboard() {
  const session = await verifySession();
  const user = await getFullUserInfo(session.userId);
  return (
    <>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Resume Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Here you can manage your resume information, including basic details,
          job experiences, education, projects, skills and certifications.
        </p>
      </div>
      <Tabs defaultValue="basicDetails" className="mt-4 w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="basicDetails">Basic Details</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>
        <div className="px-2">
            <TabsContent value="basicDetails">
              <BasicDetails user={user} />
            </TabsContent>
            <TabsContent value="experience">
              <ResumeExperience />
            </TabsContent>
            <TabsContent value="education">
              <ResumeEducation />
            </TabsContent>
            <TabsContent value="projects">
              <ResumeProjects />
            </TabsContent>
            <TabsContent value="skills">
              <ResumeSkills />
            </TabsContent>
            <TabsContent value="certifications">
              <ResumeCertifications />
            </TabsContent>
        </div>
      </Tabs>
    </>
  );
}
