import express from "express";
import path from "path";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", function (req, res) {
  res.send("about");
});

export default app;
