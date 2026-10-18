Yes da 😎🔥 Let's go to the next part of React Router.

Concept 19 — Dynamic Routes

Real applications-la static routes mattum irukkaathu.

For example, users list:

/users

User 101 click pannina:

/users/101

User 205:

/users/205

User 999:

/users/999

Obviously, every ID-ku separate route write panna mudiyadhu:

// ❌ Don't do this
<Route path="/users/101" ... />
<Route path="/users/102" ... />
<Route path="/users/103" ... />

Instead, dynamic route parameter use pannuvom.

React Router
<Route path="/users/:id" element={<UserDetails />} />

Here:

/users/:id
       ↑
   dynamic value

So all these URLs match:

/users/101
/users/205
/users/999

And id value changes accordingly.

Angular comparison

Angular-la:

{
  path: 'users/:id',
  component: UserDetailsComponent
}

React-la:

<Route
  path="/users/:id"
  element={<UserDetails />}
/>

Exactly same concept. 💯

Next piece is how UserDetails actually gets that id using React Router's useParams() — that's the interesting part. 🔥

