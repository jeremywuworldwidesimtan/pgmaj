import Link from "next/link";

export default function JobNotFound() {
  return (
    <>
      <Link href="/dashboard" className="text-sm hover:underline">
        &larr; Back to Dashboard
      </Link>
      <div>
        <h2 className="text-2xl font-bold mt-2">404 Error</h2>
        <p>Job not found.</p>
      </div>
    </>
  );
}
