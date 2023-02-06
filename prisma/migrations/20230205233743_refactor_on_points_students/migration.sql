/*
  Warnings:

  - You are about to drop the column `current_points` on the `Student` table. All the data in the column will be lost.
  - The `points` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "current_points",
DROP COLUMN "points",
ADD COLUMN     "points" JSONB[];
