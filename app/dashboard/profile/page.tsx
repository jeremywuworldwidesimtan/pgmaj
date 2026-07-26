import { getFullUserInfo, getUser } from "@/app/actions/getUserInfo";
import { verifySession } from "@/app/lib/dal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await verifySession();
  // Fetch user-specific data from your database or data source
  const user = await getFullUserInfo(session.userId);
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Link href="/dashboard/profile/edit">
          <Button>Edit Profile</Button>
        </Link>
      </div>

      <hr className="my-4" />
      <div>
        <h2 className="text-3xl font-bold">
          {user?.firstName} {user?.lastName} (@{user?.username})
        </h2>

        <div className="mt-2">
          <p>
            <strong>User Info</strong>
          </p>
          <div>
            <p>Email: {user?.email} (Not Verified)</p>
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
          </div>
        </div>
      </div>
    </>
  );
}
