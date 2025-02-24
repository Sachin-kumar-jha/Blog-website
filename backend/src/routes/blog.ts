import { Hono, Context, Next } from "hono";
import { createBlogInput, updateBlogInput } from "@sachin.78dev/blog-common";
import { verify } from 'hono/jwt'
import { createBlog,deleteBlog,forAuthentication,getAllBlogs,getBlogByid,updateBlog } from "../controllers/blog";

export const blogRouter = new Hono<
  {
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string,
    },
    Variables: {
      prisma: any,
      userId: string
    }
  }>();

blogRouter.use("/*", forAuthentication);


blogRouter.post('/',createBlog);


blogRouter.put('/',updateBlog);



//pagenation
blogRouter.get("/bulk",getAllBlogs);



blogRouter.get('/:id', getBlogByid);

blogRouter.delete("/:id",deleteBlog);

