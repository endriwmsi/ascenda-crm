/*
  Warnings:

  - The values [NEW_LEAD,PROSPECT] on the enum `customer_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `notes` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the `employees` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "customer_status_new" AS ENUM ('ACTIVE', 'INACTIVE');
ALTER TABLE "customers" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "customers" ALTER COLUMN "status" TYPE "customer_status_new" USING ("status"::text::"customer_status_new");
ALTER TYPE "customer_status" RENAME TO "customer_status_old";
ALTER TYPE "customer_status_new" RENAME TO "customer_status";
DROP TYPE "customer_status_old";
ALTER TABLE "customers" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_companyId_fkey";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "notes",
ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '-',
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- DropTable
DROP TABLE "employees";
