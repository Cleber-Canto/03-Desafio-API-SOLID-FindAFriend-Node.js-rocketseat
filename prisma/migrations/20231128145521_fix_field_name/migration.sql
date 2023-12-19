/*
  Warnings:

  - Added the required column `size` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "size" "Size" NOT NULL;
