import { Hono } from "hono";
import { jwt,sign,verify } from 'hono/jwt'
import { signupInput,signinInput } from "@sachin.78dev/blog-common";
export const userRouter=new Hono<
{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string,
          },
          Variables:{
            prisma:any,
          }
}>();

userRouter.post('/signup', async(c)=>{
  const prisma = c.get("prisma");
  try {
    const body= await c.req.json();
    const {success}=signupInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Inputs not correct"
      });
    }
  const user=await prisma.user.create({
    data:{
      email:body.username,
      password:body.password,
      name:body.name,
    },
  });
   const token=await sign({id:user.id},c.env.JWT_SECRET);
   return c.json(token);
  } catch (error) {
    c.status(411)
    return c.text("Invalid");
  }
});

userRouter.post('/signin',async(c)=>{ 
  const prisma = await c.get("prisma");
      const body= await c.req.json();
      const {success}=signinInput.safeParse(body);
      if(!success){
        c.status(411);
        return c.json({
          message:"Inputs not correct"
        });
      }
      try {
        const user=await prisma.user.findUnique({
          where:{
            email:body.username,
            password:body.password
          },
        });
        if(!user){
          c.status(403);
          return c.json({message:"User not found"});
        }
  
         const jwt=await sign({id:user.id},c.env.JWT_SECRET);
         return c.json(jwt);
      } catch (error) {
       c.status(411) ; 
       return c.text("Invalid user");
      }
      
}) 
 
