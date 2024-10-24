This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## This project is a simple personal task manager with a basic functionality for CRUD operations.


## Getting Started

First, install deps, and run the database container
```bash
npm i            # install deps

bash run_db.sh   # pull and run psql db

npx prisma db push # initiat database tables

# in case you want to generate some random data:

npm run seed

# note that the seed file in prisma dir, you can modify it to generate more data if you'd like 🙂
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


