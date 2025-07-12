import express from "express";
import {authorsRoutes} from "./routes";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/authors", authorsRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
