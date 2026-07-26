import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans dark:bg-background">
      <main className="flex flex-1 w-full flex-col items-center py-8 px-16 sm:items-start">
          <h1 className="text-3xl font-bold leading-10 tracking-tight">
            PGMAJ
          </h1>
          <p>
            Please Give Me A Job - the centralized job application management platform.
          </p>

          <main className="py-4">
            <h2 className="text-2xl font-bold">The landing page is a work in progress.</h2>
          </main>
          
          <div>
            <Button>
              <Link href="/dashboard">
                Get Started
              </Link>
            </Button>
            <Link href="/login" className="ml-4 text-sm hover:underline">
              Already have an account? Log in
            </Link>
          </div>
          <div className="mt-8">
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
          </div>
      </main>
    </div>
  );
}
