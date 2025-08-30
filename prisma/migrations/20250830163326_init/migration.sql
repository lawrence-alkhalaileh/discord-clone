-- AlterTable
ALTER TABLE "public"."Profile" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Server" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "Server_profileId_idx" ON "public"."Server"("profileId");
