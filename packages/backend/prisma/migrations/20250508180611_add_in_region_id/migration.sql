/*
  Warnings:

  - Added the required column `region` to the `StudyMapping` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `StudyMapping` ADD COLUMN `region` VARCHAR(191) NOT NULL;
