import { prisma } from "~/db.server";

import type { Blog } from "@prisma/client";

export async function getBlogListItems() {
  return prisma.blog.findMany({
    select: {
      slug: true,
      title: true,
      subtitle: true,
    },
  });
}

export async function getBlogs() {
  return prisma.blog.findMany();
}

export async function getBlog(slug: string) {
  return prisma.blog.findUnique({ where: { slug } });
}

type BlogType = Pick<Blog, "slug" | "title" | "subtitle" | "markdown">;

export async function createBlog(blog: BlogType) {
  return prisma.blog.create({ data: blog });
}

export async function deleteBlog(slug: string) {
  return prisma.blog.delete({ where: { slug } });
}

export async function updateBlog(blog: BlogType, oldSlug: string) {
  return prisma.blog.update({ data: blog, where: { slug: oldSlug } });
}
