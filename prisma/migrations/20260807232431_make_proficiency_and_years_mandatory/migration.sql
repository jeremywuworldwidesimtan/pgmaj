/*
  Warnings:

  - Made the column `proficiency` on table `ResumeSkills` required. This step will fail if there are existing NULL values in that column.
  - Made the column `yearsOfExperience` on table `ResumeSkills` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ResumeSkills" ALTER COLUMN "proficiency" SET NOT NULL,
ALTER COLUMN "yearsOfExperience" SET NOT NULL;
