import express from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import CollectCentersController from "./controllers/CollectCentersController";
import RecyclableItemsController from "./controllers/RecyclableItemsController";

const routes = express.Router();
const upload = multer(multerConfig);

const collectCentersController = new CollectCentersController();
const recyclableItemsController = new RecyclableItemsController();

routes.get("/recyclable-item", recyclableItemsController.index);

routes.get("/collection-center", collectCentersController.index);
routes.get("/collection-center/:id", collectCentersController.show);
routes.post(
  "/collection-center",
  upload.single("image"),
  collectCentersController.create
);

export default routes;
