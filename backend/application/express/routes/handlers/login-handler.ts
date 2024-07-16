import { Request, Response } from "express";
import { UserAdapter } from "../../../../adapters/user-adapter";
import { getSecretKey } from "../../../../environment";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../../middlewares";

interface UserLoginData {
  email: string;
  password: string;
}

export class LoginRouterHandler {
  private readonly userAdapter: UserAdapter;

  constructor(userAdapter: UserAdapter) {
    this.userAdapter = userAdapter;
  }

  public async LoginRootHandler(req: Request, res: Response) {
    const body: UserLoginData = req.body;

    try {
      const databaseUser = await this.userAdapter.getByEmail(body.email);

      if (body.password !== databaseUser.password) {
        res.status(401).json({ message: `Wrong username or password.` });
        return;
      }

      const userData = {
        id: databaseUser.id,
        type: databaseUser.type,
        username: databaseUser.username,
        realName: databaseUser.realName,
      };

      const token = jwt.sign(userData, getSecretKey(), {
        expiresIn: "7d",
      });
      res.status(201).json({ token: token, ...userData });
      res.end();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async LoginTestHandler(req: Request, res: Response) {
    const userData = (req as CustomRequest).userData;
    res.status(200).json(userData);
  }
}
