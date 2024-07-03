import { app } from "./application/express/express";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.BACKEND_PORT || 3301;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
