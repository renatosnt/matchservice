import express, { Request, Response } from "express";

export const router = express.Router();

router.get("/:serviceId", (req: Request, res: Response) => {
  res.send("should return a service");
});

router.delete("/:serviceId", (req: Request, res: Response) => {
  res.send("should delete a service");
});

router.get("/search", (req: Request, res: Response) => {
  res.send("should search for a service");
});

router.post("/create", (req: Request, res: Response) => {
  res.send("should create a service");
});

router.patch("/:serviceId", (req: Request, res: Response) => {
  res.send("should update the details of a service");
});
