/*
  Warnings:

  - The required column `id` was added to the `StudyMapping` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `StudyMapping` ADD COLUMN `id` VARCHAR(191) NOT NULL;
