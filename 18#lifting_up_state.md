Absolutely da 😎. Lifting State Up is one of those concepts that sounds complicated but is actually very simple once you see why we need it.

First, the problem

Suppose we have this component structure:

              App
             /   \
            ↓     ↓
     UserInput   UserDisplay

We want:

UserInput → user types "Santhosh"
UserDisplay → should show "Hello Santhosh"

So both components need access to the same name data.

Wrong approach ❌

If we keep name inside UserInput:

function UserInput() {
  const [name, setName] = useState("");
  
  // input...
}

Then:

              App
             /   \
            ↓     ↓
     UserInput   UserDisplay
        │
        └── name ❌

UserDisplay cannot directly access UserInput's state.

Why?

Because React's data flow is mainly:

Parent → Child

A sibling component cannot directly reach into another sibling's state.

So what do we do? 🤔

We move the state upward to their common parent.

That's why it's called:

Lifting State Up

Before:

App
 |
 └── UserInput
      └── name

After:

              App
              |
          name state
          /        \
         ↓          ↓
  UserInput      UserDisplay

Now App owns the name.

Let's build it step by step
Step 1 — Parent owns the state
function App() {
  const [name, setName] = useState("");

  return (
    <>
      <UserInput />
      <UserDisplay />
    </>
  );
}

Now name belongs to App.

Step 2 — Give name to UserDisplay
<UserDisplay name={name} />

So:

App
 │
 │ name
 ↓
UserDisplay

Child receives it as a prop:

function UserDisplay({ name }: { name: string }) {
  return <h2>Hello {name}</h2>;
}

Easy.

But now we have another problem:

How does UserInput change the parent's name?

Step 3 — Give the setter to UserInput

Remember:

const [name, setName] = useState("");

setName can change the state.

So we pass it to UserInput:

<UserInput
  name={name}
  setName={setName}
/>

Now:

                  App
            name + setName
               /       \
              ↓         ↓
       UserInput     UserDisplay
          ↑              ↑
       setName           name
Step 4 — UserInput calls setName
function UserInput({
  name,
  setName
}: {
  name: string;
  setName: (value: string) => void;
}) {

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}

Suppose user types:

Santhosh

What happens?

User types "Santhosh"
        ↓
UserInput onChange
        ↓
setName("Santhosh")
        ↓
App's state changes
        ↓
App re-renders
        ↓
UserDisplay receives name="Santhosh"
        ↓
Hello Santhosh

🔥 That's the entire concept.

Complete example
App.tsx
import { useState } from "react";
import UserInput from "./components/UserInput";
import UserDisplay from "./components/UserDisplay";

function App() {
  const [name, setName] = useState("");

  return (
    <>
      <UserInput
        name={name}
        setName={setName}
      />

      <UserDisplay
        name={name}
      />
    </>
  );
}

export default App;
UserInput.tsx
function UserInput({
  name,
  setName
}: {
  name: string;
  setName: (value: string) => void;
}) {
  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}

export default UserInput;
UserDisplay.tsx
function UserDisplay({
  name
}: {
  name: string;
}) {
  return <h2>Hello {name}</h2>;
}

export default UserDisplay;
🔥 Angular developer perspective

This is where you should remember it.

Angular:

Component A
     ↓
Shared Service
     ↓
Component B

or sometimes you communicate through parent:

        Parent
       /      \
      ↓        ↓
 Child A    Child B

React's basic approach:

        Parent
       /      \
      ↓        ↓
 Child A    Child B

Parent holds the shared state.

Then:

Parent → Child
       = props

Child → Parent
       = callback function

So in our example:

App
│
├── name state
│
├── ↓ name
│   UserDisplay
│
└── ↓ setName
    UserInput
One very important rule 🧠

Don't think:

"Whenever two components exist, I have to lift state up."

No.

Think:

"When multiple components need to share the same state, keep that state in their nearest common parent."

For example:

             App
          /       \
         /         \
        A           B
       / \
      C   D

If C and D need the same state:

             App
              |
              A
          shared state
           /       \
          C         D

You lift the state to A, not necessarily all the way to App.

That's why we say:

Nearest common parent 🎯

This is the key point to remember.