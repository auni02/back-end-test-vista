/*
  Warnings:

  - Made the column `name` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `registrationNumber` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Service` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Company` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `registrationNumber` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Service` MODIFY `name` VARCHAR(191) NOT NULL;
