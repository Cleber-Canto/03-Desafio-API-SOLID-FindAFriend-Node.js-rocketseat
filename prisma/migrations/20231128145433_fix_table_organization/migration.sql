/*
  Warnings:

  - Added the required column `energy_level` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('CALM', 'PEACEFUL', 'FUSSY');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "energy_level" "EnergyLevel" NOT NULL;
