import { parseDate } from "@/app/lib/helper";
import { Card } from "../ui/card";
import { CalendarSchedule } from "./calendar-grid";
import Link from "next/link";

export default function MobileSchedule({ schedule }: { schedule: CalendarSchedule[] }) {
    // sort schedule
    schedule.sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime());
    // filter out events that already happened
    const now = new Date();
    schedule = schedule.filter((s) => s.fullDate.getTime() >= now.getTime());
    return (
        <>
            <h2 className="text-lg font-bold">Upcoming schedule</h2>
            <div className="grid grid-cols-1 gap-4 mt-2">
                {schedule.map((s) => (
                    <Link key={s.id} href={s.event.link}>
                        <Card key={s.id} className="w-full p-4 gap-1">
                            <p className="text-sm text-muted-foreground">
                                Interview for
                            </p>
                            <h2 className="text-lg font-bold">{s.event.title}</h2>
                            <p className="text-sm text-muted-foreground">
                                {parseDate(s.fullDate, "british", "long", "dot")} at {s.event.time}
                            </p>
                        </Card>
                    </Link>
                ))}
            </div>
        </>
    )
}