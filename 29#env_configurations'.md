Polam da macha! 😎🔥
Namma React roadmap-la next:
Concept 25 — Environment Configuration (.env files)
Real-time project-la API URLs, environment-specific settings ellam epdi manage panrathu nu learn pannuvom.
1. .env file na enna?
Suppose namma React app, Spring Boot backend API call pannuthu.
Development:
http://localhost:8080/api


Production:
https://api.mycompany.com/api


Ovvoru API call-layum URL hardcode pannaama .env file use pannalaam.
2. Vite React project example
.env.development
VITE_API_URL=http://localhost:8080/api


.env.production
VITE_API_URL=https://api.mycompany.com/api


React component-la access panna:
const apiUrl = import.meta.env.VITE_API_URL;

console.log(apiUrl);


Development-la:
http://localhost:8080/api


Production build-la:
https://api.mycompany.com/api


🅰️ Angular comparison
Angular	React + Vite
environment.ts	.env.development
environment.prod.ts	.env.production
environment.apiUrl	import.meta.env.VITE_API_URL
Important da: VITE_ prefix irukkura variables frontend bundle-la visible-ah irukkum. Passwords, private API keys, database credentials maadhiri secrets-ai .env-la vechuttu frontend-la expose panna koodadhu.
Next, .env file create panradhu, access panradhu, development/production-la values epdi change aagudhu nu proper example-oda paakkalaam.



Sari da macha 😎 Oru real-time example eduthuppom. Namma React app-la Spring Boot backend API URL-ah .env file-la store panni use panradhu epdi nu paakkalam.
1. Project structure
react-learning/
├── .env
├── src/
│   ├── App.tsx
│   └── main.tsx
└── package.json


2. .env file create pannu
Project root-la, package.json irukkura same level-la .env file create pannu.
.env

VITE_API_URL=http://localhost:8080/api



Inga 8080 namma Spring Boot backend port-nu assume panrom.
3. App.tsx-la use pannu
function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  async function getUsers() {
    try {
      const response = await fetch(`${apiUrl}/users`);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>User Management</h1>

      <button onClick={getUsers}>
        Get Users
      </button>
    </div>
  );
}

export default App;


4. Button click pannumbothu enna nadakkum?
.env
  ↓
VITE_API_URL
  ↓
import.meta.env.VITE_API_URL
  ↓
http://localhost:8080/api
  ↓
fetch(`${apiUrl}/users`)
  ↓
GET http://localhost:8080/api/users
  ↓
Spring Boot response
  ↓
console.log(data)


Backend running-la irukkanum; /api/users endpoint-um exist aaganum. Illana request fail aagum.
5. Angular vs React comparison
Angular	React + Vite
environment.ts	.env
environment.apiUrl	import.meta.env.VITE_API_URL
this.http.get(...)	fetch(...)
Important da: .env create or change pannina, Vite development server-ah restart pannu. .env values frontend bundle-la visible; passwords, private keys maadhiri secrets inga store panna koodadhu.
Ippadi dhaan da API URL-ah component code-kulla hardcode pannama maintain pannuvom. 🔥