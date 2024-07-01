import { app } from "./application/express";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
