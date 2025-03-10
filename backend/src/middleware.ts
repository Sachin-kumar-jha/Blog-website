import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Context, Next } from 'hono';
import { verify} from "hono/jwt";
import { getCookie} from "hono/cookie";

// Middleware function
export const prismaMiddleware = async (c: Context, next: Next) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
          }).$extends(withAccelerate());
    
     c.set('prisma',prisma); 
     await next();
};


export const authenticate = async (c:Context, next:Next) => {
  console.log('Cookies:', getCookie(c, 'token'));
  const token = getCookie(c, 'token'); // Correct way to get cookies
  if (!token) {
    c.status(401); // Unauthorized
    return c.json({ message: "Unauthorized" });
  }

  try {
    const user = await verify(token, c.env.JWT_SECRET);
    c.set("userId", user.id);
    await next();
  } catch (error) {
    c.status(403); // Forbidden
    return c.json({ message: "Invalid token" });
  }
};