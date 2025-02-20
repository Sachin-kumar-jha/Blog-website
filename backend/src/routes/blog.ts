import { Hono,Context, Next } from "hono";
import { createBlogInput,updateBlogInput } from "@sachin.78dev/blog-common";
import { verify } from 'hono/jwt'
export const blogRouter=new Hono<
{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string,
          },
          Variables:{
            prisma:any,
            userId:string
          }
}>();

blogRouter.use("/*",async(c:Context,next:Next)=>{
  const authHeader=c.req.header("Authorization");
  try {
    const user=await verify(`${authHeader}`,c.env.JWT_SECRET);
  if(user){
  c.set("userId",user.id);
  await next();
  }else{
    c.status(403);
    return c.json({
      message:"you are not logged in"
    })
  }
  } catch (error) {
    c.status(403);
    return c.json({error:"Something is going wrong"});
  }
  
});
 

blogRouter.post('/',async(c)=>{
    const prisma=c.get('prisma');
    const authorId=c.get("userId");
    const body=await c.req.json();
     const {success}=createBlogInput.safeParse(body);
        if(!success){
          c.status(411);
          return c.json({
            message:"Inputs not correct"
          });
        }
   const blog= await prisma.post.create({
      data:{
        title:body.title,
        content:body.content,
        authorId:authorId,
      }    
    })
    return c.json({id:blog.id});
  });


blogRouter.put('/',async(c)=>{
  const prisma=c.get('prisma');
    const body=await c.req.json();
     const {success}=updateBlogInput.safeParse(body);
        if(!success){
          c.status(411);
          return c.json({
            message:"Inputs not correct"
          });
        }
    const blog=await prisma.post.update({
      where:{
        id:body.id,
      },
      data:{
        title:body.title,
        content:body.content,
      } 
    });
    return c.json({
      id:blog.id
    })
  })


  //pagenation
  blogRouter.get("/bulk",async(c)=>{
    const prisma=c.get('prisma');
    try {
      const blog=await prisma.post.findMany({});
      return c.json(blog);
    } catch (error) {
      return c.json({error:"Blogs not found"});
    }
  });

   
  blogRouter.get('/:id',async(c)=>{
    const prisma=c.get('prisma');
    const id=c.req.param("id");
    try {
      const blog=await prisma.post.findFirst({
        where:{
          id:id,
        }
      });
      if(!blog){
        return c.json({message:"Please create a blog"});
      }
      return c.json({
        blog
      })
    } catch (error) {
      c.status(401);
      return c.json({error:"Blog doesn't exist"});
    }
  })