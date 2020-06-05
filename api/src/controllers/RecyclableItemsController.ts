import { Request, Response } from "express";
import knex from "../database/connection";
import dotenv from "dotenv";

dotenv.config();

class RecyclableItemsController {
  async index(req: Request, res: Response) {
    const items = await knex("recyclable_item").select("*");

    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `${process.env.API_HOST}:${process.env.API_PORT}/uploads/${item.image}`,
      };
    });

    return res.json(serializedItems);
  }
}

export default RecyclableItemsController;
