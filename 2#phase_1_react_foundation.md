1. React na enna?

React is a JavaScript library used to build user interfaces (UI), especially single-page applications.

Angular madhiri React-um component-based architecture use pannum.
                Application
                    |
        -------------------------
        |           |           |
      Header       Menu       Content
                                |
                         ----------------
                         |              |
                       Table           Form
------------------------------------------------------------------------------------------
2. Angular vs React — Main Difference

Nee Angular already therinjavan, so indha difference dhaan first understand pannanum.

Angular

Angular is a full-fledged framework.

Angular itself provides:

Angular
 ├── Components
 ├── Routing
 ├── Forms
 ├── HTTP Client
 ├── Dependency Injection
 ├── RxJS integration
 ├── Directives
 └── Many framework features

So Angular project create pannumbodhu, framework already neraya things provide pannum.

React

React mainly focuses on UI layer.

React
 └── UI / Components

Other requirements-ku ecosystem libraries use pannuvom:

React
 ├── React Router → Routing
 ├── fetch / Axios → API calls
 ├── Context / Redux / Zustand → State management
 └── React Hook Form etc. → Forms
🔥 Easy comparison

Angular:

"Naan unakku complete framework kudukuren. Use panniko."

React:

"Naan UI library kudukuren. Unakku thevaiyana ecosystem tools choose panniko." 
--------------------------------------------------------------------------------------------
3. Angular Component vs React Component

Angular-la nee ipdi panniruppa:

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent {
}

HTML:

<h2>User Details</h2>

React-la same idea:

function User() {
  return <h2>User Details</h2>;
}

That's it. 😄

React component usually JavaScript function.

Angular Component
       ↓
Class + Template + Decorator

React Component
       ↓
JavaScript Function
-----------------------------------------------------------------
4. React-la JSX na enna?

Idhu namma next important concept.

React-la:

function User() {
  return (
    <div>
      <h2>User Details</h2>
      <p>Santhosh</p>
    </div>
  );
}

Inga:

<h2>User Details</h2>

HTML madhiri theriyudhu.

But technically idhu JSX.

JSX = JavaScript XML syntax

Angular-la:

<h2>{{ userName }}</h2>

React-la:

<h2>{userName}</h2>

Already difference konjam visible-ah irukkum.
---------------------------------------------------------------------
5. React application எப்படி work ஆகும்?

High-level flow:

index.html
     ↓
React Application
     ↓
Root Component
     ↓
Child Components
     ↓
UI

Angular-la:

index.html
     ↓
main.ts
     ↓
Angular Bootstrap
     ↓
AppComponent
     ↓
Child Components
     ↓
UI

Conceptually rendu perume component tree build pannudhu.
-----------------------------------------------------------------------------------------
6. One important mindset change

Angular-la nee mostly:

HTML Template
     +
TypeScript Class

nu think panniruppa.

React-la:

JavaScript
   +
JSX
   +
Components

nu think pannanum.

React learn pannumbodhu JavaScript knowledge romba important.

Especially:

Arrow functions
Destructuring
map()
filter()
Spread operator
Object/array manipulation
Promises
async/await
ES6 modules

Nee already Angular developer, so probably majority familiar-ah irukkum.
------------------------------------------------------------------------      

🧠 Day 1 — Remember these 5 points
1. React = JavaScript library for building UI

2. React uses component-based architecture

3. React component = usually a JavaScript function

4. JSX = JavaScript + HTML-like syntax

5. React is mainly UI-focused; routing/forms/state etc.
   are commonly handled through its ecosystem
   =================================================