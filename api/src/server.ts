import express from "express";
import path from "path";
import cors from "cors";
import { errors } from "celebrate";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

import * as swaggerDocument from "../swagger.json";
import routes from "./routes";

dotenv.config();
const app = express();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(express.json());
app.use(routes);

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.use(errors());

app.listen(process.env.PORT);
