import { Hono } from 'hono'
import {prismaMiddleware} from './middleware'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono();
app.use('*', cors({
  origin:"https://blog-website-jv6j.onrender.com",
  credentials: true,
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.options('*', cors());

app.use('*',prismaMiddleware);
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);



 

 

export default app
