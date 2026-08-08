import {
  Briefcase,
  CalendarDays,
  ClipboardCheck,
  Edit,
  History,
  Info,
  FileText,
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
      //   url: "/dashboard/prep",
      //   icon: ClipboardCheck,
      // },
    ],
  },
  {
    title: "Resume",
    items: [
      {
        title: "Resume Dashboard",
        url: "/dashboard/resume",
        icon: FileText,
      },
      // {
      //   title: "Resume Designer",
      //   url: "/dashboard/resume/designer",
      //   icon: Edit,
      // },
    ],
  }
];
