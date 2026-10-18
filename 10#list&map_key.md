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
Correct da! 💯🔥 Exactly adhu dhaan.

.map() JavaScript array method. React-specific function illa.

Example:

const users = ["Santhosh", "Arun", "Karthik"];

{users.map((user) => (
  <p>{user}</p>
))}

Here .map():

users array
   ↓
Santhosh → <p>Santhosh</p>
Arun     → <p>Arun</p>
Karthik  → <p>Karthik</p>

So each array element-ku oru JSX element return panrom.

Normal JavaScript-la
const numbers = [1, 2, 3];

const result = numbers.map((num) => num * 2);

console.log(result);

Output:

[2, 4, 6]

React-la:

numbers.map((num) => (
  <p>{num}</p>
))

Instead of returning a number, JSX element return panrom.

Angular comparison

Angular:

<div *ngFor="let user of users">
  {{ user.name }}
</div>

Angular internally list items render pannum.

React:

{users.map((user) => (
  <div>{user.name}</div>
))}

JS .map() use panni, each item-ku JSX return pannitu React DOM-la render pannudhu.

So un understanding 100% correct da. 😎

And one small distinction: .map() itself HTML tag create pannadhu; adhu JSX elements-a return pannudhu. React dhaan அந்த JSX-a actual DOM elements-ah render pannum. 🔥

--------------------------------------------------------------------------------------

Povom da 😎🔥 Phase 1 last concept!

🟢 Concept 10 — Keys → Angular trackBy

Idhu unakku already Angular-la familiar concept, so quick-ah understand pannidalam.

First, namma list:
const users = [
  { id: 101, name: "Santhosh" },
  { id: 102, name: "Arun" },
  { id: 103, name: "Karthik" }
];

React:

{users.map((user) => (
  <div key={user.id}>
    {user.name}
  </div>
))}

Here:

key={user.id}

is the important part.

🤔 Why key?

Suppose:

Before:
101 Santhosh
102 Arun
103 Karthik

Then Arun remove pannita:

After:
101 Santhosh
103 Karthik

React-ku which item removed / changed / moved nu efficiently identify panna key help pannum.

So id unique-ah irundha:

key={user.id}

best.

🔥 Angular trackBy vs React key

Angular:

<div *ngFor="let user of users; trackBy: trackById">
trackById(index: number, user: User) {
  return user.id;
}

React:

{users.map((user) => (
  <div key={user.id}>
    {user.name}
  </div>
))}

Concept almost same:

Angular                         React

trackBy → identify item        key → identify item
     ↓                              ↓
     id                             id
⚠️ Don't blindly use array index

You can do:

{users.map((user, index) => (
  <div key={index}>
    {user.name}
  </div>
))}

But if the list can change order, add/remove items, a stable unique ID is generally better:

key={user.id}
🎉 Phase 1 COMPLETE!

We've covered:

1. React
2. Project Setup
3. JSX
4. Components
5. Props
6. Events
7. State
8. Conditional Rendering
9. Lists & map()
10. Keys

And since you already know Angular, you've basically learned the React equivalents of several core Angular concepts. 🔥

🚀 Next: Phase 2 — React Core

Concept 11: Event Handling

Although we touched onClick already, next we'll properly learn:

onClick
onChange
onInput
onSubmit
event object
event.target.value

with Angular (click), (input), (change), (ngSubmit) comparisons.