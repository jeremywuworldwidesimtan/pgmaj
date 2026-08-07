import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BasicDetails from "./basic-details";
import ResumeExperience from "./experience";
import ResumeEducation from "./education";
import ResumeProjects from "./projects";
import ResumeCertifications from "./certifications";
import ResumeSkills from "./skills";
import { AppWindow, Award, Brain, BriefcaseBusiness, GraduationCap, Info } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ResumeDashboard({ searchParams }: PageProps) {
  // get query params from url ?tab=basicDetails
  const tab = (await searchParams).tab || "basicDetails";

  return (
    <>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Resume Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Here you can manage your resume information, including basic details,
          job experiences, education, projects, skills and certifications.
        </p>
      </div>
      <Tabs defaultValue={tab ? (Array.isArray(tab) ? tab[0] : tab) : "basicDetails"} className="mt-4 w-full ">
        <TabsList className="grid w-full grid-cols-6 bg-primary">
          <TabsTrigger value="basicDetails"><Info /><span className="hidden md:inline"> Basic Details</span></TabsTrigger>
          <TabsTrigger value="experience"><BriefcaseBusiness /><span className="hidden md:inline"> Experience</span></TabsTrigger>
          <TabsTrigger value="education"><GraduationCap /><span className="hidden md:inline"> Education</span></TabsTrigger>
          <TabsTrigger value="projects"><AppWindow /><span className="hidden md:inline"> Projects</span></TabsTrigger>
          <TabsTrigger value="skills"><Brain /><span className="hidden md:inline"> Skills</span></TabsTrigger>
          <TabsTrigger value="certifications"><Award /><span className="hidden md:inline"> Certifications</span></TabsTrigger>
        </TabsList>
        <div className="px-px">
            <TabsContent value="basicDetails">
              <BasicDetails />
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
