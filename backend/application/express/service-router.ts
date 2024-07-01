import express from "express";

export const router = express.Router();

router.get("/:serviceId", (req, res) => {
  res.send("should return a service");
});

router.delete("/:serviceId", (req, res) => {
  res.send("should delete a service");
});

router.get("/search", (req, res) => {
  res.send("should search for a service");
});

router.post("/create", (req, res) => {
  res.send("should create a service");
});

router.patch("/:serviceId", (req, res) => {
  res.send("should update the details of a service");
});
