-- CreateTable
CREATE TABLE `DownloadRequest` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('STARTING', 'IN_PROGRESS', 'COMPLETE', 'FAILED') NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
