import {Context} from "hono";
import { signupInput ,signinInput} from "@sachin.78dev/blog-common";
import { verify,sign } from "hono/jwt";
import { getCookie, setCookie } from "hono/cookie";


export const SignUp=async (c:Context) => {
  const prisma = c.get("prisma");
  try {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
      c.status(400); // Bad Request
      return c.json({
        message: "Invalid input data"
      });
    }

    const user = await prisma.user.create({
      data: {
        email: body.username,
        password: body.password,
        name: body.name,
        desc: body.desc,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    setCookie(c, 'token', token, {
      httpOnly:true,
      secure: true,                 // Send cookie only over HTTPS
      sameSite: 'none',              // Allow cross-site cookies for top-level navigations
      maxAge: 7 * 24 * 60 * 60,     // 1 week (in seconds)
    });

    c.status(201); // Created
    return c.json({ message: "Signup successful" });
  } catch (error) {
    c.status(500); // Internal Server Error
    return c.json({ message: "Something went wrong" });
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
        password: body.password
      },
    });

    if (!user) {
      c.status(404); // Not Found
      return c.json({ message: "User not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    setCookie(c, 'token', jwt, {
      httpOnly: true,               // Prevent access to cookies via JavaScript
      secure: true,                 // Send cookie only over HTTPS
      sameSite: 'none',              // Allow cross-site cookies for top-level navigations
      maxAge: 7 * 24 * 60 * 60,     // 1 week (in seconds)                    // Cookie is available on all routes
    })
    

    c.status(200); // OK
    return c.json({ message: "Signin successful" });
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
export const getUser=async (c:Context) => {
    const prisma = c.get("prisma");
    const token = getCookie(c, 'token');
  
    if (!token) {
      c.status(401); // Unauthorized
      return c.json({ message: "Unauthorized" });
    }
  
    try {
      const user = await verify(token, c.env.JWT_SECRET);
      const user1 = await prisma.user.findUnique({
        where: { id: user.id },
        select: { name: true, desc: true },
      });
  
      if (!user1) {
        c.status(404); // Not Found
        return c.json({ message: "User not found" });
      }
  
      c.status(200); // OK
      return c.json({ user: user1 });
    } catch (error) {
      c.status(403); // Forbidden
      return c.json({ message: "Invalid token" });
    }
  }