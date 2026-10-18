Povom da 😎🔥 Fresh start from Concept 5 — Props.

🟢 Concept 5: Props → Angular @Input()

React-la Props na parent component-lendhu child component-ku data pass panradhu.

Angular-la exactly similar concept:

@Input() name!: string;

React-la:

<User name="Santhosh" />

Child component:

function User(props) {
  return <h2>{props.name}</h2>;
}
Angular → React mapping
Angular	React
@Input()	Props
Parent → Child	Parent → Child
<app-user [name]="userName">	<User name={userName} />
this.name	props.name
Simple example

App.tsx

import User from "./components/User";

function App() {
  const userName = "Santhosh";

  return (
    <>
      <h1>My React App</h1>

      <User name={userName} />
    </>
  );
}

export default App;

User.tsx

function User(props: { name: string }) {
  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {props.name}</p>
    </div>
  );
}

export default User;

Output:

My React App

User Details
Name: Santhosh
🔥 Angular developer-ku easiest way

Angular:

<app-user [name]="userName"></app-user>
@Input() name!: string;

React:

<User name={userName} />
function User(props: { name: string }) {
  return <p>{props.name}</p>;
}

Core idea: Parent component owns the data → Props moolama child-ku send pannum.

Next step-la 
multiple props + destructuring paakalaam. Adhu React code-la romba common.

----------------------------------------------------------------------------------

🟢 Props — Multiple Props + Destructuring

Previous example-la:

<User name={userName} />

Ippo multiple data pass pannalam.

Parent — App.tsx
import User from "./components/User";

function App() {
  const userName = "Santhosh";
  const age = 27;
  const role = "IT Analyst";

  return (
    <>
      <h1>My React App</h1>

      <User
        name={userName}
        age={age}
        role={role}
      />
    </>
  );
}

export default App;
Child — User.tsx
function User(props: {
  name: string;
  age: number;
  role: string;
}) {
  return (
    <div>
      <h2>User Details</h2>

      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
      <p>Role: {props.role}</p>
    </div>
  );
}

export default User;

Simple-ah work aagum. But React-la usually destructuring use pannuvanga.

🔥 Destructuring

Instead of:

function User(props: {
  name: string;
  age: number;
  role: string;
}) {
  return (
    <p>{props.name}</p>
  );
}

We can directly extract:

function User({
  name,
  age,
  role
}: {
  name: string;
  age: number;
  role: string;
}) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Role: {role}</p>
    </div>
  );
}

So:

props.name
props.age
props.role

becomes simply:

name
age
role
Angular comparison

Angular:

@Input() name!: string;
@Input() age!: number;
@Input() role!: string;

React:

function User({ name, age, role }) {
   ...
}

Concept same da — syntax mattum different. 🔥

🧠 One important rule

Props are read-only.

Parent:

<User name="Santhosh" />

Child should not directly modify name.

Later useState + callback props use panni parent data/state update epdi pannradhu paapom.

Next → Concept 6: Events → Angular @Output() / Event Binding 🚀