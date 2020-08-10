import Knex from "knex";

// Cria a tabela.
export async function up(knex: Knex) {

    return knex.schema.createTable("classes", table => {

        table.increments("id").primary();

        table.string("subject").notNullable();
        table.decimal("cost").notNullable();

        // Chave estrangeira
        table.integer("user_id")

            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE") // Esse cascade faz com que se caso o id seja alterado, essa tabela seja atualizada.
            .onDelete("CASCADE"); // Esse cascade faz com que se caso o usuário seja deletado, essa aula seja deletada também.

    });

}

// Deleta a tabela.
export async function down(knex: Knex) {

    return knex.schema.dropTable("classes");

}