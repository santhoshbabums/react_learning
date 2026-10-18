🟢 Concept 7 — State (useState) → Angular Component State

Idhu React-la romba important concept. useState almost everywhere varum.

First, Angular mindset

Angular-la:

count = 0;

increment() {
  this.count++;
}

Template:

<p>{{ count }}</p>

<button (click)="increment()">
  Increment
</button>

React-la similar:

import { useState } from "react";

function Counter() {

  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  return (
    <>
      <p>{count}</p>

      <button onClick={increment}>
        Increment
      </button>
    </>
  );
}

export default Counter;
🔥 useState(0) actually enna?
const [count, setCount] = useState(0);

Idhula:

count     → current value
setCount  → value update panna function
0         → initial value

So:

setCount(count + 1);

means:

"Count-oda value update pannu."

Angular vs React
Angular	React
count = 0	useState(0)
this.count	count
this.count++	setCount(count + 1)
Angular detects UI change	State update → React re-renders component
⚠️ Important difference

React-la state value-a direct-ah modify panna koodadhu.

❌:

count++;

✅:

setCount(count + 1);

Because setCount() React-ku:

"Hey, state changed. UI-a update pannu."

nu signal kudukkum.

🧠 One small practice da

Counter.tsx create panni:

Initial count = 0
+ button
- button
Current count display

Target:

Count: 0

[-] [+]

Button click pannumbodhu count change aaganum.

Idha try pannitu next Concept 8 — Conditional Rendering → *ngIf pogalam. 🚀