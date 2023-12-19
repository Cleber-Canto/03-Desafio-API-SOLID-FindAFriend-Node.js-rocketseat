/*
  Warnings:

  - Added the required column `age` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Age" AS ENUM ('FILHOTE', 'ADULTO', 'SENIOR');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "age" "Age" NOT NULL;
