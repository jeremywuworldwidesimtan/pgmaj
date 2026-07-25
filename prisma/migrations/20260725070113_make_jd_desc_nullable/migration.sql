-- AlterTable
ALTER TABLE "JobDescription" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL;
