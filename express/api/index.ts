import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello from server!" });
});

app.post("/api/data", (req, res) => {
  console.log(req.body);
  res.send({ status: "Data received", data: req.body });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
