/*
  Warnings:

  - Added the required column `partySize` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservation` ADD COLUMN `partySize` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `restaurant` ADD COLUMN `acceptsReservations` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `maxCapacity` INTEGER NULL;

-- CreateTable
CREATE TABLE `_ReservationToRestaurant` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ReservationToRestaurant_AB_unique`(`A`, `B`),
    INDEX `_ReservationToRestaurant_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ReservationToRestaurant` ADD CONSTRAINT `_ReservationToRestaurant_A_fkey` FOREIGN KEY (`A`) REFERENCES `Reservation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ReservationToRestaurant` ADD CONSTRAINT `_ReservationToRestaurant_B_fkey` FOREIGN KEY (`B`) REFERENCES `Restaurant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
