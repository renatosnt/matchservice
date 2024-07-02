import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import { router as loginRouter } from "./login-router";
import { router as userRouter } from "./user-router";
import { router as scheduleRouter } from "./schedule-router";
import { router as profileRouter } from "./profile-router";
import { router as serviceRouter } from "./service-router";
import { docs } from "./swagger";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/docs", swaggerUI.serve, swaggerUI.setup(docs));

app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/schedule", scheduleRouter);
app.use("/profile", profileRouter);
app.use("/service", serviceRouter);
