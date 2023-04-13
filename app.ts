import path from "path";
import express from "express";
import BuildRouter from "./routes";

const app = express();
const router = express.Router();
require("dotenv").config();

(() => {
  BuildRouter(router);
  app.listen(process.env.PORT, () => {
    console.log("Мы стартанули");
  });
})();