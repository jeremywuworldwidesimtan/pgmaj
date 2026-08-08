export const changelog = [
  {
    version: "Beta 0.1.0",
    date: "2026-07-25",
    changes: [
        "Migration of dashboard to Prisma and PostgreSQL.",
        "Developed application page with job description and notes.",
        "Added job description module.",
        "Added notes module.",
        "Added status update button.",
        "Added CRUD functionality for job application.",
        "Added form functionality.",
        "Added user accounts.",
    ],
  },
  {
    version: "Beta 0.1.1",
    date: "2026-07-26",
    changes: [
        "Initial release of the Knowledge Base and Changelog.",
        "First push of project to GitHub.",
        "Fix delete redirect issue.",
    ],
  },
  {
    version: "Beta 0.2.0",
    date: "2026-07-26",
    changes: [
        "Added roadmap page.",
        "Added user profile page with edit profile functionality.",
        "Added preferred currency option.",
        "Created documentation on GitHub.",
        "First deployment on Vercel. Yippy!",
    ],
  },
  {
    version: "Beta 0.3.0",
    date: "2026-08-01",
    changes: [
        "Added responsive mobile support for all components.",
    ],
  },
  {
    version: "Beta 0.3.1",
    date: "2026-08-02",
    changes: [
        "Fixed sidebar not closing on mobile.",
        "Added proper titles for the pages.",
    ],
  },
  {
    version: "Beta 0.4.0",
    date: "2026-08-03",
    changes: [
        "Added scheduler calendar grid for PC and schedule cards for mobile.",
        "Added interview scheduling functionality.",
        "Added time information for interview dates.",
    ],
  },
  {
    version: "Beta 0.5.0",
    date: "2026-08-08",
    changes: [
        "Rework interview date system and scheduling to accommodate multiple interview rounds.",
        "Added resume section for basic details, experience, education, projects, skills and certifications.",
        "Fixed proxy issue for redirect.",
        "Strengthen CRUD security by ensuring the session user can only perform write, update and delete operations on their own data.",
        "Fixed date validation to prevent illogical dates.",
        "Built CI/CD to remove console.log() statements in production code (massive privacy risk alleviated)."
    ],
  }
];
