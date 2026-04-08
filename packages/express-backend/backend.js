import express from "express";
import { use } from "react";

const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUserById = (userId) => {
    users["users_list"] =  users["users_list"].filter(
        (user) => user["id"] != userId
    );
}

const findUsersByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] === name && user["job"] === job
    )
}

app.delete("/users", (req, res) => {
    const userToDelete = req.body;
    console.log("deletings user: " + userToDelete)
    deleteUserById(userToDelete["id"]);
    res.send();
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job
    if (name != undefined) {
        if (job != undefined) {
            let result = findUsersByNameAndJob(name, job)
            result = {users_list: result };
            res.send(result);
        } else {
            let result = findUserByName(name);
            result = { users_list: result };
            res.send(result);
        }
    } else {
        res.send(users);
    }
});