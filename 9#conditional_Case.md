Povom da 😎🔥

🟢 Concept 8 — Conditional Rendering → Angular *ngIf

React-la condition based-ah UI show/hide panradhu Conditional Rendering.

Angular-la namma:

<div *ngIf="isLoggedIn">
  Welcome Santhosh
</div>

React-la mostly ternary operator or && use pannuvom.

1️⃣ *ngIf equivalent — Ternary
Angular
<div *ngIf="isLoggedIn">
  Welcome Santhosh
</div>
React
function App() {
  const isLoggedIn = true;

  return (
    <>
      {isLoggedIn ? (
        <h2>Welcome Santhosh</h2>
      ) : (
        <h2>Please Login</h2>
      )}
    </>
  );
}

Meaning:

condition ? true UI : false UI

So:

isLoggedIn ? <Welcome /> : <Login />
2️⃣ Only true condition-ku show panna

Angular:

<div *ngIf="isAdmin">
  Admin Panel
</div>

React:

{isAdmin && <h2>Admin Panel</h2>}

🔥 Idhu React-la romba common.

Example:

const isAdmin = true;

return (
  <>
    <h1>Dashboard</h1>

    {isAdmin && <button>Delete User</button>}
  </>
);

isAdmin = true → button display aagum.

isAdmin = false → button display aagadhu.

3️⃣ Angular vs React
Angular	React
*ngIf="condition"	{condition && <Component />}
*ngIf="condition; else"	{condition ? <A /> : <B />}
Template syntax	JavaScript expression
🧠 Important

React JSX {} kulla expression use pannalam.

So:

{isLoggedIn && <h2>Welcome</h2>}

works.

But:

{if (isLoggedIn) {
   ...
}}

❌ Doesn't work directly.

Because if is a JavaScript statement, not an expression.

Small practice 🔥

Create:

const isLoggedIn = true;
const isAdmin = false;

Display:

Welcome Santhosh

Admin Panel  ← only if isAdmin true

Then isLoggedIn = false change panni:

Please Login

show pannunga.

Next Concept 9 — Lists & .map() → Angular *ngFor. Idhuvum unakku very easy da 😎.