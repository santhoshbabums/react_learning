Povom da 😎🔥

🟢 Concept 15 — API Calls → Angular HttpClient

Ippo namma real-world React development side-ku varom.

Angular-la API call:

this.http.get<User[]>("/api/users").subscribe(data => {
  console.log(data);
});

React core-la built-in HttpClient illa. Usually browser's fetch() use pannuvom.

1️⃣ Basic fetch()
fetch("/api/users")
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });

But component load aagumbodhu API call panna, useEffect kulla poduvom:

import { useEffect } from "react";

function Users() {

  useEffect(() => {
    fetch("/api/users")
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }, []);

  return <h2>Users</h2>;
}

export default Users;
Flow:
Users component mount
        ↓
useEffect(..., [])
        ↓
fetch("/api/users")
        ↓
Backend API
        ↓
response
        ↓
response.json()
        ↓
data
🟢 2️⃣ Why response.json()?

fetch() response direct-ah JSON object kudukkaadhu.

First:

const response = await fetch("/api/users");

Then:

const data = await response.json();

So:

HTTP Response
     ↓
response.json()
     ↓
JavaScript object/array
🟢 3️⃣ Real application-la data state-la store pannanum

Just console.log() pannina UI-la display panna mudiyadhu.

So:

import { useEffect, useState } from "react";

function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      });
  }, []);

  return (
    <>
      <h2>Users</h2>

      {users.map((user) => (
        <p key={user.id}>
          {user.name}
        </p>
      ))}
    </>
  );
}

export default Users;
🔥 Full flow
Component mount
      ↓
useEffect
      ↓
API call
      ↓
Response
      ↓
setUsers(data)
      ↓
users state changes
      ↓
React re-renders
      ↓
.map()
      ↓
Users displayed
Angular comparison

Angular:

ngOnInit()
   ↓
HttpClient.get()
   ↓
subscribe()
   ↓
users = response
   ↓
*ngFor

React:

useEffect()
   ↓
fetch()
   ↓
.then()
   ↓
setUsers(response)
   ↓
.map()

Conceptually same flow da. 🔥

Next topic Concept 16 — Loading + Error Handling. 
API call pannumbodhu Loading..., Error, Data three states epdi handle panradhu paapom.