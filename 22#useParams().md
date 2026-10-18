Polam da 😎🔥 Now useParams() paapom. Dynamic routing-la idhu very important.

useParams() — Dynamic URL value edukkardhu

Namma route:

<Route
  path="/users/:id"
  element={<UserDetails />}
/>

Here :id means:

"URL-la inga oru dynamic value varum."

For example:

/users/101
/users/205
/users/999
1️⃣ User clicks a user

Suppose Users page:

function Users() {
  return (
    <>
      <Link to="/users/101">Santhosh</Link>
      <Link to="/users/102">Arun</Link>
    </>
  );
}

User clicks Santhosh.

URL becomes:

/users/101
2️⃣ Route catches it
<Route
  path="/users/:id"
  element={<UserDetails />}
/>

React Router sees:

/users/101
       ↑
       id = 101

and renders:

<UserDetails />
3️⃣ UserDetails gets the ID
import { useParams } from "react-router-dom";

function UserDetails() {

  const { id } = useParams();

  return (
    <div>
      <h2>User Details</h2>
      <p>User ID: {id}</p>
    </div>
  );
}

export default UserDetails;

Now if URL is:

/users/101

UI:

User Details
User ID: 101

If URL changes to:

/users/205

same component:

User Details
User ID: 205

🔥 Same component, different data.

Angular comparison

Angular-la nee probably:

this.route.snapshot.paramMap.get('id')

use panniruppa.

React:

const { id } = useParams();

So:

Angular	React
:id	:id
ActivatedRoute	React Router hooks
paramMap.get('id')	useParams()
Real API example 🔥

This is where dynamic routing becomes useful.

Suppose URL:

/users/101

We get:

const { id } = useParams();

Then API:

useEffect(() => {

  fetch(`/api/users/${id}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });

}, [id]);

Flow:

User clicks Santhosh
       ↓
/users/101
       ↓
useParams()
       ↓
id = 101
       ↓
GET /api/users/101
       ↓
User details

This is a very common real-world pattern:

List Page
   ↓
Click User
   ↓
/users/:id
   ↓
Details Page
   ↓
useParams()
   ↓
API call using ID

One important thing to remember:

useParams() gives you URL parameters. It doesn't fetch the user data by itself.

It only gives you the id; you decide what to do with that ID — usually API call, lookup, etc. 💯