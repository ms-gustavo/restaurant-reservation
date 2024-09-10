/*
  Warnings:

  - You are about to drop the column `tableId` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the `_reservationtorestaurant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `restaurantId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_reservationtorestaurant` DROP FOREIGN KEY `_ReservationToRestaurant_A_fkey`;

-- DropForeignKey
ALTER TABLE `_reservationtorestaurant` DROP FOREIGN KEY `_ReservationToRestaurant_B_fkey`;

-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_tableId_fkey`;

-- AlterTable
ALTER TABLE `reservation` DROP COLUMN `tableId`,
    ADD COLUMN `restaurantId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `restaurant` MODIFY `number` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_reservationtorestaurant`;

-- CreateTable
CREATE TABLE `_ReservationToTable` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ReservationToTable_AB_unique`(`A`, `B`),
    INDEX `_ReservationToTable_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ReservationToTable` ADD CONSTRAINT `_ReservationToTable_A_fkey` FOREIGN KEY (`A`) REFERENCES `Reservation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ReservationToTable` ADD CONSTRAINT `_ReservationToTable_B_fkey` FOREIGN KEY (`B`) REFERENCES `Table`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
