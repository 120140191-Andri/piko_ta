-- CreateTable
CREATE TABLE `admin` (
    `id_admin` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_admin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `antrian_cuci` (
    `id_antrian` INTEGER NOT NULL AUTO_INCREMENT,
    `no_antrian` INTEGER NOT NULL,
    `id_pembayaran` INTEGER NOT NULL,
    `plat_nomor` VARCHAR(191) NOT NULL,
    `merek_mobil` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `tgl_waktu` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_antrian`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu_kafe` (
    `id_menu` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_menu` VARCHAR(191) NOT NULL,
    `harga_menu` VARCHAR(191) NOT NULL,
    `foto_menu` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_menu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pelanggan` (
    `id_pelanggan` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_pelanggan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pembayaran` (
    `id_pembayaran` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pelanggan` INTEGER NOT NULL,
    `metode_pembayaran` VARCHAR(191) NOT NULL,
    `gross_amount` INTEGER NOT NULL,
    `payment_type` VARCHAR(191) NOT NULL,
    `transaction_status` INTEGER NOT NULL,
    `transaction_time` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_pembayaran`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pesanan_kafe` (
    `id_pesanan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_menu` INTEGER NOT NULL,
    `id_pembayaran` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,

    PRIMARY KEY (`id_pesanan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
