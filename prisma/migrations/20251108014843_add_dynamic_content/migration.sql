-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SiteLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wa_konsultasi" TEXT,
    "wa_cs" TEXT,
    "instagram" TEXT,
    "tiktok" TEXT,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "LandingPageContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "heroTitle" TEXT NOT NULL DEFAULT 'Wujudkan Pernikahan Impianmu Bersama Elegan Wedding',
    "heroSubtitle" TEXT NOT NULL DEFAULT 'Dari konsep hingga hari H, kami hadir untuk memastikan setiap momen sempurna.',
    "aboutTitle" TEXT NOT NULL DEFAULT 'Tentang Kami',
    "aboutSubtitle" TEXT NOT NULL DEFAULT 'Kami percaya setiap cinta punya cerita, dan tugas kami membuatnya abadi.',
    "aboutDesc1" TEXT NOT NULL DEFAULT 'Elegan Wedding adalah wedding organizer profesional...',
    "aboutDesc2" TEXT NOT NULL DEFAULT 'Tim kami terdiri dari para profesional kreatif...',
    "statWeddings" TEXT NOT NULL DEFAULT '500+',
    "statYears" TEXT NOT NULL DEFAULT '10+',
    "statVendors" TEXT NOT NULL DEFAULT '50+',
    "statSatisfaction" TEXT NOT NULL DEFAULT '98%',
    "phoneNumber" TEXT NOT NULL DEFAULT '+62 812-3456-7890',
    "email" TEXT NOT NULL DEFAULT 'info@eleganwedding.com',
    "address" TEXT NOT NULL DEFAULT 'Jl. Elegan No. 123, Jakarta',
    "workingHours" TEXT NOT NULL DEFAULT 'Senin - Sabtu: 09:00 - 18:00',
    "footerTagline" TEXT NOT NULL DEFAULT 'Kami Hadir untuk Merayakan Cinta Bersamamu 💍',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'Circle',
    "features" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "theme" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "guests" TEXT NOT NULL,
    "imageUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "coupleName" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "location" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "imageUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
