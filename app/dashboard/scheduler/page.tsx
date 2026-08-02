import { getUser } from "@/app/actions/getUserInfo";
import {
  getSchedule,
  getApplications,
} from "@/app/actions/scheduler";
import { verifySession } from "@/app/lib/dal";
import CalendarGrid from "@/components/scheduler/calendar-grid";
import ScheduleForm from "@/components/forms/schedule-form";
import MobileSchedule from "@/components/scheduler/mobile-schedule";

export default async function SchedulerPage() {
  const session = await verifySession();
  const user = await getUser(session.userId);
  const userSchedule = await getSchedule(user?.id ? user.id : "");
  const userApplications = await getApplications(user?.id ? user.id : "");
  return (
    <>
      <div className="flex flex-col md:flex-row w-full items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Scheduler</h1>
          <p className="text-sm text-muted-foreground">
            Here you can schedule your interviews and manage your availability.
          </p>
        </div>
        <ScheduleForm userApplications={userApplications} />
      </div>

      <hr className="my-2" />

      <div className="hidden lg:block lg:w-full lg:flex-1">
        <CalendarGrid
          month={new Date().getMonth()}
          year={new Date().getFullYear()}
          schedule={userSchedule || []}
        />
      </div>
      <div className="w-full block lg:hidden flex-1">
        <MobileSchedule
          schedule={userSchedule || []}
        />
      </div>
    </>
  );
}
