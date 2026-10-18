React Concept 3 — JSX

1. JSX na enna?

JSX = JavaScript XML

React-la UI write panna use panra JavaScript syntax extension.

Angular-la nee template separate-ah:

<h1>Hello {{ userName }}</h1>

React-la component-kulla JSX:
function App() {
  const userName = "Santhosh";

  return (
    <h1>Hello {userName}</h1>
  );
}

difference

| Angular                         | React                     |
| ------------------------------- | ------------------------- |
| `{{ userName }}`                | `{userName}`              |
| HTML template                   | JSX                       |
| Template separate file commonly | JSX often component-kulla |
| Angular template syntax         | JavaScript expressions    |

---------------------------------------------------------------

2. JSX looks like HTML

function App() {
  return (
    <div>
      <h1>Hello React</h1>
      <p>Welcome to my application</p>
    </div>
  );
}


Idhu HTML madhiri theriyum.

But idhu plain HTML illa.

It's JSX written inside JavaScript/TypeScript.

3. JavaScript value JSX-kulla use panna {}


Angular:

HTML
------

<h2>{{ userName }}</h2>
<p>{{ age }}</p>


React:

TypeScript
----------
function App() {
  const userName = "Santhosh";
  const age = 27;

  return (
    <div>
      <h2>{userName}</h2>
      <p>{age}</p>
    </div>
  );
}
------------------------------------

🔥 Important

React JSX-la:

{userName}

means JavaScript expression.

So:

{2 + 3}

→ 5

{"Hello"}

→ Hello

{userName.toUpperCase()}

→ SANTHOSH

Angular-la:

{{ 2 + 3 }}
{{ userName.toUpperCase() }}

Same concept, syntax mattum different.
--------------------------------------


************** Very Important *******************

4. JSX-la multiple elements return panna?

Correct:

return (
  <div>
    <h1>Hello</h1>
    <p>Welcome</p>
  </div>
);

Because JSX needs one parent/root element.

Angular template-la multiple root elements normally problem illa.

React-la parent:

<div>
   ...
</div>

or Fragment:

return (
  <>
    <h1>Hello</h1>
    <p>Welcome</p>
  </>
);

<>...</> = React Fragment.

---------------------------
5. class vs className

Very important Angular developer point. 👀

HTML:

<div class="container">

Angular:

<div class="container">

React JSX:

<div className="container">

So React-la:

❌

<div class="container">

✅

<div className="container">

Why? JSX uses JavaScript-oriented property naming, and class is a JavaScript reserved keyword/context-sensitive syntax, so React uses className.

----------------------------------------------------------------------------

6. Event syntax difference

Angular:

<button (click)="saveUser()">
  Save
</button>

React:

<button onClick={saveUser}>
  Save
</button>

Notice:

Angular → (click)="saveUser()"

React   → onClick={saveUser}

Idha next Event Handling concept-la deep-ah paakalaam.
-------------------------------------------------------

🧠 JSX — ippodhaikku remember
JSX
 ↓
JavaScript-la UI structure write panna syntax

Main differences:

Angular                    React

{{ name }}              →   {name}

(click)="save()"        →   onClick={save}

class="box"             →   className="box"

*ngIf                    →   Conditional JavaScript

*ngFor                   →   .map()

*ngIf and *ngFor ippa deep-ah padikka vendam — namma roadmap order-la later varum.


React — Concept 3: JSX (Part 2)

Ippo .tsx enna nu clear:

.tsx = TypeScript + JSX

<p>{age > 18 ? "Adult" : "Minor"}</p> ******

we can user JS expression inside JSX 

4️⃣ But statements use panna mudiyadhu

This is important.

❌ Don't do:

<h1>
  {if (age > 18) {
    "Adult"
  }}
</h1>

Because if is a statement, not an expression.

Instead:

<h1>
  {age > 18 ? "Adult" : "Minor"}
</h1>

or later:

{age > 18 && <h1>Adult</h1>}

Ithu namma conditional rendering concept-ku varumbodhu detailed-ah paakalaam.

5️⃣ JSX attributes

HTML:

<input type="text" class="box">

React JSX:

<input type="text" className="box" />

Angular property binding:

<input [value]="userName">

React:

<input value={userName} />

So:

Angular
[value]="userName"

React
value={userName}
6️⃣ JSX-la self-closing tags

HTML-la:

<input>
<img>

JSX-la:

<input />
<img />

/> mandatory for elements that don't have children.

----------------------------------------------------

JSX Cheat Sheet

Angular                     React

{{ name }}              →   {name}

[value]="name"          →   value={name}

class="box"             →   className="box"

(click)="save()"        →   onClick={save}

*ngIf                   →   JavaScript condition

*ngFor                  →   .map()

.html template          →   JSX inside .tsx