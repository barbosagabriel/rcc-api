import express from "express";
import { celebrate, Joi } from "celebrate";
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
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        state: Joi.string().required().max(2),
        city: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        items: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  collectCentersController.create
);

export default routes;
