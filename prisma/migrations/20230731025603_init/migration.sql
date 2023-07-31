-- CreateTable
CREATE TABLE "ShortLink" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "original" TEXT NOT NULL,
    "short" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ShortLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortLink_short_key" ON "ShortLink"("short");
