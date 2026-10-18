🟢 Concept 11 — Event Handling

Namma already onClick touch pannom. Ippo proper-ah React event handling understand pannuvom.

1️⃣ onClick → Angular (click)
Angular
<button (click)="sayHello()">
  Click Me
</button>
React
<button onClick={sayHello}>
  Click Me
</button>

Function:

function sayHello() {
  alert("Hello Santhosh!");
}

Full:

function App() {
  function sayHello() {
    alert("Hello Santhosh!");
  }

  return (
    <button onClick={sayHello}>
      Click Me
    </button>
  );
}

export default App;
2️⃣ Input Event → Angular (input)

Angular:

<input (input)="handleInput($event)" />

React:

<input onChange={handleInput} />

React-la input value edukkanum na:

function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
  console.log(event.target.value);
}

So:

User types "Santhosh"
        ↓
onChange fires
        ↓
event.target.value
        ↓
"Santhosh"
3️⃣ $event → React event

Angular:

<input (input)="handleInput($event)">

React:

<input onChange={handleInput} />

Angular-la $event.

React-la callback function-ku event automatically pass aagum.

function handleInput(event) {
  console.log(event);
}
4️⃣ onSubmit → Angular (ngSubmit)

Angular:

<form (ngSubmit)="login()">

React:

<form onSubmit={login}>

But React-la browser default form submission prevent panna:

function login(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  console.log("Login submitted");
}
<form onSubmit={login}>
  <button type="submit">Login</button>
</form>
🔥 Angular → React quick mapping
Angular	React
(click)	onClick
(input)	onChange
(change)	onChange
(submit) / (ngSubmit)	onSubmit
$event	event
event.target.value	event.target.value

One difference remember panniko:

React event names camelCase:

onClick
onChange
onSubmit

Not:

onclick
onchange
onsubmit

Next we'll 
combine onChange + useState and build a small input box — Angular [(ngModel)] / Reactive Forms concept-ku React equivalent purinjidum. 🔥