-- CreateTable
CREATE TABLE "UserDetails" (
    "userId" TEXT NOT NULL,
    "contact_number" TEXT,
    "addr_line1" TEXT,
    "addr_line2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "zip_code" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "softDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserDetails_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDetails_userId_key" ON "UserDetails"("userId");

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
