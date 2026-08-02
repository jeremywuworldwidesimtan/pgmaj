import { getFullUserInfo } from "@/app/actions/getUserInfo";
import { verifySession } from "@/app/lib/dal";
import ProfileEditForm from "@/components/forms/profile-edit-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Edit your profile information.",
};

export default async function ProfileEditPage() {
  const session = await verifySession();
  // Fetch user-specific data from your database or data source
  const user = await getFullUserInfo(session.userId);
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Edit Profile</h1>
      </div>

      <hr className="my-4" />
      <div>
        <ProfileEditForm initialValues={user} />
      </div>
    </>
  );
}
