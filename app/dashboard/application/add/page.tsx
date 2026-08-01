import ApplicationForm from "@/components/forms/application-form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Add Application",
  description: "Add a new job application.",
};

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