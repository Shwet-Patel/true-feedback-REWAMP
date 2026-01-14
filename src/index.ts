import express from "express";
import router from "@routes/index";
import { PORT } from "@configs/env-config";

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
