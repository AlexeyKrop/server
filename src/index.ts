import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.use(express.json());

const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 22 },
];

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello from server!" });
});

app.get("/users", (req: Request, res: Response) => {
  res.send({ users });
});

app.post("/data", (req: Request, res: Response) => {
  console.log(req.body);
  res.send({ status: "Data received", data: req.body });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
