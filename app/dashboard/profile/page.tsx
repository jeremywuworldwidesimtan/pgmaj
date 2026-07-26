import { getUser } from "@/app/actions/getUserInfo";
import { verifySession } from "@/app/lib/dal";

export default async function ProfilePage() {
  const session = await verifySession();
  // Fetch user-specific data from your database or data source
  const user = await getUser(session.userId);
  return (
    <>
      <h1 className="text-3xl font-bold">Profile</h1>

      <hr className="my-4" />
      <div>
        <h2 className="text-3xl font-bold">
          {user?.firstName} {user?.lastName} (@{user?.username})
        </h2>

        <div>
            <p>Email: {user?.email} (Not Verified)</p>
        </div>
      </div>
    </>
  );
}
