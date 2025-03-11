import { Hono } from 'hono'
import {prismaMiddleware} from './middleware'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono();
app.use('/*', cors({
  origin:["https://blog-website-psi-vert.vercel.app",
    "http://localhost:5173"
  ],// Allow your frontend URL
  credentials: true,                // Allow cookies and credentials
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

}))
app.use('*',prismaMiddleware);
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);



 

 

export default app
