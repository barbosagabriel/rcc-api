import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("recyclabe_item", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("image").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropSchema("recyclabe_item");
}
