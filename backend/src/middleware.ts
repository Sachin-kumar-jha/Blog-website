import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Context, Next } from 'hono';

// Middleware function
export const prismaMiddleware = async (c: Context, next: Next) => {
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
          }).$extends(withAccelerate());
    
     c.set('prisma',prisma); 
     await next();
};


