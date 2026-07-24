import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});


const userData: Prisma.UserCreateInput[] = [
  {
    email: "admin@pgmaj.local",
    username: "admin",
    firstName: "Admin",
    lastName: "User",
    password: "AdminPassw0rd!",
    role: "Admin",
    membershipPlan: "Pro",
    jobApplications: {
      create: {
        company: "PGMAJ Corporation",
        position: "Software Engineer",
        location: "Whiskview",
        jobType: "FullTime",
        jobMode: "Remote",
        minPay: 60000,
        maxPay: 80000,
        payFrequency: "Yearly",
        status: "Applied",
        appliedDate: new Date("2026-01-15"),
        referenceLink: "https://www.example.com",
        jobDescription: {
            create: {
                description: "This is a sample job description for the Software Engineer position at PGMAJ Corporation. The ideal candidate will have experience in full-stack development, with a strong understanding of both front-end and back-end technologies. Responsibilities include developing and maintaining web applications, collaborating with cross-functional teams, and ensuring the performance and scalability of our software solutions."
            }
        }
      },
    },
  }
];

export async function main() {
  for (const u of userData) {
    const hashedPassword = await bcrypt.hash(u.password, 10);
    u.password = hashedPassword;
    await prisma.user.create({ data: u });
  }
}

main();