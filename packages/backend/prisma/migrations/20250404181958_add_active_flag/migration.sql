/*
  Warnings:

  - Added the required column `active` to the `TaskSet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TaskSet` ADD COLUMN `active` BOOLEAN NOT NULL;
