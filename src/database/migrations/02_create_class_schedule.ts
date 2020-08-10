// schedule -> cronograma.

import Knex from "knex";

// Cria a tabela.
export async function up(knex: Knex) {

    return knex.schema.createTable("class_schedule", table => {

        table.increments("id").primary();

        table.integer("week_day").notNullable();
        table.integer("from").notNullable();
        table.integer("to").notNullable();

        // Chave estrangeira
        table.integer("class_id")

            .notNullable()
            .references("id")
            .inTable("classes")
            .onUpdate("CASCADE") // Esse cascade faz com que se caso o id seja alterado, essa tabela seja atualizada.
            .onDelete("CASCADE"); // Esse cascade faz com que se caso o usuário seja deletado, essa aula seja deletada também.

    });

}

// Deleta a tabela.
export async function down(knex: Knex) {

    return knex.schema.dropTable("class_schedule");

}