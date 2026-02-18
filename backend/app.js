import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import connectDB from "./config/db.js";
import userAuthRoutes from "./routes/userAuthRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

const app = express();
dotenv.config();
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  await connectDB();
})();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    method: ["PUT", "POST", "GET", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", userAuthRoutes);
app.use("/api", blogRoutes);
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.render("index", { msg: "hey from express" });
});

app.use((req, res, next) => {
  next(createError(404, "Route not found!"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error!",
  });
});

app.listen(port, () => {
  console.log(`server is listening at port: ${port}`);
});
