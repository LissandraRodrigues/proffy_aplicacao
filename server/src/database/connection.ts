import knex from "knex";

// Permite que no node, consigamos 'andar' nos caminhos da nossa aplicação.
import path from "path";

// migrations -> controlam a versão do banco de dados.

const db = knex({

    client: "sqlite3",

    connection: {
        
        // __dirname retorna a pasta onde este arquivo está.
        filename: path.resolve(__dirname, "database.sqlite")

    },

    // Define que quando a aplicação não souber o que deve adicionar no bd, coloque null.
    useNullAsDefault: true,

})

export default db;