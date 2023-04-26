/*
  Warnings:

  - You are about to alter the column `total` on the `expense` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `name` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `expense` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    MODIFY `total` INTEGER NOT NULL;
