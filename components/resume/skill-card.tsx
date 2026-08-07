"use client";
import { formatEdu } from "@/app/lib/helper";
import { Card } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import ResumeSkillButton from "./resume-skill-button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import SkillDeleteButton from "./skill-delete";
import { ResumeSkillProps } from "@/app/types";

export default function SkillCard({
  skill,
}: {
  skill: ResumeSkillProps;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Card className="bg-background w-full p-4 flex flex-row justify-between items-center">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold">
              {formatEdu(skill.skill)}
            </h2>
            <p className="text-sm">
              Proficiency: <strong>{skill.proficiency}</strong> with {skill.yearsOfExperience} years of experience
            </p>
          </div>
          {!isOpen ? <ChevronDown className="text-muted-foreground" /> : <ChevronDown className="text-muted-foreground rotate-180" />}
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Card className="bg-background w-full p-4 gap-1">
          <div className="mt-2 lg:grid lg:grid-cols-2 lg:gap-4">
              <ResumeSkillButton mode="edit" formData={skill} />
              <SkillDeleteButton skillId={skill.id} />
          </div>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}
