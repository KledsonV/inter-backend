import "dotenv/config";
const port = process.env.PORT;

import express from "express";
const app = express();

import bodyParser from "body-parser";
import cors from "cors";

// Controllers
import UserController from "../interfaces/controllers/UserController.mjs";
import StudentController from "../interfaces/controllers/StudentController.mjs";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: `http://localhost:${process.env.PORT_CORS}` }));

app.use(UserController);
app.use(StudentController);

app.listen(port, () => {
  try {
    console.log(`Server running in port: ${port}`);
  } catch (error) {
    console.log(`Error in app listen: ${error}`);
  }
});
