import { Hono } from 'hono'
import {prismaMiddleware} from './middleware'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono();
app.use('/*', cors({
  origin: [
    "https://blog-website-psi-vert.vercel.app",
    "https://blog-website-jv6j.onrender.com",
    "http://localhost:5173"
  ], // No trailing slash!
  credentials: true,
}));
app.options('*', cors());

app.use('*',prismaMiddleware);
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);



 

 

export default app
