Concept 28 — useRef()
useState-um useRef-um rendu perum value store pannum. Aana oru important difference irukku.
- useState → Value change aana component re-render aagum.
- useRef → Value change aana component re-render aagaadhu.
1. Simple example
import { useRef } from "react";

function App() {
  const count = useRef(0);

  function handleClick() {
    count.current++;
    console.log(count.current);
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}

export default App;


Idhu eppadi work aagum?
1. useRef(0) → Initial value 0.
2. Button click pannina → count.current++.
3. Console-la 1, 2, 3 nu varum.
4. Component re-render aagaadhu.
count.current dhaan ref-oda stored value-ai access panna use panrom.
2. Real-time example — Input focus
Search box open aagumbodhu cursor automatic-ah input-kulla poganum-na useRef use pannalaam.
import { useRef } from "react";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <div>
      <input ref={inputRef} placeholder="Search employee" />

      <button onClick={focusInput}>
        Focus Search
      </button>
    </div>
  );
}

export default App;


Button click pannumbodhu search input focus aagum. Input element-ai direct-ah access panna useRef help pannudhu.
3. Angular comparison
Angular-la DOM element-ai access panna @ViewChild() use pannuvom. React-la adhukku similar use case-ku useRef() use pannalaam.
Remember da:
- useState = UI update panna vendiya value.
- useRef = Re-render thevai illaama value store pannradhu, illa DOM element access pannradhu.
Next, useRef vs useState-ai oru practical example-la compare pannalaam da.
















illa enaku real time use case puriyala, input focus pannu edhuku useRRef konja proper ah explain pannuve













Macha 😄 correct da! Input focus example mattum sonna useRef edhukku useful-nu full-ah puriyaadhu. Namma real-time BOA employee search screen example vechu paakalaam.
1. First, "Input focus" na enna?
Employee Search Screen
Employee name



Cursor ready — you can type now.

Focus Search InputDemo: button click pannina input focus aana maadhiri indicate pannum. Real React-la inputRef.current?.focus() browser input-ai actual-ah focus pannum.

Focus na input box-la cursor-ai ready-ah vechuradhu da. User input box-ai thaniya click panna thevai illaama, app-e cursor-ai anga kondu pogum.
Examples:
- Login page open aagumbodhu username field ready-ah irukkanum.
- Search page open aagumbodhu search box ready-ah irukkanum.
- Form submit pannumbodhu validation fail aana, first invalid field-ku cursor kondu poganum.
2. React-la useRef edhukku?
Indha code paaru:
const inputRef = useRef<HTMLInputElement>(null);

function focusInput() {
  inputRef.current?.focus();
}

return (
  <>
    <input ref={inputRef} placeholder="Search employee" />
    <button onClick={focusInput}>Focus Search</button>
  </>
);


Step-by-step:
1. useRef(null) — DOM element-ai store panna oru reference create pannrom.
2. ref={inputRef} — React input element-ai inputRef.current-la attach pannum.
3. Button click aana focusInput() execute aagum.
4. inputRef.current?.focus() — actual HTML input element-oda focus() method-ai call pannum.
Inga useRef input value-ai store pannala. HTML input element-ai access panna use pannirukkom.
3. Real-time form example — Login page
Imagine login form-la username, password irukku. User Login click pannumbodhu username empty-ah irundhaa, cursor username field-ku poganum.
import { useRef } from "react";

function Login() {
  const usernameRef = useRef<HTMLInputElement>(null);

  function handleLogin() {
    const username = usernameRef.current?.value;

    if (!username) {
      usernameRef.current?.focus();
      return;
    }

    console.log("Continue login");
  }

  return (
    <div>
      <input
        ref={usernameRef}
        placeholder="Enter username"
      />

      <input
        type="password"
        placeholder="Enter password"
      />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;


Execution flow:
1. Username enter pannama Login click panra.
2. usernameRef.current?.value empty string return pannum.
3. if (!username) true aagum.
4. focus() username input-ku cursor-ai kondu pogum.
5. return nala login process stop aagum.
Production form-la error message-um display pannuvom; inga focus concept mattum explain pannirukken.
4. Angular comparison
Angular-la @ViewChild() moolama input element-ai access panni .nativeElement.focus() call pannalaam. React-la indha use case-ku useRef() use pannuvom.
Main concept, macha: useRef-oda use case focus mattum illa. DOM element access pannradhu, timer ID store pannradhu, previous value store pannradhu maadhiri uses-um irukku. useRef value change aana mattum component re-render aagaadhu.