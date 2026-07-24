/*
  Warnings:

  - You are about to drop the column `membershipPlan` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "membershipPlan",
ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 0;

-- DropEnum
DROP TYPE "MembershipPlan";
