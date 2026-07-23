import ApplicationForm from "@/components/forms/application-form";
import Link from "next/link";

export default function AddApplication() {
  return (
    <>
        <Link href="/dashboard" className="text-sm hover:underline">
            &larr; Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mt-2">Add Application</h1>

        <div>
            <ApplicationForm />
        </div>
    </>
  )
}