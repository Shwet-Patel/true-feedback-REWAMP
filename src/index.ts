import express from "express";
import router from "@routes/index";
import { PORT } from "@configs/env-config";
import { responseMiddleware } from "@/middlewares/response.middleware";
import { errorMiddleware } from "@/middlewares/error.middleware";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "@configs/swagger-config";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(responseMiddleware);
app.use('/api', router);
app.use(errorMiddleware);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
