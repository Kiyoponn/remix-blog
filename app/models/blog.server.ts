import { prisma } from "~/db.server";

import type { Blog } from "@prisma/client";

export async function getBlogListItems() {
  return prisma.blog.findMany({
    select: {
      slug: true,
      title: true,
      subtitle: true,
    }
  });
}

export async function getBlogs() {
  return prisma.blog.findMany();
}

export async function getBlog(slug: string) {
  return prisma.blog.findUnique({ where: { slug } });
}

export async function createBlog(
  blog: Pick<Blog, "slug" | "title" | "markdown">,
) {
  return prisma.blog.create({ data: blog });
}

export async function deleteBlog(slug: string) {
  return prisma.blog.delete({ where: { slug } });
}

export async function updateBlog(
  blog: Pick<Blog, "slug" | "title" | "markdown">,
  oldSlug: string,
) {
  return prisma.blog.update({ data: blog, where: { slug: oldSlug } });
}
