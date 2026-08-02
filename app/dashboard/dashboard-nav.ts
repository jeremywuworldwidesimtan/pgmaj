import {
  Briefcase,
  CalendarDays,
  ClipboardCheck,
  Edit,
  History,
  Info,
} from "lucide-react";

export const navMain = [
  {
    title: "Applications",
    items: [
      {
        title: "Applications Dashboard",
        url: "/dashboard",
        icon: Briefcase,
      },
    ],
  },
  {
    title: "Interviews",
    items: [
      {
        title: "Scheduler",
        url: "/dashboard/scheduler",
        icon: CalendarDays,
      },
      // {
      //   title: "Interview Prep",
      //   url: "/dashboard/interview/prep",
      //   icon: ClipboardCheck,
      // },
    ],
  },
  // {
  //   title: "Resume",
  //   items: [
  //     {
  //       title: "Experience",
  //       url: "/dashboard/resume/experience",
  //       icon: History,
  //     },
  //     {
  //       title: "Resume Information",
  //       url: "/dashboard/resume/information",
  //       icon: Info,
  //     },
  //     {
  //       title: "Resume Designer",
  //       url: "/dashboard/resume/designer",
  //       icon: Edit,
  //     },
  //   ],
  // }
];
