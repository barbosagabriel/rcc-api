import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("recyclable_item").insert([
    { title: "Batteries", image: "batteries.svg" },
    { title: "Eletronic Waste", image: "eletronic.svg" },
    { title: "Lights", image: "lights.svg" },
    { title: "Cooking Oil", image: "oil.svg" },
    { title: "Organic Waste", image: "organic.svg" },
    { title: "Paper", image: "paper.svg" },
  ]);
}
