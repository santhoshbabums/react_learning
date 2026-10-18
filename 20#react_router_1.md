Concept 19 — React Router: next part

Ippo BrowserRouter → Routes → Route → Outlet epdi together work aaguthu nu paapom.

First overall flow:

Browser URL
    ↓
BrowserRouter
    ↓
Routes
    ↓
Matching Route
    ↓
Component

For example:

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/users" element={<Users />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
</BrowserRouter>

If URL:

/users

then:

/users
  ↓
Routes
  ↓
<Route path="/users" ... />
  ↓
<Users />
But Outlet is for Nested Routes

Suppose your application has:

Dashboard
 ├── Overview
 ├── Users
 └── Settings

You don't want to repeat the Dashboard layout for every page.

So we can do:

<Route path="/dashboard" element={<Dashboard />}>
  <Route path="overview" element={<Overview />} />
  <Route path="users" element={<Users />} />
  <Route path="settings" element={<Settings />} />
</Route>

And inside Dashboard:

import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>

      <nav>
        <Link to="overview">Overview</Link>
        <Link to="users">Users</Link>
        <Link to="settings">Settings</Link>
      </nav>

      <Outlet />
    </>
  );
}

Now:

/dashboard/users

will render:

Dashboard
   ↓
Dashboard component
   ↓
<Outlet />
   ↓
Users component

So <Outlet /> is basically the placeholder where the matched child route gets rendered.

Angular mapping

Angular:

<router-outlet></router-outlet>

React:

<Outlet />

Both are basically saying:

"Matched route-oda component inga render aagattum." 😎

Next important piece is nested routing + dynamic routes like /users/101, which is very common in real applications.

can't understand explain little bit meaning full 

Sure da 😄 Let's slow down. Outlet-a ippo forget panniduvom. First BrowserRouter → Routes → Route meaning mattum crystal clear pannuvom.

1. BrowserRouter — "Namma app-ku routing enable pannunga"
<BrowserRouter>
   ...
</BrowserRouter>

Idhu outer wrapper.

Angular-la routing setup/configuration irukkum la? Similar concept.

It tells React:

"This application is going to use browser URL-based routing."

2. Routes — "Namma route list inga irukku"
<Routes>

  <Route path="/" element={<Home />} />

  <Route path="/users" element={<Users />} />

  <Route path="/profile" element={<Profile />} />

</Routes>

Routes itself doesn't define a URL.

It is basically a container for multiple Routes.

Think:

Routes
 ├── Route 1
 ├── Route 2
 └── Route 3
3. Route — "Indha URL-ku indha component"

This is the important one.

<Route
  path="/users"
  element={<Users />}
/>

Meaning:

If URL is /users, render <Users />.

That's all. 😄

So:

/users     → Users
/profile   → Profile
/about     → About

Example:

<Routes>

  <Route path="/" element={<Home />} />

  <Route path="/users" element={<Users />} />

  <Route path="/profile" element={<Profile />} />

</Routes>
Now complete flow

Suppose browser-la user enters:

http://localhost:5173/users

React Router does:

Browser URL
    ↓
/users
    ↓
Routes
    ↓
Which Route has path="/users"?
    ↓
Found it!
    ↓
element={<Users />}
    ↓
Users component displayed

That's the basic React Router concept. 💯

Now Link

Suppose navbar:

<Link to="/users">Users</Link>

User clicks it:

Click Users
     ↓
/users
     ↓
Route finds /users
     ↓
<Users />
Now useNavigate

This is when code itself changes the URL:

navigate("/users");

Then:

navigate("/users")
       ↓
URL becomes /users
       ↓
Route finds /users
       ↓
<Users />
Finally Outlet — very simple meaning

Outlet only becomes important when we have parent + child routes.

Imagine:

Dashboard
   |
   ├── Home
   ├── Users
   └── Settings

Dashboard is common for all three.

So:

/dashboard/home
/dashboard/users
/dashboard/settings

We want Dashboard UI to stay there, and inside Dashboard, whichever child page is selected should appear.

That's what <Outlet /> does.

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>

      <Outlet />
    </>
  );
}

Think of <Outlet /> as an empty placeholder:

┌─────────────────────────┐
│ Dashboard               │
│                         │
│   <Outlet />             │
│      ↑                  │
│  Child page appears     │
│      here               │
└─────────────────────────┘

If URL is:

/dashboard/users

then:

Dashboard
    ↓
<Outlet />
    ↓
Users

If URL is:

/dashboard/settings

then:

Dashboard
    ↓
<Outlet />
    ↓
Settings
Angular mapping

This is almost exactly:

Angular:

<router-outlet></router-outlet>

React:

<Outlet />

So don't worry about nested routes yet. First remember these 4:

BrowserRouter
    ↓
Routing enabled

Routes
    ↓
Container for routes

Route
    ↓
URL → Component

Outlet
    ↓
Place where child route appears

Now the concept should be much clearer da. 😎