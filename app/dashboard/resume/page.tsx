import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BasicDetails from "./basic-details";

export default function ResumeDashboard() {
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
              <BasicDetails />
            </TabsContent>
            <TabsContent value="experience">
              Make changes to your experience here.
            </TabsContent>
            <TabsContent value="education">
              Make changes to your education here.
            </TabsContent>
            <TabsContent value="projects">
              Make changes to your projects here.
            </TabsContent>
            <TabsContent value="skills">
              Make changes to your skills here.
            </TabsContent>
            <TabsContent value="certifications">
              Make changes to your certifications here.
            </TabsContent>
        </div>
      </Tabs>
    </>
  );
}
