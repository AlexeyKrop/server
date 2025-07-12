import express from "express";
import {authorsRoutes} from "./routes/authors/authors";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/users", authorsRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
