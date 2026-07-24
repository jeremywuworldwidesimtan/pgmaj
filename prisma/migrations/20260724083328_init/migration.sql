-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Applied', 'Shortlisted', 'Interviewed', 'Offered', 'Rejected');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FullTime', 'PartTime', 'Contract', 'Internship', 'Freelance');

-- CreateEnum
CREATE TYPE "JobMode" AS ENUM ('Remote', 'OnSite', 'Hybrid');

-- CreateEnum
CREATE TYPE "PayFrequency" AS ENUM ('Hourly', 'Weekly', 'Monthly', 'Yearly');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin');

-- CreateEnum
CREATE TYPE "MembershipPlan" AS ENUM ('Free', 'Pro');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'User',
    "membershipPlan" "MembershipPlan" NOT NULL DEFAULT 'Free',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "softDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "jobType" "JobType" NOT NULL,
    "jobMode" "JobMode" NOT NULL,
    "minPay" DOUBLE PRECISION,
    "maxPay" DOUBLE PRECISION,
    "payFrequency" "PayFrequency",
    "status" "Status" NOT NULL,
    "appliedDate" TIMESTAMP(3),
    "latestUpdate" TIMESTAMP(3),
    "latestInterviewScheduledDate" TIMESTAMP(3),
    "referenceLink" TEXT,
    "notes" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "softDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobDescription" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "softDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "JobDescription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "JobDescription_jobId_key" ON "JobDescription"("jobId");

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobDescription" ADD CONSTRAINT "JobDescription_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
