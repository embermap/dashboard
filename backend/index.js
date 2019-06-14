const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite"
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

app.get("/api/todos", (req, res) => res.send("Foo!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
