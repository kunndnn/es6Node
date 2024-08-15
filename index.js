import express, { json, urlencoded } from "express";
const app = express();
import "dotenv/config";
import logger from "morgan";
import { connect } from "./db.js";
const { PORT } = process.env;
connect().then(() => {
  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
});
app.use(express.static("public"));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(logger("dev"));

import apis from "./apis/routes/routes.js";

app.use("/api", apis);
