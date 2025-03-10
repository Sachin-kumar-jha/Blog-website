import { Hono } from 'hono'
import {prismaMiddleware} from './middleware'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono();
app.use('*', async (c, next) => {
  const origin = c.env.FRONTEND_URL || 'http://localhost:5173';
  return cors({
    origin: [origin],
    credentials: true,
  })(c, next);
});
app.use('*',prismaMiddleware);
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);



 

 

export default app
