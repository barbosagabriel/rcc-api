import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("collect_center_recyclabe_item", (table) => {
    table.increments("id").primary();

    table
      .integer("collect_center_id")
      .notNullable()
      .references("id")
      .inTable("collect_center");

    table
      .integer("recyclabe_item_id")
      .notNullable()
      .references("id")
      .inTable("recyclabe_item ");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropSchema("collect_center_recyclabe_item");
}
