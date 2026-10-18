Concept 19 — React Router

Idhu Angular developer-ku romba familiar ah irukkum.

Angular-la:

Angular Router
    ↓
/home
/login
/users
/profile

React-la routing-ku React Router commonly use pannuvom.

Without router, normally:

App
 ↓
One component

Router use pannina:

URL
 ↓
React Router
 ↓
Matching Component

For example:

/          → Home
/login     → Login
/users     → Users
/profile   → Profile
Angular vs React
Angular	React
Angular Router	React Router
RouterModule	React Router library
Routes	Routes
Route	Route
routerLink	Link
router.navigate()	useNavigate()
<router-outlet>	<Outlet />

But React Router itself is not part of React core. Angular-la router framework ecosystem-la built-in; React-la routing library add pannuvom.

Next, idha 
setup pannradhu + BrowserRouter, Routes, Route, Link, useNavigate, nested routes ellam Angular mapping-oda deep-ah paakalam. 🚀

oru example code syntax kudu, i want to see how looks like ?

Sure da 😎. Just how React Router code looks nu first simple example paapom. Deep explanation later.

1️⃣ Install
npm install react-router-dom
2️⃣ App.tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return <h2>Home Page</h2>;
}

function Users() {
  return <h2>Users Page</h2>;
}

function Profile() {
  return <h2>Profile Page</h2>;
}

function App() {
  return (
    <BrowserRouter>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/users" element={<Users />} />

        <Route path="/profile" element={<Profile />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
👀 Angular developer-ku இது எப்படி தெரியும்?

Angular-la roughly:

<a routerLink="/">Home</a>
<a routerLink="/users">Users</a>
<a routerLink="/profile">Profile</a>

<router-outlet></router-outlet>

Routes:

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'profile', component: ProfileComponent }
];

React-la அதே concept:

<Route path="/" element={<Home />} />
<Route path="/users" element={<Users />} />
<Route path="/profile" element={<Profile />} />

So basically:

Angular

routerLink → router-outlet → Component

React

Link → Routes → Route → Component

🔥 Syntax பார்த்தாலே concept familiar-ah irukkum. Tomorrow/next session-la இதை BrowserRouter, Routes, Route, Link, useNavigate each one why/when nu deep-ah break pannalam.   