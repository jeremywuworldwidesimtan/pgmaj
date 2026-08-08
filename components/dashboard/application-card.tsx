import { JobApplicationPrisma } from "@/app/types";
import { Card } from "../ui/card";
import { colorStatus, formatType, parseDate } from "@/app/lib/helper";

export default function ApplicationCard({
  application,
}: {
  application: JobApplicationPrisma;
}) {
  return (
    <Card className="w-full p-4 gap-1">
      <h2 className="text-lg font-bold">{application.position}</h2>
      <p className="text-sm text-muted-foreground">
        at {application.company} in {application.location}
      </p>
      <p className="text-sm">
        {formatType(application.jobType)} - {formatType(application.jobMode)} -{" "}
        <span className={colorStatus(application.status)}>
          {application.status}
        </span>
      </p>
      <p className="text-sm">
        {application.minPay && application.maxPay
          ? `${application.preferredCurrency ?? "$"}${application.minPay.toLocaleString()} - ${application.preferredCurrency ?? "$"}${application.maxPay.toLocaleString()}`
          : application.minPay && !application.maxPay
            ? `${application.preferredCurrency ?? "$"}${application.minPay.toLocaleString()}`
            : "N/A"} {application.payFrequency}
      </p>
      {application.interviews && (
        <p className="text-sm">
          Next interview {parseDate(application.interviews[0].interviewDate || new Date(), "british", "long", "dot")} at {application.interviews[0].interviewLocation} {application.interviews[0].interviewerName && `(with ${application.interviews[0].interviewerName})`}
        </p>
      )}
    </Card>
  );
}
