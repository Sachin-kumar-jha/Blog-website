# Blog App

A full-stack blogging platform similar to Medium, allowing users to sign up, create blogs, view others' blogs, and manage their profiles.

## Features

- **User Authentication**: Sign up and Sign in functionality.
- **Create & Publish Blogs**: Users can create and publish their own blogs.
- **View Blogs**: Users can view blogs posted by others.
- **Delete Blogs**: Authors can delete their own blogs (only if the blog's `userId` matches the authenticated user's `id`).
- **Profile Management**: View user profiles to see published blogs.

## Tech Stack

### Frontend

- **Vite** for fast development.
- **React** with **TypeScript** for type-safe component development.

### Backend

- **Hono** for building lightweight and fast APIs.
- **PostgreSQL** as the relational database.
- **Prisma ORM** for database interaction.
- **Connection Pooling** to optimize database connections and performance.

## Project Setup

### Backend Setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Set up environment variables in `.env` file:

```plaintext
DATABASE_URL="your_postgres_connection_url"
JWT_SECRET="your_jwt_secret"
```

3.Add in your wrangler.jsonc file:
```plaintext
DATABASE_URL="your_postgres_connection-pool_url"
JWT_SECRET="your_jwt_secret"
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

4. Start the backend server:

```bash
npm run dev
```

### Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm run dev
```



## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

---

Feel free to contribute and enhance the platform!

