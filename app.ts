import path from "path";
import express from "express";
import BuildRouter from "./routes";
import bodyParser from "body-parser";
import cors from "cors";

const corsOpt = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};


const app = express();
const router = express.Router();
require("dotenv").config();

(() => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
  app.use(cors(corsOpt));
  app.use("/api", router);
  BuildRouter(router);
  app.listen(process.env.PORT, () => {
    console.log("Мы стартанули");
  });
})();