# PGMAJ
Please Give Me A Job (PGMAJ) - an all-in-one centralized job application management and soon, interview prep, platform

### [Vercel Live Demo Link](https://pgmaj.vercel.app/)

### [Demo video (YouTube)](https://youtu.be/PISj3b2GQUA)

![PGMAJ dashboard](/public/pgmaj_dashboard.png)


---
## Current features
- Track your job applications in one place.
- Keep notes for each application.
- Create and view job descriptions and details for applications.
- View and edit your user profile.
- Set preferred currency.
- Multi-user accounts.
- Keep track of upcoming interviews in a calendar/scheduler-like interface. **(NEW)**
- Schedule new interviews. **(NEW)**
- Schedule and keep track of multiple rounds of interviews. **(NEW)**
- Manage resume details and past experience, education, projects, skills and certifications. **(NEW)**
---
## Tech Stack Used

| Stack | Technologies Used |
|---|---|
| Frontend | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Next JS](https://img.shields.io/badge/Next-black.svg?style=for-the-badge&logo=next.js&logoColor=white) ![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-%23000000?style=for-the-badge&logo=shadcnui&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) |
| Backend/Database | ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) |
| Deployment | ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) |

---
## Local Installation
You can install PGMAJ locally instead of using the Vercel version. 
### Requirements
- A compatible OS (Windows/Mac/Linux)
- Node.js v22.14.0 or later
- PostgreSQL 18.1 or later
- Git

### Installation steps
1. Clone this repo with `git clone https://github.com/jeremywuworldwidesimtan/pgmaj`
2. Create a PostgreSQL database named `pgmaj` with pgAdmin 4 or any other database tool
3. `cd` into the `pgmaj` directory or open it in a code editor
4. Configure `.env`:
    ```env
    DATABASE_URL="postgresql://{your postgres username}:{your postgres password}@localhost:{your postgres port, default 5432}/pgmaj"
    SESSION_SECRET={your session secret, you can use your own secret key or create one with openssl}
    ```
5. Run `npm run dev` to install dependencies
6. Initialize Prisma with `npx prisma generate`
7. Optionally, seed the database with `npx prisma seed`
8. The website is ready at [`localhost:3000`](http://localhost:3000)
9. If you choose to seed the database, you can log in to the system using the following credentials:
    ```
    email: admin@pgmaj.local
    password: AdminPassw0rd!
    ```
    otherwise, you can go to [`localhost:3000/register`](http://localhost:3000/register) to create your own account.
