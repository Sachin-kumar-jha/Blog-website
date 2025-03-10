import {Context} from "hono";
import { createBlogInput,updateBlogInput } from "@sachin.78dev/blog-common";


export const createBlog=async (c:Context) => {
  const prisma = c.get('prisma');
  const authorId = c.get("userId");
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct"
    });
  }
  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    }
  })
  return c.json({ id: blog.id });
};

export const updateBlog=async (c:Context) => {
  const prisma = c.get('prisma');
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct"
    });
  }
  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    }
  });
  return c.json({
    id: blog.id
  })
};

export const getAllBlogs=async (c:Context) => {
    const prisma = c.get('prisma');
    try {
      const blog = await prisma.post.findMany({
        select: {
          content: true,
          title: true,
          id: true,
          author: {
            select: {
              name: true
            }
          },
          createdAt: true,
          updatedAt: true,
        }
      });
      return c.json(blog);
    } catch (error) {
      return c.json({ error: "Blogs not found" });
    }
};

export const getBlogByid=async (c:Context) => {
    const prisma = c.get('prisma');
    const id = c.req.param("id");
    try {
      const blog = await prisma.post.findFirst({
        where: {
          id: id,
        },
        select: {
          id: true,
          title: true,
          content: true,
          author: {
            select: {
              name: true,
              desc:true,
            }
          },
          authorId: true,
          createdAt: true,
        }
      });
      if (!blog) {
        return c.json({ message: "Blog not found" });
      }
      return c.json({
        blog
      })
    } catch (error) {
      c.status(401);
      return c.json({ error: "Blog doesn't exist" });
    }
  };

export const deleteBlog=async (c:Context) => {
    const prisma = c.get("prisma");
    const id = c.req.param("id");
    const userId = await c.get('userId');
    try {
      const blog = await prisma.post.findUnique({
        where: { id: id },
        select: { authorId: true },
      });
  
      if (!blog) {
        c.status(404);
        return c.json({ message: "Blog not found" });
      }
  
      if (blog.authorId !== userId) {
        return c.json({ message: "You are not the author!" });
      }
  
       await prisma.post.delete({
        where: { id: id },
      });
      c.status(203);
      return c.json({ message:"Post deleted successfully!" });
  
    } catch (error) {
      console.error(error);
      c.status(500);
      return c.json({ message: "An error occurred while deleting the blog" });
    }
};
