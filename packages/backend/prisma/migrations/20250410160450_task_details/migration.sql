/*
  Warnings:

  - Added the required column `description` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemDescription` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompts` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskDetails` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Task` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `problemDescription` VARCHAR(191) NOT NULL,
    ADD COLUMN `prompts` JSON NOT NULL,
    ADD COLUMN `taskDetails` VARCHAR(191) NOT NULL;
