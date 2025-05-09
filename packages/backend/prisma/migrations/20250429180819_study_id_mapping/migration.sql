-- CreateTable
CREATE TABLE `StudyMapping` (
    `email` VARCHAR(191) NOT NULL,
    `studyId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `StudyMapping_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
