-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "Apartment" (
    "id" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "rentalFee" INTEGER NOT NULL,
    "apartmentSize" INTEGER NOT NULL,
    "rooms" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "elevator" TEXT NOT NULL,
    "parkingSpace" TEXT NOT NULL,
    "available" TEXT NOT NULL,
    "fullDescription" TEXT NOT NULL,
    "kitchenType" TEXT,
    "bathroomWithToilet" TEXT,
    "balcony" TEXT,
    "terrace" TEXT,
    "market" TEXT,
    "buildingType" TEXT,
    "buildingMaterial" TEXT,
    "dateBuilding" TEXT,
    "addedDate" TEXT,
    "lastUpdate" TEXT,
    "idAdvertisement" TEXT,
    "views" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opinion" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "opinionDate" TEXT NOT NULL,
    "opinionContent" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "apartmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Opinion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attraction" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "Attraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" TEXT NOT NULL,
    "imgPath" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Opinion" ADD CONSTRAINT "Opinion_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
