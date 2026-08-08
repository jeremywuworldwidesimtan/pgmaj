"use client";
import {
  formatEdu,
  getDateDifference,
  parseDate,
  shortenWebURL,
} from "@/app/lib/helper";
import { Card } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import ResumeCertificationButton from "./resume-certification-button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import CertificationDeleteButton from "./certification-delete";
import { ResumeCertificationProps } from "@/app/types";
import Link from "next/link";

export default function CertificationCard({
  certification,
}: {
  certification: ResumeCertificationProps;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Card className="bg-background w-full p-4 flex flex-row justify-between items-center">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold">
              {formatEdu(certification.name)}
            </h2>
            <p>
              Issued by: <strong>{certification.issuingOrganization}</strong>
            </p>
          </div>
          {!isOpen ? (
            <ChevronDown className="text-muted-foreground" />
          ) : (
            <ChevronDown className="text-muted-foreground rotate-180" />
          )}
        </Card>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Card className="bg-background w-full p-4 gap-1">
          <div className="lg:grid lg:grid-cols-3 lg:gap-4">
              <p className="text-sm">
                <span className="font-bold">Issued on: </span>
                {parseDate(certification.issueDate, "british", "short", "dot")}
              </p>
            {certification.expirationDate && (
              <p className="text-sm col-span-2">
                <span className="font-bold">Expires on: </span>
                {parseDate(
                  certification.expirationDate,
                  "british",
                  "short",
                  "dot",
                )}{" "}
                (expires in {" "}
                {getDateDifference(new Date(), certification.expirationDate)})
              </p>
            )}
          </div>
          <div className="lg:grid lg:grid-cols-3 lg:gap-4">
            {certification.credentialId && (
              <p className="text-sm">
                <span className="font-bold">Credential ID:</span>{" "}
                {certification.credentialId}
              </p>
            )}
            {certification.credentialUrl && (
              <p className="text-sm col-span-2">
                <span className="font-bold">Credential URL:</span>{" "}
                <Link
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {shortenWebURL(certification.credentialUrl)}
                </Link>
              </p>
            )}
          </div>
          <div className="mt-2 lg:grid lg:grid-cols-2 lg:gap-4">
            <ResumeCertificationButton mode="edit" formData={certification} />
            <CertificationDeleteButton certificationId={certification.id} />
          </div>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}
