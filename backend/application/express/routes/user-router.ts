import express from "express";
import { UserAdapter } from "../../../adapters/user-adapter";
import { UserDatabase } from "../../../intrastructure/user-database";
import { ContentTypeMiddleware, sessionMiddleware } from "../middlewares";
import { SchedulingAdapter } from "../../../adapters/scheduling-adapter";
import { SchedulingDatabase } from "../../../intrastructure/scheduling-database";
import { UserRouterHandler } from "./handlers/user-handler";

export const router = express.Router();

const userHandler = new UserRouterHandler(
  new SchedulingAdapter(new SchedulingDatabase()),
  new UserAdapter(new UserDatabase()),
);

/**
 * @openapi
 * /user/self:
 *   get:
 *     tags:
 *       - users
 *     summary: Gets the authorized user data.
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Returns the user
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal Server Error
 *
 */
router.get(
  "/self",
  sessionMiddleware,
  userHandler.getSelfUserHandler.bind(userHandler),
);

/**
 * @openapi
 * /user/{userId}:
 *   get:
 *     tags:
 *       - users
 *     summary: Gets the user data by ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: UUID
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: Returns the user
 *       500:
 *         description: Internal Server Error
 *
 */
router.get("/:userId", userHandler.getUserByIdHandler.bind(userHandler));

/**
 * @openapi
 * /user/{userId}/schedule:
 *   get:
 *     tags:
 *       - users
 *     summary: Gets all the schedules the user has.
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: UUID
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: Returns the user schedules.
 *       500:
 *         description: Internal Server Error
 *
 */
router.get(
  "/:userId/schedule",
  sessionMiddleware,
  userHandler.getUserScheduleByIdHandler.bind(userHandler),
);

/**
 * @openapi
 * /user/register:
 *   post:
 *     tags:
 *       - users
 *     summary: Registers a new user.
 *     requestBody:
 *       description: The user information.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               realName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum:
 *                   - Customer
 *                   - ServiceProvider
 *                 example: "Customer or ServiceProvider"
 *             required:
 *               - username
 *               - realName
 *               - email
 *               - password
 *               - type
 *     responses:
 *       200:
 *         description: Returns the user
 *       422:
 *         description: Data validation error
 *       500:
 *         description: Internal Server Error
 *
 */
router.post(
  "/register",
  ContentTypeMiddleware,
  userHandler.registerUserHandler.bind(userHandler),
);

/**
 * @openapi
 * /user/{userId}:
 *   patch:
 *     tags:
 *       - users
 *     summary: Updates the content of a user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: UUID
 *         description: The user ID.
 *     requestBody:
 *       description: The user information. Only the provided fields are going to be updated.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               realName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Returns the user
 *       403:
 *         description: Forbidden
 *       422:
 *         description: Data validation error
 *       500:
 *         description: Internal Server Error
 *
 */
router.patch(
  "/:userId",
  [ContentTypeMiddleware, sessionMiddleware],
  userHandler.patchUserByIdHandler.bind(userHandler),
);
