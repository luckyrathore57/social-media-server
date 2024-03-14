/*
  Warnings:

  - You are about to drop the column `HostelName` on the `Hostel` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `Images` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `_Friends` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LikePost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Member` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hostelName` to the `Hostel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_Friends" DROP CONSTRAINT "_Friends_A_fkey";

-- DropForeignKey
ALTER TABLE "_Friends" DROP CONSTRAINT "_Friends_B_fkey";

-- DropForeignKey
ALTER TABLE "_LikePost" DROP CONSTRAINT "_LikePost_A_fkey";

-- DropForeignKey
ALTER TABLE "_LikePost" DROP CONSTRAINT "_LikePost_B_fkey";

-- DropForeignKey
ALTER TABLE "_Member" DROP CONSTRAINT "_Member_A_fkey";

-- DropForeignKey
ALTER TABLE "_Member" DROP CONSTRAINT "_Member_B_fkey";

-- AlterTable
ALTER TABLE "Hostel" DROP COLUMN "HostelName",
ADD COLUMN     "hostelName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "Description",
DROP COLUMN "Images",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "images" TEXT[];

-- DropTable
DROP TABLE "_Friends";

-- DropTable
DROP TABLE "_LikePost";

-- DropTable
DROP TABLE "_Member";

-- CreateTable
CREATE TABLE "_friends" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_likePost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_member" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_friends_AB_unique" ON "_friends"("A", "B");

-- CreateIndex
CREATE INDEX "_friends_B_index" ON "_friends"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_likePost_AB_unique" ON "_likePost"("A", "B");

-- CreateIndex
CREATE INDEX "_likePost_B_index" ON "_likePost"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_member_AB_unique" ON "_member"("A", "B");

-- CreateIndex
CREATE INDEX "_member_B_index" ON "_member"("B");

-- AddForeignKey
ALTER TABLE "_friends" ADD CONSTRAINT "_friends_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_friends" ADD CONSTRAINT "_friends_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likePost" ADD CONSTRAINT "_likePost_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likePost" ADD CONSTRAINT "_likePost_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_member" ADD CONSTRAINT "_member_A_fkey" FOREIGN KEY ("A") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_member" ADD CONSTRAINT "_member_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
