/*
  Warnings:

  - You are about to drop the column `customer` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `partySize` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `restaurantId` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `restaurantId` on the `table` table. All the data in the column will be lost.
  - You are about to drop the `_reservationtotable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `restaurant` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tableId,hour]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[number]` on the table `Table` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `client` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hour` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tableId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_reservationtotable` DROP FOREIGN KEY `_ReservationToTable_A_fkey`;

-- DropForeignKey
ALTER TABLE `_reservationtotable` DROP FOREIGN KEY `_ReservationToTable_B_fkey`;

-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_restaurantId_fkey`;

-- DropForeignKey
ALTER TABLE `table` DROP FOREIGN KEY `Table_restaurantId_fkey`;

-- AlterTable
ALTER TABLE `reservation` DROP COLUMN `customer`,
    DROP COLUMN `partySize`,
    DROP COLUMN `restaurantId`,
    ADD COLUMN `client` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `hour` DATETIME(3) NOT NULL,
    ADD COLUMN `tableId` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `table` DROP COLUMN `restaurantId`;

-- DropTable
DROP TABLE `_reservationtotable`;

-- DropTable
DROP TABLE `restaurant`;

-- CreateIndex
CREATE UNIQUE INDEX `Reservation_tableId_hour_key` ON `Reservation`(`tableId`, `hour`);

-- CreateIndex
CREATE UNIQUE INDEX `Table_number_key` ON `Table`(`number`);

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `Table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
