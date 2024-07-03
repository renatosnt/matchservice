import express, { Request, Response } from "express";

export const router = express.Router();

router.get("/:serviceProviderId", (req: Request, res: Response) => {
  res.send("should return a profile");
});

router.get("/:serviceProviderId/rating", (req: Request, res: Response) => {
  res.send(
    "should calculate and return the average rating of all completed schedules of this service provider",
  );
});

router.get("/:serviceProviderId/schedule", (req: Request, res: Response) => {
  res.send("should return the schedule of this service provider");
});

router.patch("/:serviceProviderId", (req: Request, res: Response) => {
  res.send("should update a profile");
});

router.get("/create/:serviceProviderId", (req: Request, res: Response) => {
  res.send("should create a new profile for a service provider");
});
