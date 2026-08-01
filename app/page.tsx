import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans dark:bg-background">
      <main className="flex flex-1 w-full flex-col items-center py-2 px-4 lg:py-8 lg:px-16 sm:items-start">
          <header className="flex flex-col lg:flex-row items-center justify-between w-full">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">
                PGMAJ
              </h1>
              <p className="text-sm">
                Please Give Me A Job - the centralized job application management platform.
              </p>
            </div>
            <nav className="mt-4 flex gap-4">
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/kb" className="hover:underline">
                Knowledge Base
              </Link>
            </nav>
          </header>

          <main className="py-4 flex flex-col gap-2">
            <Image
              src="/pgmaj_dashboard.png"
              alt="PGMAJ Dashboard"
              width={800}
              height={400}
            />
            <div>
              <h2 className="text-xl lg:text-2xl font-bold">The all-in-one job application management platform.</h2>
              <ul className="list-disc pl-5">
                <li>Track your job applications in one place.</li>
                <li>Keep notes for each application.</li>
                <li>View job descriptions and details.</li>
              </ul>
            </div>
          </main>
          
          <div className="mt-4 flex flex-col lg:flex-row gap-2">
            <Button>
              <Link href="/register">
                Get Started
              </Link>
            </Button>
            <Link href="/login" className="text-sm hover:underline">
              Already have an account? Log in
            </Link>
          </div>
          <footer className="mt-8">
            <p className="text-sm text-muted-foreground">
              Made by @jeremywuworldwidesimtan.{" "}
              <Link
                href="https://github.com/jeremywuworldwidesimtan/pgmaj"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Source
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              This is a work in progress. Please report any issues on the{" "}
              <Link
                href="https://github.com/jeremywuworldwidesimtan/pgmaj/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                GitHub
              </Link>
              .
            </p>
          </footer>
      </main>
    </div>
  );
}
