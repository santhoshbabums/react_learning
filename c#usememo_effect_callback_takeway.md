Macha, parava illa da! ❤️ Namma previous example konjam complicated aayiduchu. Ippo useCallback-ai zero-la irundhu, simple example vechu purinjippom.
1. First, normal function purinjikko
function sayHello() {
  console.log("Hello!");
}


Idhu oru normal JavaScript function da. sayHello() nu call pannina "Hello!" print aagum.
React-la component re-render aagumbodhu, component-kulla irukkura normal function thirumba create aagum.
function App() {
  const sayHello = () => {
    console.log("Hello!");
  };

  return <button onClick={sayHello}>Click me</button>;
}


Question: App re-render aana, sayHello function enna aagum?
Pudhu function create aagum da. Function code same-ah irundhaalum, JavaScript-la adhu pudhu function reference.
2. Appo useCallback enna pannum?
const sayHello = useCallback(() => {
  console.log("Hello!");
}, []);


Idhu React-kitta solra maadhiri:
"Indha function-ai remember panni vechukko. Dependencies change aagala-na, previous function reference-ai reuse pannu."

Without useCallback
Re-render 1
Function A


Re-render 2
Function B

Same code, but new function reference.

With useCallback(..., [])
Re-render 1
Function A

Reuse cached reference

Re-render 2
Function A


3. But why do we need this?
Idhudhaan important point da macha! Function reference same-ah irukkanum-nu thevai irukkura situations-la dhaan useCallback useful.
Example: Parent component-la oru counter irukku. Child component-la oru button irukku. Child-ku React.memo use pannirukkom.
Parent re-render aagumbodhu, callback function pudhusaa create aana, child-ku prop change aana maadhiri theriyum. Child unnecessary-ah re-render aagalaam.
useCallback function reference-ai stable-ah vechukka help pannum. Appo child-oda vera props-um same-ah irundhaa, React.memo re-render-ai skip panna mudiyum.
4. useMemo vs useCallback — one line
- useMemo → Calculation result-ai remember pannum.
- useCallback → Function reference-ai remember pannum.
Rendume dependency change aana update aagalaam.

Macha, oru chinna question. Idhu purinjiduchaa-nu check pannalaam.
Suppose App re-render aagudhu. useCallback dependency [] dhaan. Appo enna nadakkum?

A. Function reference reuse aagum.

B. Every time pudhu function reference create aagum.

C. Function execute aagum.


















Then oru doubt ra useMemo and useEffect seems similar functionalities why ?













Macha 😎🔥 super doubt da! useMemo and useEffect rendu perum dependency array use pannum. Adhanaala similar-ah theriyudhu. But rendu peroda purpose totally different.
1. Simple-ah difference purinjikko
- useMemo → Calculation result-ai cache pannum.
- useEffect → API call, timer, event listener maadhiri external things-oda synchronize pannum.
2. Same example-la compare pannalaam
Suppose employee list-la search panrom.
A. useMemo — Filter calculation
const filteredEmployees = useMemo(() => {
  console.log("Filtering employees");

  return employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );
}, [employees, search]);


Enna nadakkum?
- search change aana → filter calculation thirumba nadakkum.
- Dependencies change aagala-na → previous result reuse aagum.
- Idhu calculation result-ai return pannum.
B. useEffect — API call
useEffect(() => {
  fetch("/api/employees")
    .then((res) => res.json())
    .then((data) => setEmployees(data));
}, []);


Enna nadakkum?
- Component mount aagumbodhu effect run aagum.
- API-la irundhu employee data fetch pannum.
- setEmployees(data) moolama state update aagum.
- Component re-render aagum.
Idhu external system-oda interaction pannudhu; calculation result-ai cache pannuradhu illa.
3. Side-by-side comparison
Feature	useMemo	useEffect
Main purpose	Calculation result reuse	External systems-oda synchronize pannradhu
Eppo run aagum?	Render time-la, dependency change aana recalculate	Render commit aana piragu, dependencies change aana effect run
Enna return pannum?	Calculated value	Usually nothing; optional cleanup function
Example	Filter, sort, expensive calculation	API request, timer, event listener
4. Angular comparison
- useMemo → Angular-la exact equivalent illa; memoized calculation/selector maadhiri think pannikko.
- useEffect → Angular ngOnInit, ngOnChanges, ngOnDestroy concepts-oda konjam overlap irukku. Aana exact equivalent illa; React effect dependency-based synchronization model.
Important da: API call panna useMemo use panna koodadhu. API call maadhiri side effect-ku useEffect use pannuvom. Simple calculation-ku useEffect thevai illa.
One-line memory trick:
useMemo = “En calculation result enna?”
useEffect = “Render aana piragu external system-kooda enna seiyanum?”

















Ithu jS la irukra memoization mathrir correct ah ?













Correct da macha! 🔥💯 Exactly!
useMemo என்பது JavaScript-la irukkura Memoization concept-oda React implementation maadhiri.
1. JavaScript Memoization
function add(a, b) {
  console.log("Calculating...");
  return a + b;
}

const cache = {};

function memoizedAdd(a, b) {
  const key = `${a}-${b}`;

  if (key in cache) {
    return cache[key];
  }

  cache[key] = add(a, b);
  return cache[key];
}

console.log(memoizedAdd(10, 20)); // Calculates → 30
console.log(memoizedAdd(10, 20)); // Cache → 30
console.log(memoizedAdd(5, 10));  // Calculates → 15


Same inputs vandhaa cached result reuse pannrom. Different inputs vandhaa calculation thirumba nadakkum.
2. React useMemo
const total = useMemo(() => {
  return numbers.reduce((sum, num) => sum + num, 0);
}, [numbers]);


React dependency values same-ah irundhaa previous calculation result-ai reuse pannum; dependency change aana recalculate pannum.
JavaScript memoization	React useMemo
Cache-ai namma implement pannuvom	React manage pannum
Cache key-ai namma define pannuvom	Dependency array kuduppom
Same input → cached result	Same dependencies → cached result
One important difference da: useMemo-oda cache performance optimization-kku mattum. React thevai pattal cache-ai discard pannalaam; adhanaala correctness-ku mattum useMemo-ai depend panna koodadhu.
Nee concept-ai correct-ah connect pannitta da! 😎