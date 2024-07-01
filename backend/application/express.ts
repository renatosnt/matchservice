import express from "express";

export const app = express();

app.get("/user/:userId", (req, res) => {
  res.send("should return a user");
});

app.post("/user/register", (req, res) => {
  res.send("should register a new user");
});

app.post("/user/schedule_service/:serviceId", (req, res) => {
  res.send("should assign a schedule for the user and add");
});

app.patch("/user/:userId", (req, res) => {
  res.send("should update the details of a user");
});

app.get("/service/:serviceId", (req, res) => {
  res.send("should return a service");
});

app.delete("/service/:serviceId", (req, res) => {
  res.send("should delete a service");
});

app.get("/service/search", (req, res) => {
  res.send("should search for a service");
});

app.post("/service/create", (req, res) => {
  res.send("should create a service");
});

app.patch("/service/:serviceId", (req, res) => {
  res.send("should update the details of a service");
});

app.get("/profile/:serviceProviderId", (req, res) => {
  res.send("should return a profile");
});

app.get("/profile/:serviceProviderId/schedule", (req, res) => {
  res.send("should return the schedule of this service provider");
});

app.patch("/profile/:serviceProviderId", (req, res) => {
  res.send("should update a profile");
});

app.get("/profile/create/:serviceProviderId", (req, res) => {
  res.send("should create a new profile for a service provider");
});

app.get("/schedule/:scheduleId", (req, res) => {
  res.send("should return a schedule");
});

app.patch("/schedule/:scheduleId", (req, res) => {
  res.send("should update a schedule");
});

app.patch("/schedule/mark_as_complete/:serviceId", (req, res) => {
  res.send("should mark a schedule as complete");
});

app.post("/schedule/create/:serviceId", (req, res) => {
  res.send("should create a schedule for a service");
});
