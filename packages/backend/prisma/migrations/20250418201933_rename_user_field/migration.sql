/*
  Warnings:

  - The primary key for the `TaskCompletion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user` on the `TaskCompletion` table. All the data in the column will be lost.
  - Added the required column `userId` to the `TaskCompletion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TaskCompletion` DROP PRIMARY KEY,
    DROP COLUMN `user`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`taskId`, `userId`);
