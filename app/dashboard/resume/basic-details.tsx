import { FullUserInfo, getFullUserInfo } from "@/app/actions/getUserInfo";
import { verifySession } from "@/app/lib/dal";
import { shortenWebURL } from "@/app/lib/helper";
import EditResumeDetailsButton from "@/components/resume/edit-resume-details-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import Link from "next/link";

async function getResumeDetails(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      resume: {
        select: {
          details: {
            where: { softDeleted: false },
            select: {
              id: true,
              role: true,
              bio: true,
            },
          },
        },
      },
    },
  });
}

export default async function BasicDetails() {
  const session = await verifySession();
  const user = await getFullUserInfo(session.userId);
  const resumeDetails = await getResumeDetails(session.userId);
  return (
    <>
      <Card className="w-full p-4 gap-1">
        <div>
          <h2 className="text-2xl font-bold">Basic Details</h2>
          <p className="text-sm text-muted-foreground">
            Here you can manage your basic details, including your name, contact
            information, and other personal information.
          </p>
        </div>

        <hr className="my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col md:flex-row md:justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold">Applicant Information</h2>
                <p className="text-sm text-muted-foreground">
                  The following information is derived from your user profile.
                </p>
              </div>
              <Link href="/dashboard/profile/edit">
                <Button>Edit Profile Details</Button>
              </Link>
            </div>
            <div className="mt-2 text-sm">
              <p>Email: {user?.email}</p>
              {user?.userDetails?.altEmail && (
                <p>Alternate Email: {user?.userDetails?.altEmail}</p>
              )}
              {user?.userDetails?.contact_number && (
                <p>
                  Contact Number: {user?.userDetails?.contact_number ?? "N/A"}
                </p>
              )}
              {user?.userDetails?.addr_line1 && (
                <>
                  <p>Address:</p>
                  <div className="ml-4">
                    <p>{user?.userDetails?.addr_line1 ?? ""}</p>
                    {user?.userDetails?.addr_line2 && (
                      <p>{user?.userDetails?.addr_line2 ?? ""}</p>
                    )}
                    {user?.userDetails?.city && user?.userDetails?.zip_code && (
                      <p>
                        {user?.userDetails?.state
                          ? `${user?.userDetails?.city ?? ""}, ${user?.userDetails?.state ?? ""} ${user?.userDetails?.zip_code ?? ""}`
                          : `${user?.userDetails?.city ?? ""} ${user?.userDetails?.zip_code ?? ""}`}
                      </p>
                    )}
                    {user?.userDetails?.country && (
                      <p>{user?.userDetails?.country ?? ""}</p>
                    )}
                  </div>
                </>
              )}
              {user?.userDetails?.personal_website_url && (
                <p>
                  Personal Website:{" "}
                  <Link
                    href={user?.userDetails?.personal_website_url ?? "#"}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    {shortenWebURL(user?.userDetails?.personal_website_url) ??
                      "N/A"}
                  </Link>
                </p>
              )}
              {user?.userDetails?.linkedin_url && (
                <p>
                  LinkedIn:{" "}
                  <Link
                    href={user?.userDetails?.linkedin_url ?? "#"}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    {shortenWebURL(user?.userDetails?.linkedin_url) ?? "N/A"}
                  </Link>
                </p>
              )}
              {user?.userDetails?.portfolio_url && (
                <p>
                  Portfolio:{" "}
                  <Link
                    href={user?.userDetails?.portfolio_url ?? "#"}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    {shortenWebURL(user?.userDetails?.portfolio_url) ?? "N/A"}
                  </Link>
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="flex flex-col md:flex-row md:justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold">
                  Resume-Specific Information
                </h2>
                <p className="text-sm text-muted-foreground">
                  The following information is specific to your resume.
                </p>
              </div>
              <EditResumeDetailsButton
                id={resumeDetails?.resume?.details?.id}
                role={resumeDetails?.resume?.details?.role}
                bio={resumeDetails?.resume?.details?.bio}
              />
            </div>
            <div className="mt-2 text-sm">
              <p>Role: {resumeDetails?.resume?.details?.role || "N/A"}</p>
              <p>Resume Bio</p>
              <div className="mt-2 p-4 border rounded-md">
                <p>
                  {resumeDetails?.resume?.details?.bio || "No bio available."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
