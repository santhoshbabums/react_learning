🟢 Concept 16 — Loading & Error Handling

API call pannumbodhu real application-la 3 states irukkum:

Loading
   ↓
Success → Data
   ↓
Error  → Error message

Angular-la namma usually:

isLoading = true;
errorMessage = '';
users = [];

React-layum same idea — state use pannuvom.

1️⃣ Three states
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

Meaning:

users   → API response
loading → API currently running?
error   → API failed?
2️⃣ API call
useEffect(() => {
  fetch("/api/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      return response.json();
    })
    .then((data) => {
      setUsers(data);
      setLoading(false);
    })
    .catch((error) => {
      setError(error.message);
      setLoading(false);
    });
}, []);

Notice:

setLoading(false);

Success aanaalum error aanaalum loading stop aaganum.

3️⃣ UI-la states handle pannuvom
if (loading) {
  return <h2>Loading...</h2>;
}

if (error) {
  return <h2>{error}</h2>;
}

return (
  <>
    {users.map((user) => (
      <p key={user.id}>{user.name}</p>
    ))}
  </>
);
Flow 🔥
Component starts
      ↓
loading = true
      ↓
"Loading..."


API success
      ↓
setUsers(data)
setLoading(false)
      ↓
Users displayed


API fails
      ↓
setError(...)
setLoading(false)
      ↓
Error displayed
Angular comparison
Angular                     React

isLoading                   loading
errorMessage                error
users                       users

HttpClient                  fetch()
Observable                  Promise
subscribe()                 then()/catch()
*ngFor                      map()
*ngIf                       conditional rendering

💡 Real project tip: Later we'll use async/await, which is generally cleaner for API code than chaining .then().

Next Concept 17 — Component Communication → Angular-la parent-child @Input() / @Output() already theriyum; React-la props + callback props combine panni paapom. 🔥

if (loading) {
  return <h2>Loading...</h2>;
}

if (error) {
  return <h2>{error}</h2>;
}

return (
  <>
    {users.map((user) => (
      <p key={user.id}>{user.name}</p>
    ))}
  </>
);

why rendu if tags return tag gu veliya iruku?




Aama da, idhu React-la important pattern. 😎

if statements JSX-க்கு வெளியே irukku because அவை JavaScript statements. JSX { } kulla direct-ah if use panna mudiyadhu.

if (loading) {
  return <h2>Loading...</h2>;
}

if (error) {
  return <h2>{error}</h2>;
}

return (
  <>
    {users.map((user) => (
      <p key={user.id}>{user.name}</p>
    ))}
  </>
);
Idhu epdi work aaguthu?

React component itself oru JavaScript function:

function Users() {
  
  // JavaScript area

  if (loading) {
    return <h2>Loading...</h2>;
  }

  // ...

  return (
    // JSX area
  );
}

So first React/JavaScript:

loading?
   ↓
YES → return Loading JSX → STOP

NO
 ↓
error?
 ↓
YES → return Error JSX → STOP

NO
 ↓
return Users JSX
🔥 Why return?

return means:

"Indha component-ku ippo indha UI dhaan return pannu."

For example:

if (loading) {
  return <h2>Loading...</h2>;
}

Loading true-na component immediately Loading UI return pannidum. Below irukkura code execute aagadhu.

But JSX kulla condition venumna?

Appo if use panna mudiyadhu:

❌

return (
  <div>
    {if (loading) {
      return <h2>Loading</h2>
    }}
  </div>
);

Instead ternary:

return (
  <div>
    {loading ? <h2>Loading...</h2> : <p>Users loaded</p>}
  </div>
);

or &&:

return (
  <div>
    {loading && <h2>Loading...</h2>}
  </div>
);
🧠 Easy rule

Outside JSX → normal JavaScript → if works

if (loading) {
  return ...;
}

Inside JSX {} → JavaScript expression → use ? :, &&, .map() etc.

{loading ? <Loading /> : <Users />}

Angular-la *ngIf template syntax use pannuvom; React-la JS itself is heavily involved in deciding what JSX to return. That's one of the key React mindsets da. 🔥