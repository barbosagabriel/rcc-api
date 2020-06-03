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

    return res.json(collectCenters);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const collectCenter = await knex("collect_center").where("id", id).first();

    if (!collectCenter) {
      return res
        .status(400)
        .json({ message: `Collect Center not found with id ${id}` });
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

    return res.json({ ...collectCenter, items: recyclableItems });
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
        image:
          "https://images.unsplash.com/photo-1475275083424-b4ff81625b60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        state,
      };

      const insertedIds = await trx("collect_center").insert(collectCenter);

      const collect_center_id = insertedIds[0];

      const collectCenterItems = items.map((recyclable_item_id: number) => {
        return {
          recyclable_item_id,
          collect_center_id,
        };
      });

      await trx("collect_center_recyclable_item").insert(collectCenterItems);

      trx.commit();

      return res.status(201).json({ id: collect_center_id, ...collectCenter });
    } catch (error) {
      trx.rollback();
      console.log(error);
      return res.status(400).json({
        message: "An unexpected error happened creating a collect center",
      });
    }
  }
}

export default CollectCentersController;
