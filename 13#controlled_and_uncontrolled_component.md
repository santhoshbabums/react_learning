🟢 Concept 13 — Controlled vs Uncontrolled Components

Idhu React forms-la very important concept. Angular comparison vechu paatha easy.

1️⃣ Controlled Component

Namma previous example:

const [name, setName] = useState("");

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

Here React state controls the input.

Flow:

User types
    ↓
onChange
    ↓
setName()
    ↓
React state
    ↓
input value updated

That's why it's called:

Controlled Component

Angular comparison:

<input [(ngModel)]="name">
Angular model ↔ input
React state   ↔ input
2️⃣ Uncontrolled Component

Here React state doesn't control the input value.

Instead, browser itself maintains the value.

import { useRef } from "react";

function Login() {
  const nameRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    console.log(nameRef.current?.value);
  }

  return (
    <>
      <input ref={nameRef} />

      <button onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
}

Here:

Input value
    ↓
Browser maintains it
    ↓
useRef → value read

React state-la every keystroke store panna vendiyadhu illa.

🔥 Controlled vs Uncontrolled
	Controlled	Uncontrolled
Value maintained by	React state	DOM
useState	Usually yes	No
useRef	Not required	Usually used
Validation	Easy	More manual
Form control	High	Less
Common React approach	✅ Very common	Used in specific cases
Angular comparison

Angular Reactive Forms / ngModel:

Form model controls input
        ↓
similar to
        ↓
React Controlled Component

Uncontrolled is more like:

DOM itself maintains value
        ↓
React reads it when needed
🧠 Interview question

Q: What is a controlled component in React?

Simple answer:

A controlled component is a form element whose value is controlled by React state, with changes handled through event handlers.

🔥 For your current learning, remember:
Controlled = useState + value + onChange

Next Concept 14 — useEffect() → Angular ngOnInit() + Lifecycle concepts. Idhu React-la romba important topic da. 🚀