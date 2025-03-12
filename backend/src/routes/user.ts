// import { Hono } from "hono";
// import {sign,verify} from 'hono/jwt'
// import { signupInput,signinInput } from "@sachin.78dev/blog-common";
// import { Context } from "hono/jsx";
// export const userRouter=new Hono<
// {
//     Bindings:{
//         DATABASE_URL:string,
//         JWT_SECRET:string,
//           },
//           Variables:{
//             prisma:any,
//           }
// }>();

// userRouter.post('/signup', async(c)=>{
//   const prisma = c.get("prisma");
//   try {
//     const body= await c.req.json();
//     const {success}=signupInput.safeParse(body);
//     if(!success){
//       c.status(411);
//       return c.json({
//         message:"Inputs not correct"
//       });
//     }
//   const user=await prisma.user.create({
//     data:{
//       email:body.username,
//       password:body.password,
//       name:body.name,
//       desc:body.desc,
//     },
//   });
//    const token=await sign({id:user.id},c.env.JWT_SECRET);

//    return c.json(token);
//   } catch (error) {
//     c.status(411)
//     return c.text("Invalid");
//   }
// });

// userRouter.post('/signin',async(c)=>{ 
//   const prisma = await c.get("prisma");
//       const body= await c.req.json();
//       const {success}=signinInput.safeParse(body);
//       if(!success){
//         c.status(411);
//         return c.json({
//           message:"Inputs not correct"
//         });
//       }
//       try {
//         const user=await prisma.user.findUnique({
//           where:{
//             email:body.username,
//             password:body.password
//           },
//         });
//         if(!user){
//           c.status(403);
//           return c.json({message:"User not found"});
//         }
  
//          const jwt=await sign({id:user.id},c.env.JWT_SECRET);
//          return c.json(jwt);
//       } catch (error) {
//        c.status(411) ; 
//        return c.text("Invalid user");
//       }
      
// });

// userRouter.get("/",async(c)=>{
//   const prisma=c.get("prisma");
//   const authHeader=c.req.header("Authorization");
//   const user= await verify(`${authHeader}`,c.env.JWT_SECRET);
//   try {
//     const user1=await prisma.user.findUnique({
//       where:{
//         id:user.id
//       },
//       select:{
//         name:true,
//         desc:true,
//       }
//     })
//     return c.json({user:user1});
//     // const User1=await prisma.user.find({
     
//     //     id:user.id,// }
//   } catch (error) {
//     c.status(404);
//     return c.json({messsage:"user not found"});
//   } 
// });

import { Hono } from "hono";
import { deleteAlluser, getUser, logout, Signin, SignUp } from "../controllers/user";
//import { authenticate } from "../middleware";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables: {
    prisma: any,
  }
}>();

userRouter.post('/signup', SignUp);

userRouter.post('/signin',Signin);
userRouter.post('/logout',logout);

//userRouter.post("/delete",deleteAlluser);
userRouter.get("/admin",getUser);