-- AlterTable
ALTER TABLE `pembayaran` ADD COLUMN `id_diskon` INTEGER NULL;

-- CreateTable
CREATE TABLE `diskon` (
    `id_diskon` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `persen` INTEGER NOT NULL,
    `aktif` BOOLEAN NOT NULL DEFAULT true,
    `mulai` DATETIME(3) NOT NULL,
    `berakhir` DATETIME(3) NOT NULL,
    `id_pelanggan` INTEGER NOT NULL,

    PRIMARY KEY (`id_diskon`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pembayaran` ADD CONSTRAINT `pembayaran_id_pelanggan_fkey` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan`(`id_pelanggan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pembayaran` ADD CONSTRAINT `pembayaran_id_diskon_fkey` FOREIGN KEY (`id_diskon`) REFERENCES `diskon`(`id_diskon`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diskon` ADD CONSTRAINT `diskon_id_pelanggan_fkey` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan`(`id_pelanggan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pesanan_kafe` ADD CONSTRAINT `pesanan_kafe_id_menu_fkey` FOREIGN KEY (`id_menu`) REFERENCES `menu_kafe`(`id_menu`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pesanan_kafe` ADD CONSTRAINT `pesanan_kafe_id_pembayaran_fkey` FOREIGN KEY (`id_pembayaran`) REFERENCES `pembayaran`(`id_pembayaran`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `antrian_cuci` ADD CONSTRAINT `antrian_cuci_id_pembayaran_fkey` FOREIGN KEY (`id_pembayaran`) REFERENCES `pembayaran`(`id_pembayaran`) ON DELETE RESTRICT ON UPDATE CASCADE;
