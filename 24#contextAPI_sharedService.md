Macha 😎 next topic: Concept 20 — Context API polam.

🔥 Context API → Angular Service / Shared State

So far namma Lifting State Up la:

        App
       /   \
   UserInput  UserDisplay

name state App-la irundhu children-ku props ah pass pannom.

But imagine:

App
 └── Dashboard
      └── Header
           └── UserProfile
                └── UserName

App-la irukkura userName ah UserName component-ku anuppanum na, every intermediate component-um props receive & forward panna vendiyadhu varum.

இதுதான் Prop Drilling.

App
 ↓ props
Dashboard
 ↓ props
Header
 ↓ props
UserProfile
 ↓ props
UserName

😵‍💫 unnecessary.

Context API என்ன பண்ணும்?

Context மூலம் common/shared data-வை tree-la direct-ah access panna mudiyum.

             App
              │
         UserContext
              │
       ┌──────┴──────┐
   Header          Dashboard
      │                │
 UserProfile        UserName
      ↑                ↑
      └── directly access

Angular-la idhu conceptually Service + dependency injection madhiri think pannalam.

Angular	React
Service	Context
Dependency Injection	useContext()
Shared data	Context value
providedIn: 'root'	Context Provider around app/tree

Next step: createContext → Provider → useContext இந்த 3 steps-ஐ ஒரு proper User Login example வைத்து பார்ப்போம்.

Sure da 😎 Context API-க்கு ஒரு real-time feeling வரும் மாதிரி Login User example பார்ப்போம்.

🧩 Scenario

Suppose user login பண்ணிட்டாரு:

App
 ├── Header
 │    └── UserProfile
 └── Dashboard
      └── WelcomeMessage

App-ல user name "Santhosh" இருக்கு.

Prop drilling use பண்ணினா:

App
 ↓ userName
Header
 ↓ userName
UserProfile

Context API use பண்ணினா, UserProfile direct-ah context-la இருந்து userName எடுத்துக்கலாம்.

1️⃣ Create Context

UserContext.tsx

import { createContext } from "react";

export const UserContext = createContext("");

இதுல:

createContext("")

means:

"Namma application-la shared user data store/access panna oru Context create panrom."

2️⃣ Provider

இப்போ App.tsx:

import { UserContext } from "./UserContext";
import Header from "./Header";

function App() {
  const userName = "Santhosh";

  return (
    <UserContext.Provider value={userName}>
      <Header />
    </UserContext.Provider>
  );
}

export default App;

Important part:

<UserContext.Provider value={userName}>

இதுதான் shared value provide பண்ணுது.

So:

UserContext.Provider
        ↓
   value = "Santhosh"
        ↓
   Header
        ↓
   UserProfile

Header, UserProfile அல்லது அந்த Provider-க்குள் இருக்கும் எந்த child component-மும் இந்த value-ஐ access பண்ணலாம்.

3️⃣ Access Context

UserProfile.tsx

import { useContext } from "react";
import { UserContext } from "./UserContext";

function UserProfile() {
  const userName = useContext(UserContext);

  return (
    <h2>Welcome {userName}</h2>
  );
}

export default UserProfile;

இதுல:

const userName = useContext(UserContext);

means:

"UserContext-la currently என்ன value இருக்கு?"

Answer:

Santhosh

So UI:

Welcome Santhosh
🔥 Complete Flow
App
 │
 │ value = "Santhosh"
 ↓
UserContext.Provider
 │
 ↓
Header
 │
 ↓
UserProfile
 │
 │ useContext(UserContext)
 ↓
"Santhosh"

Notice பண்ணு da:

Headerக்கு userName prop அனுப்பவே இல்லை.

<Header />

Still UserProfile direct-ah context-la இருந்து எடுத்துக்குது.

🅰️ Angular mapping

Angular-la:

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userName = "Santhosh";

}

Then component:

constructor(private userService: UserService) {}

ngOnInit() {
  console.log(this.userService.userName);
}

React:

const userName = useContext(UserContext);

So mental model:

Angular Service
      ↓
shared data
      ↓
React Context
One important point ⚠️

Context just shared state/data access mechanism.

It is not automatically a replacement for every state management library. Small/common data like:

logged-in user
theme
language
permissions

are common Context use cases.

Next, namma Context + useState together use panni actual Login/Logout example build pannina concept semma clear aagum.


================================== Real example with  context + useState

Super da 😎 அப்போ next Context + useState → Login/Logout example போலாம்.

இதுதான் real project-la Context எப்படி use ஆகுது என்பதைக் காட்டும்.

Flow
App
 ↓
UserContext.Provider
 ↓
 ├── Header
 │    └── Login / Logout
 │
 └── Dashboard
      └── Welcome Santhosh

user state App-ல இருக்கும். Context மூலம் user + setUser இரண்டையும் children access பண்ணும்.

Core idea
const [user, setUser] = useState<string | null>(null);

Login:

setUser("Santhosh");

Logout:

setUser(null);

Context:

<UserContext.Provider value={{ user, setUser }}>

Child:

const { user, setUser } = useContext(UserContext);

So:

Login button
   ↓
setUser("Santhosh")
   ↓
Context value changes
   ↓
All consuming components re-render
   ↓
Header + Dashboard updated

இதுதான் Context API-யின் real power da. 🔥

Next step-la இதையே proper 3-file project code (UserContext.tsx, App.tsx, Header.tsx) ஆக build பண்ணலாம்.