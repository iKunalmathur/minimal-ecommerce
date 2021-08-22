## Getting Started

1: Clone Repo

2 :Install Node Modules

```bash
npm install
```

3 :Nodemon will be installed globally to your system path.

```bash
npm install -g nodemon
```

4: Setup .env file

Remove '.example' form '.env.example'

Edit : "database_name" Set your own database url

5: Run Migration

```bash
npx prisma migrate dev --name init
```

6: Run the development server

```bash
npm run dev
```

Open [http://localhost:5555](http://localhost:5555) with your browser to see the result.
