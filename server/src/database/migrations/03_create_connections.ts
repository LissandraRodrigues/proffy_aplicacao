import Knex from "knex";

// Cria a tabela.
export async function up(knex: Knex) {

    return knex.schema.createTable("connections", table => {

        table.increments("id").primary();

        // Chave estrangeira
        table.integer("user_id")

            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE") // Esse cascade faz com que se caso o id seja alterado, essa tabela seja atualizada.
            .onDelete("CASCADE"); // Esse cascade faz com que se caso o usuário seja deletado, essa aula seja deletada também.

        table.timestamp("created_at")

            .defaultTo(knex.raw("CURRENT_TIMESTAMP")) // Pega o horário e data em que o btn de contato foi clicado.
            .notNullable();

    });

}

// Deleta a tabela.
export async function down(knex: Knex) {

    return knex.schema.dropTable("connections");

}