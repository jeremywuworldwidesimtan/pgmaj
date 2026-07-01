import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans dark:bg-background">
      <main className="flex flex-1 w-full flex-col items-center py-8 px-16 sm:items-start">
          <h1 className="text-3xl font-bold leading-10 tracking-tight text-black dark:text-zinc-50">
            PGMAJ
          </h1>
          <p>
            Please Give Me A Job - the centralized job application management platform.
          </p>
          <Button>
            <Link href="/dashboard">
              Get Started
            </Link>
          </Button>
      </main>
    </div>
  );
}
