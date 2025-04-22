/*
  Warnings:

  - The primary key for the `TaskCompletion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TaskCompletion` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `TaskCompletion` table. All the data in the column will be lost.
  - Added the required column `order` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `TaskCompletion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Task` ADD COLUMN `order` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `TaskCompletion` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `user`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`taskId`, `userId`);
