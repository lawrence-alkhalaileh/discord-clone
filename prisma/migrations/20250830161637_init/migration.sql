/*
  Warnings:

  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(244)`.

*/
-- AlterTable
ALTER TABLE "public"."Profile" DROP CONSTRAINT "Profile_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(244),
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");
