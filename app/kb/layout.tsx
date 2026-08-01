import Link from "next/link";

export default function KBLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-2 p-4 border-b border-b-border">
        <h1 className="text-2xl lg:text-3xl font-bold"><Link href="/" className="hover:underline">PGMAJ</Link> Knowledge Base</h1>
        <div className="flex flex-row gap-4">
            <Link href="/kb" className="hover:underline">Home</Link>
            <Link href="/kb/changelog" className="hover:underline">Changelog</Link>
            <Link href="/kb/roadmap" className="hover:underline">Roadmap</Link>
        </div>
      </div>
      <main className="px-4">{children}</main>
    </div>
  );
}