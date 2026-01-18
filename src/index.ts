import express from "express";
import router from "@routes/index";
import { PORT } from "@configs/env-config";
import { responseMiddleware } from "@/middlewares/response.middleware";
import { errorMiddleware } from "@/middlewares/error.middleware";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(responseMiddleware);
app.use('/api', router);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
