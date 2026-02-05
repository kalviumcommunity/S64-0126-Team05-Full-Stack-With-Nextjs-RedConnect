-- CreateTable
CREATE TABLE "BloodBank" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BloodBank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BloodInventory" (
    "id" SERIAL NOT NULL,
    "bloodType" TEXT NOT NULL,
    "units" INTEGER NOT NULL DEFAULT 0,
    "minUnits" INTEGER NOT NULL DEFAULT 10,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bloodBankId" INTEGER NOT NULL,

    CONSTRAINT "BloodInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "bloodType" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "lastDonated" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" SERIAL NOT NULL,
    "units" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "donorId" INTEGER NOT NULL,
    "bloodBankId" INTEGER NOT NULL,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BloodBank_email_key" ON "BloodBank"("email");

-- CreateIndex
CREATE INDEX "BloodBank_city_idx" ON "BloodBank"("city");

-- CreateIndex
CREATE INDEX "BloodBank_email_idx" ON "BloodBank"("email");

-- CreateIndex
CREATE INDEX "BloodInventory_bloodType_idx" ON "BloodInventory"("bloodType");

-- CreateIndex
CREATE INDEX "BloodInventory_bloodBankId_idx" ON "BloodInventory"("bloodBankId");

-- CreateIndex
CREATE UNIQUE INDEX "BloodInventory_bloodBankId_bloodType_key" ON "BloodInventory"("bloodBankId", "bloodType");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_email_key" ON "Donor"("email");

-- CreateIndex
CREATE INDEX "Donor_bloodType_idx" ON "Donor"("bloodType");

-- CreateIndex
CREATE INDEX "Donor_city_idx" ON "Donor"("city");

-- CreateIndex
CREATE INDEX "Donor_email_idx" ON "Donor"("email");

-- CreateIndex
CREATE INDEX "Donation_donorId_idx" ON "Donation"("donorId");

-- CreateIndex
CREATE INDEX "Donation_bloodBankId_idx" ON "Donation"("bloodBankId");

-- CreateIndex
CREATE INDEX "Donation_status_idx" ON "Donation"("status");

-- CreateIndex
CREATE INDEX "Donation_createdAt_idx" ON "Donation"("createdAt");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "Notification_isRead_idx" ON "Notification"("isRead");

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");

-- AddForeignKey
ALTER TABLE "BloodInventory" ADD CONSTRAINT "BloodInventory_bloodBankId_fkey" FOREIGN KEY ("bloodBankId") REFERENCES "BloodBank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_bloodBankId_fkey" FOREIGN KEY ("bloodBankId") REFERENCES "BloodBank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
