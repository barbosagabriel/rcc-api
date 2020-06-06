import { Request, Response } from "express";
import knex from "../database/connection";

class RecyclableItemsController {
  async index(req: Request, res: Response) {
    const items = await knex("recyclable_item").select("*");

    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `${process.env.API_HOST}/uploads/${item.image}`,
      };
    });

    return res.json(serializedItems);
  }
}

export default RecyclableItemsController;
