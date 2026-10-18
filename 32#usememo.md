Macha ❤️ parava illa da. React.memo()-va namma previous example konjam complicated-ah explain pannittom. Ippo oru simple real-time example-la, line by line purinjippom. useCallback()-ai ippo konjam side-la vechidu.
1. Real-time situation
Imagine un BOA project-la oru Employee page irukku.
- Parent component-la employee details irukku.
- Oru button click pannumbodhu page counter mattum increase aagudhu.
- Employee details change aagala.
Counter change aana employee component-um re-render aaganuma? Thevai illa da!
2. First, React.memo() illaama
import { useState } from "react";

function Employee() {
  console.log("Employee rendered");

  return <h2>Santhosh - Angular Developer</h2>;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Count: {count}</h1>

      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>

      <Employee />
    </>
  );
}

export default App;


Enna nadakkum?
First page open pannumbodhu
App renders → Employee renders

Increase button click pannumbodhu
count changes → App re-renders → Employee also re-renders

Console-la Employee rendered message thirumba varum.

Employee details change aagala. Aana parent App re-render aaguradhunaala, React normal-ah Employee-aiyum render pannum.
3. Ippo React.memo() add pannalaam
import { memo, useState } from "react";

const Employee = memo(function Employee() {
  console.log("Employee rendered");

  return <h2>Santhosh - Angular Developer</h2>;
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Count: {count}</h1>

      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>

      <Employee />
    </>
  );
}

export default App;


Ippo enna nadakkum?
- First render → App and Employee render aagum.
- Increase click → App re-render aagum.
- Employee-ku props illa; parent state mattum change aagiyirukku.
- React.memo() irukkuradhunaala Employee re-render skip aagum.
Idhudhaan React.memo()-oda main purpose: child component-oda props change aagala-na, unnecessary re-render-ai skip panna React-kku help pannum.
4. Interactive-ah try pannalaam
Keela irukkura example-la button click panni paaru.
Employee page demo
memo OFF

Counter: 2
Increase CounterEmployee component
Santhosh
Angular Developer
No memo → parent render causes child render

Turn memo ONIdhu concept-ai demonstrate pannura simulation; actual React console output illa.

5. Appo useCallback() edhuku vandhuchu?
Ippo Employee-ku oru function prop pass pannrom-nu imagine pannu.
<Employee onClick={() => console.log("Selected")} />


Parent ovvoru render-layum pudhu function create aagum. React.memo()-ku andha function prop different-ah theriyum; appo child re-render aagalaam.
Adhanaala:
- React.memo() → Child component re-render-ai skip panna help pannum.
- useCallback() → Function prop-oda reference stable-ah vechukka help pannum.
Aana rendu perum ella idathulayum thevai illa da. Performance issue irundhaa use pannuvom.
Macha, ippo nee oru vishayam mattum remember pannikko: React.memo() is about avoiding unnecessary child re-renders when props are unchanged. Idhu dhaan core concept.