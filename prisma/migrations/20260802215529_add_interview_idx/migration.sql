/*
  Warnings:

  - Added the required column `interviewIdx` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "interviewIdx" INTEGER NOT NULL;
