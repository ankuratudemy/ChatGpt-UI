require("dotenv").config();
const { OpenAI } = require("langchain/llms/openai");
const { SqlDatabase } = require("langchain/sql_db");
const { createSqlAgent, SqlToolkit } = require("langchain/agents/toolkits/sql");
const { DataSource } = require("typeorm");

const express = require("express");
const app = express();
const port = 4000;

const { Configuration, OpenAIApi } = require("openai");
console.log(process.env.OPENAI_API_KEY);

const datasource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "sample_db",
});

// console.log(datasource);

async function startServer() {
  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
  });

  const model = new OpenAI({ temperature: 0 });
  const toolkit = new SqlToolkit(db, model);
  const executor = createSqlAgent(model, toolkit);

  // adding body-parser and cors
  const bodyParser = require("body-parser");
  const cors = require("cors");

  app.use(bodyParser.json());
  app.use(cors());

  app.post("/", async (req, res) => {
    const { message } = req.body;
    console.log(message);
    const result = await executor.call({ input: message });
    console.log(`Result ${result}`)
    res.json({ botResponse: result.output });
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

// Start your server
startServer();
