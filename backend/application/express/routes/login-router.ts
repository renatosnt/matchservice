import express from "express";
import { UserAdapter } from "../../../adapters/user-adapter";
import { UserDatabase } from "../../../intrastructure/user-database";

import { ContentTypeMiddleware, sessionMiddleware } from "../middlewares";
import { LoginRouterHandler } from "./handlers/login-handler";

export const router = express.Router();

const routeHandler = new LoginRouterHandler(
  new UserAdapter(new UserDatabase()),
);

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *       - session
 *     summary: Logs in the user.
 *     requestBody:
 *       description: The user credentials.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: A new session has been created.
 *         headers:
 *           x-access-token:
 *             description: The user session token
 *             schema:
 *               type: string
 */
router.post(
  "/",
  ContentTypeMiddleware,
  routeHandler.LoginRootHandler.bind(routeHandler),
);

router.get(
  "/test",
  sessionMiddleware,
  routeHandler.LoginTestHandler.bind(routeHandler),
);
