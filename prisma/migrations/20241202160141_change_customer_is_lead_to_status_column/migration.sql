/*
  Warnings:

  - You are about to drop the column `isLead` on the `Customer` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('NEW_LEAD', 'ACTIVE', 'INACTIVE', 'PROSPECT');

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "isLead",
ADD COLUMN     "status" "CustomerStatus" NOT NULL DEFAULT 'NEW_LEAD';
