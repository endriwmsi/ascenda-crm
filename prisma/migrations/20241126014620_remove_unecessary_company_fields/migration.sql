/*
  Warnings:

  - You are about to drop the column `description` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `industry` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `numOfEmployees` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `productsOrServices` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `values` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `vision` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Company` table. All the data in the column will be lost.
  - Added the required column `niche` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" DROP COLUMN "description",
DROP COLUMN "industry",
DROP COLUMN "numOfEmployees",
DROP COLUMN "productsOrServices",
DROP COLUMN "values",
DROP COLUMN "vision",
DROP COLUMN "website",
ADD COLUMN     "niche" TEXT NOT NULL;
