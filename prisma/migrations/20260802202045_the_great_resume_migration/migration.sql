-- CreateEnum
CREATE TYPE "DegreeType" AS ENUM ('HighSchool', 'Diploma', 'Associate', 'Bachelor', 'Master', 'Doctorate');

-- CreateEnum
CREATE TYPE "ProficiencyLevel" AS ENUM ('Beginner', 'Intermediate', 'Advanced', 'Expert');

-- AlterTable
ALTER TABLE "UserDetails" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "linkedin_url" TEXT,
ADD COLUMN     "personal_website_url" TEXT,
ADD COLUMN     "portfolio_url" TEXT;

-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "interviewDate" TIMESTAMP(3) NOT NULL,
    "interviewLocation" TEXT NOT NULL,
    "interviewerName" TEXT,
    "interviewerContact" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "softDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fileReferenceLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "softDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeDetails" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "role" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "softDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ResumeDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeExperience" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "jobType" "JobType" NOT NULL,
    "jobMode" "JobMode" NOT NULL,
    "lastSalary" DOUBLE PRECISION,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "softDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ResumeExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeEducation" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "degree" "DegreeType" NOT NULL,
    "fieldOfStudy" TEXT NOT NULL,
    "gpa" DOUBLE PRECISION,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "softDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ResumeEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeProjects" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "softDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ResumeProjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeSkills" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "skill" TEXT NOT NULL,
    "proficiency" "ProficiencyLevel",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "softDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ResumeSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeCertifications" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "issuingOrganization" TEXT NOT NULL,
    "issueDate" TIMESTAMP(3) NOT NULL,
    "expirationDate" TIMESTAMP(3),
    "credentialId" TEXT,
    "credentialUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "softDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ResumeCertifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resume_userId_key" ON "Resume"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeDetails_resumeId_key" ON "ResumeDetails"("resumeId");

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeDetails" ADD CONSTRAINT "ResumeDetails_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeExperience" ADD CONSTRAINT "ResumeExperience_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeEducation" ADD CONSTRAINT "ResumeEducation_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeProjects" ADD CONSTRAINT "ResumeProjects_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeSkills" ADD CONSTRAINT "ResumeSkills_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeCertifications" ADD CONSTRAINT "ResumeCertifications_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
