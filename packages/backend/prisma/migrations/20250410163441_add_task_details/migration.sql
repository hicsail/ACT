/*
  Warnings:

  - Added the required column `description` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemDescription` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompts` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskDetails` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Task` ADD COLUMN `description` LONGTEXT NOT NULL,
    ADD COLUMN `problemDescription` LONGTEXT NOT NULL,
    ADD COLUMN `prompts` JSON NOT NULL,
    ADD COLUMN `taskDetails` LONGTEXT NOT NULL;
