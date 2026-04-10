import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

const characters = [
  {
    name: "Charlie",
    job: "Janitor"
  },
  {
    name: "Mac",
    job: "Bouncer"
  },
  {
    name: "Dee",
    job: "Aspring actress"
  },
  {
    name: "Dennis",
    job: "Bartender"
  }
];

function MyApp() {
    const [characters, setCharacters] = useState([]);
    function updateList(person) {
      postUser(person)
        .then((res) => {
          if (res.status === 201) {
            res.json()
              .then((personData) => {
                setCharacters([...characters, personData])
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    function removeOneCharacter(index) {
      const person = characters[index]
        deleteUser(person)
        .then((res) => {
          if (res.status === 204) {
            const updated = characters.filter((_, i) => {
              return i != index;
            });
            setCharacters(updated);
          } else if (res.status === 404) {
            console.log("Recieved 404 status. Server failed to find the given user")
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    useEffect(() => {
      console.log("using effect");
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => {console.log(error); });
    }, [] );

    function postUser(person) {
      const promise = fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
      return promise
    }
    function deleteUser(person) {
      const promise = fetch(`http://localhost:8000/users`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
      return promise
    }

    return (
    <div className="container">
        <Table 
            characterData={characters}
            removeCharacter={removeOneCharacter} 
        />
        <Form handleSubmit={updateList} />
    </div>
    );
}
export default MyApp;