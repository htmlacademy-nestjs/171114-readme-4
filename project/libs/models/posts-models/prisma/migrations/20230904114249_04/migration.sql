/*
  Warnings:

  - You are about to drop the column `create_at` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the `favorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_post_id_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_post_id_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "create_at",
DROP COLUMN "updated_at",
ADD COLUMN     "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "text" SET DEFAULT '',
ALTER COLUMN "user_id" SET DEFAULT '';

-- DropTable
DROP TABLE "favorites";

-- DropTable
DROP TABLE "posts";

-- CreateTable
CREATE TABLE "publications" (
    "post_id" SERIAL NOT NULL,
    "user_id" TEXT,
    "origin_user_id" TEXT,
    "origin_post_id" INTEGER,
    "type" "PostType" NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "posted_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "PostStatus" NOT NULL DEFAULT 'draft',
    "is_reposted" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[],
    "likes_count" INTEGER NOT NULL,
    "comments_count" INTEGER NOT NULL,
    "link" TEXT,
    "description" TEXT,
    "photo" TEXT,
    "text" TEXT,
    "author" TEXT,
    "title" TEXT,
    "announcement" TEXT,

    CONSTRAINT "publications_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "likes" (
    "post_id" INTEGER NOT NULL,
    "liked_by_ids" TEXT[],

    CONSTRAINT "likes_pkey" PRIMARY KEY ("post_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "likes_post_id_key" ON "likes"("post_id");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "publications"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "publications"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;
