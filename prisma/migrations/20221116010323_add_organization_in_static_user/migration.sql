/*
  Warnings:

  - You are about to drop the column `createAt` on the `InfosUser` table. All the data in the column will be lost.
  - You are about to drop the column `oraganizationId` on the `InfosUser` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `StaticUser` table. All the data in the column will be lost.
  - Added the required column `organizationId` to the `StaticUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InfosUser" DROP CONSTRAINT "InfosUser_oraganizationId_fkey";

-- AlterTable
ALTER TABLE "InfosUser" DROP COLUMN "createAt",
DROP COLUMN "oraganizationId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "StaticUser" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "StaticUser" ADD CONSTRAINT "StaticUser_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InfosUser" ADD CONSTRAINT "InfosUser_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
