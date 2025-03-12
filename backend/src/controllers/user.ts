import {Context} from "hono";
import { signupInput ,signinInput} from "@sachin.78dev/blog-common";
import { verify,sign } from "hono/jwt";
import { getCookie, setCookie } from "hono/cookie";
import { isStrongPassword } from "../middleware";
import bcrypt from 'bcryptjs';
export const SignUp=async (c:Context) => {
  const prisma = await c.get("prisma");
  try {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
      c.status(400); // Bad Request
      return c.json({
        message: "Invalid input data"
      });
    }
if(!isStrongPassword(body.password)){
      c.status(409);
      return  c.json({ message: "Please Enter Unique password" });
    }  
const userExist=await prisma.user.findUnique({
      where:{
        email:body.username,
      }
    });  
if(userExist) {
      c.status(409); // Conflict
      return c.json({ message: "User already exists" });
    }

const hashPassword=await bcrypt.hash(body.password, 10);
console.log(hashPassword);
    const user = await prisma.user.create({
      data: {
        email:body.username,
        password:hashPassword,
        name: body.name,
        desc: body.desc,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    setCookie(c, 'token', token, {
      httpOnly:true,
      secure: true,                 // Send cookie only over HTTPS
      sameSite: 'Lax',              // Allow cross-site cookies for top-level navigations
      maxAge: 7 * 24 * 60 * 60,
      path:'/'     // 1 week (in seconds)
    });

    c.status(201); // Created
    return c.json({ message: "Signup successful" });
  } catch (error) {
    c.status(500); // Internal Server Error
    return c.json({ message: error });
  }
}

export const Signin=async (c:Context) => {
  const prisma = await c.get("prisma");
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(400); // Bad Request
    return c.json({
      message: "Invalid input data"
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.username,
      },
    });
    if (!user) {
      c.status(404); // Not Found
      return c.json({ message: "User not found" });
    }
    console.log(user);
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid){
      c.status(404);
      return c.json({ message: 'Invalid Credential!' });
    }
  
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    setCookie(c, 'token', jwt, {
      httpOnly: true,               // Prevent access to cookies via JavaScript
      secure: true,                 // Send cookie only over HTTPS
      sameSite:"Lax",              // Allow cross-site cookies for top-level navigations
      maxAge: 7 * 24 * 60 * 60,
      path:'/'     // 1 week (in seconds)                    // Cookie is available on all routes
    })
    c.status(200); // OK
    return c.json({ message: "Signin successful"});
  } catch (error) {
    c.status(500); // Internal Server Error
    return c.json({ message: "Something went wrong" });
  }
}

export const logout=async (c:Context) => {
  setCookie(c, 'token','');
  c.status(200); // OK
  return c.json({ message: 'Logged out successfully' });
}


export const getUser = async (c: Context) => {
  try {
    const prisma = await c.get('prisma');
    const token = getCookie(c, 'token');

    if (!token) {
      c.status(401); // Unauthorized
      return c.json({ message: 'Unauthorized: No token provided' });
    }

    const user = await verify(token, c.env.JWT_SECRET);
    if (!user || typeof user !== 'object' || !user.id) {
      c.status(403); // Forbidden
      return c.json({ message: 'Invalid or malformed token' });
    }

    const user1 = await prisma.user.findUnique({
      where: { id: user.id },
      select: { name: true, desc: true },
    });

    if (!user1) {
      c.status(404); // Not Found
      return c.json({ message: 'User not found' });
    }

    return c.json({ user: user1 });
  } catch (error) {
    console.error('Error fetching user:', error);
    c.status(500); // Internal Server Error
    return c.json({ message: 'An error occurred' });
  }
};

// export const deleteAlluser=async(c:Context)=>{
//   const prisma=await c.get("prisma")
//   //const body = await c.req.json();
//    const data= await prisma.user.deleteMany({});
//   c.status(200);
//   return c.json({
//     data
//   })
// }