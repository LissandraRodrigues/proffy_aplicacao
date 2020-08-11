import express from "express";
import cors from "cors";

import routes from "./routes"

const app = express();

// Plugin para que o express entenda JSON.
app.use(express.json());
app.use(cors());
app.use(routes);

// Ouve uma requisição HTTP.
app.listen(3333); // Porta 3333 -> localhost:3333



