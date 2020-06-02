import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("recyclabe_item").insert([
    { title: "Lights", image: "lights.svg" },
    { title: "Batteries", image: "batteries.svg" },
    { title: "Paper", image: "paper.svg" },
    { title: "Eletronic Waste", image: "eletronic.svg" },
    { title: "Organic Waste", image: "organic.svg" },
    { title: "Cooking Oil", image: "oil.svg" },
  ]);
}
