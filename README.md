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

```
.
├─ .editorconfig
├─ .env
├─ .env.template
├─ .gitignore
├─ .prettierrc
├─ eslint.config.mjs
├─ package-lock.json
├─ package.json
├─ README.md
├─ redocly.yaml
├─ docs/
│  ├─ index.html
│  ├─ openapi.yaml
│  └─ swagger.json
├─ src/
│  ├─ index.js
│  ├─ server.js
│  ├─ constants/
│  │  ├─ boards.js
│  │  ├─ cloudinary.js
│  │  ├─ emailRegexp.js
│  │  ├─ SMPT.js
│  │  ├─ swaggerPath.js
│  │  ├─ tasks.js
│  │  ├─ templatesDir.js
│  │  ├─ tempUpload.js
│  │  ├─ themeType.js
│  │  └─ tokenLifetime.js
│  ├─ controllers/
│  │  ├─ auth.js
│  │  ├─ board.js
│  │  ├─ columns.js
│  │  ├─ email.js
│  │  └─ tasks.js
│  ├─ db/
│  │  ├─ Boards.js
│  │  ├─ Columns.js
│  │  ├─ hooks.js
│  │  ├─ initMongoDB.js
│  │  ├─ Session.js
│  │  ├─ Tasks.js
│  │  └─ User.js
│  ├─ middlewares/
│  │  ├─ authenticate.js
│  │  ├─ convertBoardId.js
│  │  ├─ convertColumnId.js
│  │  ├─ errorHandler.js
│  │  ├─ isValidColumnId.js
│  │  ├─ isValidId.js
│  │  ├─ logger.js
│  │  ├─ multer.js
│  │  ├─ notFoundHandler.js
│  │  ├─ swaggerDocs.js
│  │  └─ validateBody.js
│  ├─ routers/
│  │  ├─ allUse.js
│  │  ├─ auth.js
│  │  ├─ boards.js
│  │  ├─ columns.js
│  │  ├─ email.js
│  │  └─ tasks.js
│  ├─ services/
│  │  ├─ auth.js
│  │  ├─ boards.js
│  │  ├─ columns.js
│  │  ├─ sendEmail.js
│  │  └─ tasks.js
│  ├─ templates/
│  │  └─ needHelp.html
│  ├─ utils/
│  │  ├─ createDirIfNotExists.js
│  │  ├─ ctrlWrapper.js
│  │  ├─ env.js
│  │  ├─ getDate.js
│  │  ├─ parseFilterParams.js
│  │  ├─ saveFileToCloudinary.js
│  │  └─ sendEmail.js
│  └─ validation/
│     ├─ auth.js
│     ├─ boards.js
│     ├─ columns.js
│     ├─ email.js
│     └─ tasks.js
├─ swagger/
│  ├─ components/
│  │  ├─ responses/
│  │  │  ├─ 400.yaml
│  │  │  ├─ 401.yaml
│  │  │  ├─ 403.yaml
│  │  │  ├─ 404.yaml
│  │  │  ├─ 409.yaml
│  │  │  └─ 500.yaml
│  │  └─ schemas/
│  │     ├─ board.yaml
│  │     ├─ column.yaml
│  │     ├─ email.yaml
│  │     ├─ sessions.yaml
│  │     ├─ task.yaml
│  │     └─ user.yaml
│  ├─ pathsAuth/
│  │  ├─ postLogin.yaml
│  │  ├─ postLogout.yaml
│  │  ├─ postRefresh.yaml
│  │  ├─ postRegister.yaml
│  │  └─ {id}/
│  │     ├─ get.yaml
│  │     └─ patch.yaml
│  ├─ pathsBoadrs/
│  │  ├─ get.yaml
│  │  ├─ post.yaml
│  │  └─ {id}/
│  │     ├─ delete.yaml
│  │     ├─ get.yaml
│  │     └─ patch.yaml
│  ├─ pathsColumn/
│  │  ├─ post.yaml
│  │  └─ {id}/
│  │     ├─ delete.yaml
│  │     └─ patch.yaml
│  ├─ pathsHelp/
│  │  └─ post.yaml
│  └─ pathsTasks/
│     ├─ post.yaml
│     └─ {id}/
│        ├─ delete.yaml
│        └─ patch.yaml
├─ temp/
└─ uploads/
```

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
