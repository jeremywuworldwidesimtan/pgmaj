import { getUser } from "@/app/actions/getUserInfo";
import {
  getSchedule,
  getUnscheduledApplications,
} from "@/app/actions/scheduler";
import { verifySession } from "@/app/lib/dal";
import CalendarGrid from "@/components/scheduler/calendar-grid";
import ScheduleForm from "@/components/scheduler/schedule-form";

export default async function SchedulerPage() {
  const session = await verifySession();
  const user = await getUser(session.userId);
  const userSchedule = await getSchedule(user?.id ? user.id : "");
  const unscheduledApplications = await getUnscheduledApplications(user?.id ? user.id : "");
  return (
    <>
      <div className="flex flex-col md:flex-row w-full items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Scheduler</h1>
          <p className="text-sm text-muted-foreground">
            Here you can schedule your interviews and manage your availability.
          </p>
        </div>
        <ScheduleForm unscheduledApplications={unscheduledApplications} />
      </div>

      <hr className="my-2" />

      <div className="w-full md:w-auto flex-1">
        <CalendarGrid
          month={new Date().getMonth()}
          year={new Date().getFullYear()}
          schedule={userSchedule}
        />
      </div>
    </>
  );
}
