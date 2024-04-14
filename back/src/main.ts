import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ origin: process.env.ORIGIN }));

app.listen(8080);

let counter = 0;
app.post("/counter/increment", (req, res) => {
  counter++;
  return res.status(200).send({ value: counter });
});

app.get("/counter", (req, res) => {
  return res.status(200).send({ value: counter });
});
