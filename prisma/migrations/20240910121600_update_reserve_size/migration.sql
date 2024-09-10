/*
  Warnings:

  - Added the required column `reserveSize` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservation` ADD COLUMN `reserveSize` INTEGER NOT NULL;
