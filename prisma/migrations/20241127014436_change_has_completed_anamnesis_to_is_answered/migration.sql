/*
  Warnings:

  - You are about to drop the column `hasCompletedAnamnesis` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hasCompletedAnamnesis",
ADD COLUMN     "isAnswered" BOOLEAN NOT NULL DEFAULT false;
