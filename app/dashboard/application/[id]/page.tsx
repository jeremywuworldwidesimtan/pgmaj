import Link from "next/link";

export default function ApplicationDetailsPage() {
  return (
    <>
        <Link href="/dashboard" className="text-sm hover:underline">
            &larr; Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mt-2">Application Details</h1>

        <div>
            <p>Under Construction</p>
        </div>
    </>
  )
}