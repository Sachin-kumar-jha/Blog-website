import { Hono } from 'hono'
import {prismaMiddleware} from './middleware'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'
const app = new Hono();
app.use('/*', cors());
app.use('*',prismaMiddleware);
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);



 

 

export default app
