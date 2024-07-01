import express from "express";

export const router = express.Router();

router.get("/:serviceProviderId", (req, res) => {
  res.send("should return a profile");
});

router.get("/:serviceProviderId/schedule", (req, res) => {
  res.send("should return the schedule of this service provider");
});

router.patch("/:serviceProviderId", (req, res) => {
  res.send("should update a profile");
});

router.get("/create/:serviceProviderId", (req, res) => {
  res.send("should create a new profile for a service provider");
});
