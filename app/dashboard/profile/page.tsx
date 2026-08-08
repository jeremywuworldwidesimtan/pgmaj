import { getFullUserInfo, getUser } from "@/app/actions/getUserInfo";
import { verifySession } from "@/app/lib/dal";
import { shortenWebURL } from "@/app/lib/helper";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const session = await verifySession();
  const user = await getUser(session.userId);

  return {
    title: `${user?.firstName} ${user?.lastName} (@${user?.username}) User Profile`,
    description: "View and edit your profile information.",
  };
}

export default async function ProfilePage() {
  const session = await verifySession();
  // Fetch user-specific data from your database or data source
  const user = await getFullUserInfo(session.userId);
  return (
    <>
      <div>
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold">
            {user?.firstName} {user?.lastName} (@{user?.username})
          </h2>
          <Link href="/dashboard/profile/edit">
            <Button>Edit Profile</Button>
          </Link>
        </div>

        <p className="text-lg lg:text-xl mt-2">
          <strong>User Info</strong>
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col gap-2">
            <p>Email: {user?.email}</p>
            {user?.userDetails?.altEmail && (
              <p>Alternate Email: {user?.userDetails?.altEmail}</p>
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
      </div>
    </>
  );
}
