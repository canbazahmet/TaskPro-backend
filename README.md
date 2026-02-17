# TaskPro Backend 📦

Backend API for TaskPro. Provides auth, boards, columns, tasks, and help email endpoints, plus Swagger documentation.

## Technologies 🧰

- Node.js (ESM)
- Express.js
- MongoDB + Mongoose
- JWT authentication
- Joi validation
- Nodemailer (legacy) / Brevo API (current email delivery)
- Swagger UI (OpenAPI)
- Cloudinary (optional uploads)

## Component Structure 🧱

- src/
  - index.js: app entry point
  - server.js: Express setup, middleware, routes, Swagger
  - constants/: shared constants (SMTP, swagger path, etc.)
  - controllers/: request handlers
  - db/: Mongoose models and hooks
  - middlewares/: auth, validation, error handling, Swagger
  - routers/: route definitions
  - services/: business logic and data access
  - templates/: email templates
  - utils/: helpers (env, email sender, file utils)
  - validation/: Joi schemas
- docs/: OpenAPI files (swagger.json)
- swagger/: source YAML files

## Swagger 🧾

- Deployed: https://taskpro-backend-qxl7.onrender.com/api-docs

## Environment Variables (example) 🔐

- PORT
- MONGODB_URI
- JWT_SECRET
- BREVO_API_KEY
- SMTP_FROM
- CLOUD_NAME, API_KEY, API_SECRET (optional)

## Scripts ▶️

- npm run start
- npm run dev
