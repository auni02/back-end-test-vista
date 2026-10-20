# Vista Backend API

This is the backend for the Vista full-stack technical test. It's a small REST API for managing companies and the services each company offers, built with Node.js, TypeScript, Express, Prisma and MySQL.

The Flutter app that talks to this API lives in a separate repo: **front-end-test-vista**.

## What you need

- Node.js 18 or newer
- MySQL 8 running locally (or anywhere you can reach)
- Postman, if you want to try the endpoints with the included collection

## Getting it running

**1. Install dependencies**

```bash
npm install
```

This also runs `prisma generate` automatically, so the Prisma client is ready to use.

**2. Set up your environment**

Copy the example file and fill in your own database details:

```bash
cp .env.example .env
```

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/vista_db"
PORT=3000
```

You don't need to create the `vista_db` database yourself. Prisma will create it in the next step if it doesn't exist.

**3. Create the tables**

```bash
npx prisma migrate deploy
```

This applies the migrations in `prisma/migrations`. If you're changing the schema yourself, use `npm run prisma:migrate` instead, which creates new migrations as you go.

**4. Start the server**

For development (restarts when you save a file):

```bash
npm run dev
```

For production:

```bash
npm run build
npm start
```

You should see `Server is running on http://localhost:3000`. A quick way to check everything is wired up is to open http://localhost:3000/health, which should return `{"status":"ok"}`.

If you want to look at the data directly, `npm run prisma:studio` opens a browser view of the database.

## Endpoints

| Method | Path | What it does | Success |
|---|---|---|---|
| GET | `/health` | Checks the server is up | 200 |
| POST | `/companies` | Creates a company | 201 |
| GET | `/companies` | Lists all companies, each with its services | 200 |
| POST | `/services` | Creates a service under a company | 201 |
| GET | `/services/:id` | Gets one service by its id | 200 |

### Create a company

```http
POST /companies
Content-Type: application/json

{
  "name": "Acme Sdn Bhd",
  "registrationNumber": "202401000001"
}
```

Both fields are required and can't be blank. Registration numbers are unique, so sending one that already exists returns **409 Conflict**.

### Create a service

```http
POST /services
Content-Type: application/json

{
  "companyId": 1,
  "name": "Office Cleaning",
  "description": "Weekly cleaning for small offices",
  "price": 150.50
}
```

`companyId` must be the id of an existing company (otherwise you get **404**). `price` must be a positive number, up to 99,999,999.99. It's stored as a `DECIMAL(10,2)` so money values don't pick up floating-point rounding errors.

### Errors

Every error comes back as JSON with a `message`. Validation errors also list which fields were wrong:

```json
{
  "message": "Validation failed",
  "errors": [
    { "field": "name", "message": "name is required" }
  ]
}
```

| Status | When |
|---|---|
| 400 | Missing or invalid fields, malformed JSON, or a non-numeric id |
| 404 | The company or service doesn't exist, or the route doesn't exist |
| 409 | A company with that registration number already exists |
| 500 | Something went wrong on the server (details are logged, not sent to the client) |

## API documentation (Postman)

The full collection is in `postman/Vista-API.postman_collection.json`. In Postman, click **Import** and choose that file.

All requests use a `{{baseUrl}}` collection variable, set to `http://localhost:3000` by default. If you run the API on a different port, change it once in the collection's **Variables** tab. Each request has saved example responses, including the error cases.

## Running with Docker

There's a Dockerfile if you'd rather not install Node locally. You still need a MySQL database. Note that inside a container, `localhost` means the container itself, so to reach MySQL on your own machine use `host.docker.internal`:

```bash
docker build -t vista-backend .
docker run -p 3000:3000 \
  -e DATABASE_URL="mysql://USER:PASSWORD@host.docker.internal:3306/vista_db" \
  vista-backend
```

The container runs `prisma migrate deploy` on startup, so the tables are created for you.

## How the code is organised

```
prisma/
  schema.prisma         Company and Service models
  migrations/           SQL history of the schema
src/
  index.ts              Loads .env and starts the server
  app.ts                Express setup: middleware, routes, error handling
  routes/               Maps URLs to validators and controllers
  validators/           express-validator rules for each endpoint
  controllers/          Request handlers that talk to the database
  middleware/
    logger.ts           Logs method, path and timestamp for every request
    validate.ts         Turns validation errors into a 400 response
    notFound.ts         JSON 404 for unknown routes
    errorHandler.ts     Catches anything unexpected and returns a 500
  types/dto.ts          TypeScript interfaces for request and response bodies
  lib/prisma.ts         Shared Prisma client
```

Each request goes through the same path: the logger, then JSON parsing, then the route's validation rules. If the input is bad, it stops there with a 400 and never touches the database. Otherwise the controller handles it.

## Data model

A **Company** has a name and a unique registration number, and can have many services.
A **Service** belongs to exactly one company and has a name, description and price.

A company can't be deleted while it still has services (`onDelete: Restrict`), so services are never left pointing at a company that no longer exists.
