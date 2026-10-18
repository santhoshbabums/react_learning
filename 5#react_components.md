Aama da 🔥 next Concept 4 — Components pogalam.

🚀 React Concept 4 — Components

Nee Angular already therinjavan, so Angular Component → React Component mapping-la paakalaam.

1. Component na enna?

Simple-ah:

Component = UI-oda oru reusable piece.

Example application:

App
│
├── Header
├── Sidebar
├── UserList
│    └── UserCard
└── Footer

Angular-layum same concept dhaan.

Angular Component
        ↕
React Component
2. Angular Component

Nee Angular-la something like:

@Component({
  selector: 'app-user',
  template: `
    <h2>User Details</h2>
  `
})
export class UserComponent {
}

Then template:

<app-user></app-user>

Angular component-ku:

TypeScript Class
       +
Template
       +
@Component decorator
3. React Component

React-la component usually function.

function User() {
  return (
    <div>
      <h2>User Details</h2>
    </div>
  );
}

That's a React component. ✅

Then use it inside another component:

function App() {
  return (
    <div>
      <User />
    </div>
  );
}

So:

Angular

<app-user></app-user>


React

<User />
4. React component name

React component names capital letter-la start aaganum.

✅ Correct:

function User() {
  return <h2>User</h2>;
}

❌ Avoid:

function user() {
  return <h2>User</h2>;
}

Why?

React-la lowercase tags are treated as HTML elements.

<div />
<button />
<input />

But:

<User />

means custom React component.

So remember:

React Component → PascalCase

Examples:

User
UserCard
LoginForm
Header
EmployeeList
ProductDetails
5. Component separate file-la create pannalaam

Angular:

user/
 ├── user.component.ts
 ├── user.component.html
 └── user.component.css

React commonly:

components/
 └── User.tsx

User.tsx:

function User() {
  return (
    <div>
      <h2>User Details</h2>
    </div>
  );
}

export default User;

Then App.tsx:

import User from "./components/User";

function App() {
  return (
    <div>
      <User />
    </div>
  );
}

export default App;
Angular comparison

Angular module/import structure and React's ES module imports are different, but at this stage the key idea is:

Create component
      ↓
Export component
      ↓
Import component
      ↓
Use component
6. React component can return JSX

Example:

function Header() {
  return (
    <header>
      <h1>My Application</h1>
    </header>
  );
}

Another:

function Footer() {
  return (
    <footer>
      <p>Copyright 2026</p>
    </footer>
  );
}

Then:

function App() {
  return (
    <>
      <Header />
      <main>
        <h2>Home</h2>
      </main>
      <Footer />
    </>
  );
}

So component tree:

App
│
├── Header
│
├── main
│
└── Footer
7. Why components?
Reusability

Suppose you have 10 employees.

Instead of writing:

<div>
  <h3>Santhosh</h3>
</div>

<div>
  <h3>Arun</h3>
</div>

<div>
  <h3>Rahul</h3>
</div>

We can create:

function EmployeeCard() {
  return (
    <div>
      <h3>Employee</h3>
    </div>
  );
}

Later, Props use panni each employee name dynamically pass pannalaam.

That is our next concept: Props → Angular @Input(). 🔥

🧠 Angular → React mapping


