import express, { Request, Response } from "express";
import { randomUUID, UUID } from "crypto";
import bcrypt from "bcrypt";
import { UserDatabase } from "../../intrastructure/user-database";
import { UserAdapter } from "../../adapters/user-adapter";
import { User } from "../../domain/entities/user.entity";
import {
  ContentTypeMiddleware,
  CustomRequest,
  sessionMiddleware,
} from "./middlewares";

export const router = express.Router();
const userAdapter = new UserAdapter(new UserDatabase());

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
router.get("/self", sessionMiddleware, async (req: Request, res: Response) => {
  try {
    const userData = (req as CustomRequest).userData;
    await userAdapter.getById(userData.id);

    res.status(200).json(userData);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

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
router.get("/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as UUID;
    const user = await userAdapter.getById(userId);

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

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
  async (req: Request, res: Response) => {
    try {
      const { username, realName, email, password, type } = req.body;

      if (type !== "Customer" || type !== "ServiceProvider") {
        res
          .status(422)
          .json({ message: "Type should be one of Customer, ServiceProvider" });
        return;
      }

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      // idealmente o hashing deveria acontecer no front e passar o password_hash pro back

      const newUser = new User(
        randomUUID(),
        username,
        realName,
        email,
        passwordHash,
        type,
        [],
        null,
        new Date(),
      );
      const savedUser = await userAdapter.save(newUser);
      res.status(201).json(savedUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
);

router.post("/schedule_service/:serviceId", (req: Request, res: Response) => {
  res.send("should assign a schedule for the user and add");
});

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
 *               passwordHash:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum:
 *                   - Customer
 *                   - ServiceProvider
 *                 example: "Customer or ServiceProvider"
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
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId as UUID;
      const user = await userAdapter.getById(userId);
      const { username, realName, email, passwordHash, type } = req.body;
      if (username) user.username = username;
      if (realName) user.realName = realName;
      if (email) user.email = email;
      if (passwordHash) user.passwordHash = passwordHash;
      if (type) {
        if (type !== "Customer" || type !== "ServiceProvider") {
          res.status(422).json({
            message: "Type should be one of Customer, ServiceProvider",
          });
          return;
        }
        user.type = type;
      }
      const updatedUser = await userAdapter.save(user);
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
);
