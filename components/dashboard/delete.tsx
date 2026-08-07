"use client"
import { deletejobApplication } from "@/app/actions/application";
import { useState } from "react";
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialog,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export default function DeleteButton({ jobId }: { jobId: string }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mobile = useIsMobile();

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">{mobile ? "Delete" : "Delete Application"}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the job
            application.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={async () => {
            try {
              await deletejobApplication(jobId);
            } catch (error) {
              console.error(error);
              setError("An error occurred while deleting the application.");
            }
          }}>
            Continue
          </AlertDialogAction>
          {error && <p className="text-destructive mt-2">{error}</p>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
