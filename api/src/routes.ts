import express from "express";
import knex from "./database/connection";

import CollectCentersController from "./controllers/CollectCentersController";
import RecyclableItemsController from "./controllers/RecyclableItemsController";

const routes = express.Router();

const collectCentersController = new CollectCentersController();
const recyclableItemsController = new RecyclableItemsController();

routes.get("/recyclable-item", recyclableItemsController.index);

routes.get("/collection-center", collectCentersController.index);
routes.get("/collection-center/:id", collectCentersController.show);
routes.post("/collection-center", collectCentersController.create);

export default routes;
