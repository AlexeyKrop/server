import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello from server!" });
});

app.post("/api/data", (req: Request, res: Response) => {
  console.log(req.body);
  res.send({ status: "Data received", data: req.body });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
