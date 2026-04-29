import express from "express";
import cors from "cors";

import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query["name"];
  const job = req.query["job"];

  userServices.getUsers(name, job)
    .then((result) => {
      res.send({ users_list: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error ocurred in the server.");
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  userServices.findUserById(id)
    .then((result) => {
      if (result === undefined || result === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.send({ users_list: result });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error retrieving user.");
    });
});

app.post("/users", (req, res) => {
  const user = req.body;

  userServices.addUser(user)
    .then((savedUser) => {
      if (savedUser) {
        res.status(201).send(savedUser);
      } else {
        res.status(500).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error adding user.");
    });
});

app.delete("/users", (req, res) => {
  const id = req.body;

  userServices.deleteUserById(id)
    .then((deletedUser) => {
      if (deletedUser) {
        res.status(204).send();
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error deleting user.");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});