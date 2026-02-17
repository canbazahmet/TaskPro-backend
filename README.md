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
  - index.js: app bootstrap and server start
  - server.js: Express app setup, middleware, routes, Swagger
  - constants/: shared config constants
    - boards.js, tasks.js, themeType.js: enums and defaults
    - SMPT.js: SMTP/Brevo env var names
    - swaggerPath.js: path to Swagger JSON
    - templatesDir.js: template folder path
  - controllers/: request handlers (HTTP -> service)
    - auth.js, board.js, columns.js, tasks.js, email.js
  - db/: MongoDB models and hooks
    - User.js, Boards.js, Columns.js, Tasks.js, Session.js
    - hooks.js: Mongoose pre/post hooks
    - initMongoDB.js: database connection
  - middlewares/: request pipeline helpers
    - authenticate.js: JWT auth
    - validateBody.js: Joi validation
    - isValidId.js, convertBoardId.js, convertColumnId.js
    - errorHandler.js, notFoundHandler.js, logger.js
    - swaggerDocs.js: Swagger UI middleware
  - routers/: route definitions and mounting
    - auth.js, boards.js, columns.js, tasks.js, email.js
  - services/: business logic and data access
    - auth.js, boards.js, columns.js, tasks.js, sendEmail.js
  - templates/: email templates (e.g., needHelp.html)
  - utils/: shared utilities
    - env.js: env var getter
    - sendEmail.js: email delivery provider
    - saveFileToCloudinary.js, createDirIfNotExists.js
    - parseFilterParams.js, ctrlWrapper.js
  - validation/: Joi schemas for each route group
- docs/: generated OpenAPI JSON (swagger.json)
- swagger/: source YAML schema and paths

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
