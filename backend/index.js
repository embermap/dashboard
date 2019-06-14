const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");

// ENV variables
const PORT = process.env.PORT || 3000;
const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost:5432/dashboard_development";

const sequelize = new Sequelize(DATABASE_URL);

const Model = Sequelize.Model;
class Todo extends Model {}
Todo.init(
  {
    // attributes
    text: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false
    },
    position: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "todo"
  }
);

async function main() {
  await Todo.sync();

  app.use(bodyParser.json());

  app.get("/api/todos", async (req, res) => {
    let todos = await Todo.findAll();

    res.json(todos);
  });

  app.post("/api/todos", async (req, res) => {
    let todo = await Todo.create(req.body.todo);

    res.json(todo);
  });

  app.patch("/api/todos", async (req, res) => {
    let json = req.body;
    let todos = [];

    await sequelize.transaction(async transaction => {
      for (let todoJson of json) {
        let todo = await Todo.findByPk(todoJson.id);
        await todo.update(todoJson, { transaction });
        todos.push(todo);
      }
    });

    res.json(todos);
  });

  app.patch("/api/todos/:id", async (req, res) => {
    let todo = await Todo.findByPk(req.params.id);
    await todo.update(req.body.todo);

    res.json(todo);
  });

  app.delete("/api/todos/:id", async (req, res) => {
    let todo = await Todo.findByPk(req.params.id);
    await todo.destroy();

    res.status(204).send();
  });

  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
}

main();
