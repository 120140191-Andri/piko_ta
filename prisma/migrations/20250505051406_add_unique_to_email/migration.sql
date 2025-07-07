/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `pelanggan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `admin_email_key` ON `admin`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `pelanggan_email_key` ON `pelanggan`(`email`);
