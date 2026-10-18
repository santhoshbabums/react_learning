Concept 17 — Component Communication

Angular-la namakku already:

Parent → Child = @Input()
Child → Parent = @Output() + EventEmitter

React-la same communication concept, but syntax different.

1️⃣ Parent → Child

Angular:

@Input() name!: string;
<app-user [name]="userName"></app-user>

React-la Props use pannuvom.

Parent — App.tsx
import User from "./components/User";

function App() {
  const userName = "Santhosh";

  return (
    <>
      <h1>My App</h1>

      <User name={userName} />
    </>
  );
}

export default App;
Child — User.tsx
function User({ name }: { name: string }) {
  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {name}</p>
    </div>
  );
}

export default User;
Flow:
App (Parent)
   |
   | name="Santhosh"
   ↓
User (Child)
   |
   ↓
name

So:

Angular @Input() → React Props ✅

2️⃣ Child → Parent

Here dhaan React konjam different.

Angular:

@Output() clicked = new EventEmitter<void>();

onClick() {
  this.clicked.emit();
}

Parent:

<app-user (clicked)="handleClick()"></app-user>

React-la @Output() illa.

Instead, parent oru function-ah child-ku prop-aa pass pannum.

Parent
function App() {

  function handleClick() {
    alert("Child button clicked!");
  }

  return (
    <>
      <h1>Parent</h1>

      <User onClick={handleClick} />
    </>
  );
}

export default App;
Child
function User({ onClick }: { onClick: () => void }) {

  return (
    <div>
      <h2>Child</h2>

      <button onClick={onClick}>
        Click Me
      </button>
    </div>
  );
}

export default User;
Flow:
Parent
  |
  | passes function
  ↓
Child
  |
  | calls function
  ↓
Parent's handleClick()

So:

Angular @Output() → React callback function passed as prop ✅

🔥 Important mental model

React-la data generally flows one direction: Parent → Child.

       Parent
       ↓   ↓
    Child Child
       ↓
    Grandchild

Child direct-ah parent data modify panna koodathu.

Instead:

Parent
  │
  │ passes data
  ↓
Child
  │
  │ calls callback
  ↓
Parent function executes

This is one of the most important React concepts da.

Angular vs React
Angular	React
@Input()	Props
@Output()	Callback prop
EventEmitter	Function
.emit()	Function call
Parent → Child	Parent → Child
Child → Parent	Callback → Parent

Next Concept 18 — Lifting State Up. Idhu React interviews-la romba common concept. 🔥