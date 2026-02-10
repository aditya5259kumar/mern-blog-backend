import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("<h1>heyy from express.</h1>");
});

app.listen(port, () => {
  console.log(`server is listening at port: ${port}`);
});
