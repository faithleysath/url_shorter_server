-- CreateTable
CREATE TABLE "ShortLink" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME NOT NULL,
    "title" TEXT,
    "original" TEXT NOT NULL,
    "short" TEXT NOT NULL,
    "clicks" INTEGER DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortLink_short_key" ON "ShortLink"("short");
