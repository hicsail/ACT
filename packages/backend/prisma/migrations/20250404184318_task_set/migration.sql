/*
  Warnings:

  - Added the required column `taskSetId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Task` ADD COLUMN `taskSetId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `TaskSet` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_taskSetId_fkey` FOREIGN KEY (`taskSetId`) REFERENCES `TaskSet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
