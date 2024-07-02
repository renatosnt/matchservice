import express from "express";
import { router as loginRouter } from "./login-router";
import { router as userRouter } from "./user-router";
import { router as scheduleRouter } from "./schedule-router";
import { router as profileRouter } from "./profile-router";
import { router as serviceRouter } from "./service-router";

export const app = express();

app.use(express.json());
app.use("/login", loginRouter);
app.use("/user", userRouter);
app.use("/schedule", scheduleRouter);
app.use("/profile", profileRouter);
app.use("/service", serviceRouter);
