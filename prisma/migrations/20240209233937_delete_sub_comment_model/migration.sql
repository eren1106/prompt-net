/*
  Warnings:

  - You are about to drop the column `value` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the `SubComment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `parentCommentId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform` to the `Prompt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SubComment" DROP CONSTRAINT "SubComment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "SubComment" DROP CONSTRAINT "SubComment_commentId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "parentCommentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Prompt" ADD COLUMN     "platform" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "value",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "SubComment";

-- CreateTable
CREATE TABLE "UserLikeComment" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "commentId" INTEGER NOT NULL,

    CONSTRAINT "UserLikeComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLikeComment" ADD CONSTRAINT "UserLikeComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLikeComment" ADD CONSTRAINT "UserLikeComment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
