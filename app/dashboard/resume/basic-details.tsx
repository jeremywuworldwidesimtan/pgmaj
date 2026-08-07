import { FullUserInfo } from "@/app/actions/getUserInfo";
import { shortenWebURL } from "@/app/lib/helper";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function BasicDetails({user}: {user: FullUserInfo | null}) {
  return (
    <>
    <Card className="w-full p-4 gap-1">
      <h2 className="text-lg font-bold">Basic Details</h2>
      <p className="text-sm text-muted-foreground">
        Here you can manage your basic details, including your name, contact information, and other personal information.
      </p>
      <p className="text-sm text-muted-foreground">
        The information are derived from your user profile. You can update your profile information in the <Link href="/dashboard/profile/edit" className="text-blue-500 hover:underline">profile settings</Link>.
      </p>

      <div>
        <div className="flex flex-col gap-2">
            <p>Email: {user?.email}</p>
            {user?.userDetails?.alt_email && (
              <p>Alternate Email: {user?.userDetails?.alt_email}</p>
            )}
            <p>Preferred Currency: {user?.preferredCurrency || "$"}</p>
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
                <Link href={user?.userDetails?.personal_website_url ?? "#"} target="_blank" className="text-blue-500 hover:underline">
                  {shortenWebURL(user?.userDetails?.personal_website_url) ?? "N/A"}
                </Link>
              </p>
            )}
            {user?.userDetails?.linkedin_url && (
              <p>
                LinkedIn:{" "}
                <Link href={user?.userDetails?.linkedin_url ?? "#"} target="_blank" className="text-blue-500 hover:underline">
                  {shortenWebURL(user?.userDetails?.linkedin_url) ?? "N/A"}
                </Link>
              </p>
            )}
            {user?.userDetails?.portfolio_url && (
              <p>
                Portfolio:{" "}
                <Link href={user?.userDetails?.portfolio_url ?? "#"} target="_blank" className="text-blue-500 hover:underline">
                  {shortenWebURL(user?.userDetails?.portfolio_url) ?? "N/A"}
                </Link>
              </p>
            )}
          </div>
          <div>
            <h2 className="text-lg lg:text-xl font-semibold">Bio</h2>
            <div className="mt-2 p-4 border rounded-md">
              <p>{user?.userDetails?.bio || "No bio available."}</p>
            </div>
          </div>
      </div>
    </Card>
    </>
  );
}