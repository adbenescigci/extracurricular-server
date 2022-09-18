import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import programRoutes from "./routes/programs.js";
import eventRoutes from "./routes/events.js";
import userRoutes from "./routes/users.js";

const app = express();

dotenv.config();
app.use(bodyParser.json({ limit: "32mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "32mb", extended: true }));
app.use(cors());

app.use("/programs", programRoutes);
app.use("/events", eventRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;
const URL = process.env.CONNECTION_URL.replace(
  "<password>",
  `${process.env.PASSWORD}`
);

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port :${PORT}`))
  )
  .catch((err) => console.log(err.message));
