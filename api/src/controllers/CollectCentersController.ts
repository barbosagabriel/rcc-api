import { Request, Response } from "express";

import knex from "../database/connection";

class CollectCentersController {
  async index(req: Request, res: Response) {
    const { city, state, items } = req.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const collectCenters = await knex("collect_center")
      .join(
        "collect_center_recyclable_item",
        "collect_center.id",
        "=",
        "collect_center_recyclable_item.collect_center_id"
      )
      .whereIn("collect_center_recyclable_item.recyclable_item_id", parsedItems)
      .where("city", String(city))
      .where("state", String(state))
      .distinct()
      .select("collect_center.*");

    const serializedCenter = collectCenters.map((center) => {
      return {
        ...center,
        image_url: `${process.env.API_HOST}/uploads/images/${center.image}`,
      };
    });

    return res.json(serializedCenter);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const collectCenter = await knex("collect_center").where("id", id).first();

    if (!collectCenter) {
      return res
        .status(400)
        .json({ message: `Collection Center not found with id ${id}` });
    }

    const recyclableItems = await knex("recyclable_item")
      .join(
        "collect_center_recyclable_item",
        "recyclable_item.id",
        "=",
        "collect_center_recyclable_item.recyclable_item_id"
      )
      .where("collect_center_recyclable_item.collect_center_id", id)
      .select("recyclable_item.title");

    return res.json({
      ...collectCenter,
      items: recyclableItems,
      image_url: `${process.env.API_HOST}/uploads/images/${collectCenter.image}`,
    });
  }

  async create(req: Request, res: Response) {
    const trx = await knex.transaction();

    try {
      const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        state,
        items,
      } = req.body;

      const collectCenter = {
        name,
        image: req.file.filename,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        state,
      };

      const insertedIds = await trx("collect_center").insert(collectCenter);

      const collect_center_id = insertedIds[0];

      const collectCenterItems = items
        .split(",")
        .map((item: string) => Number(item.trim()))
        .map((recyclable_item_id: number) => {
          return {
            recyclable_item_id,
            collect_center_id,
          };
        });

      await trx("collect_center_recyclable_item").insert(collectCenterItems);

      trx.commit();

      return res.status(201).json({
        ...collectCenter,
        id: collect_center_id,
        image_url: `${process.env.API_HOST}/uploads/images/${collectCenter.image}`,
      });
    } catch (error) {
      trx.rollback();
      console.log(error);
      return res.status(400).json({
        message: "An unexpected error happened creating a collection center",
      });
    }
  }
}

export default CollectCentersController;
