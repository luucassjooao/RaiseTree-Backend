-- CreateTable
CREATE TABLE "Notify" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notify_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notify_id_key" ON "Notify"("id");

-- AddForeignKey
ALTER TABLE "Notify" ADD CONSTRAINT "Notify_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "InfosUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
