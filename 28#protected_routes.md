Polam da 😎🔥
🔐 Concept 24 — Protected Routes
இதுதான் JWT authentication-க்கு next important concept.
Problem என்ன?
நம்ம app-la:
/login
/dashboard
/profile

User login பண்ணாமலே browser-la:
http://localhost:5173/dashboard

type பண்ணினா Dashboard open ஆகக்கூடாது. ❌
Login செய்த users மட்டும் Dashboard பார்க்கணும்.
இதைத்தான் Protected Route சொல்றோம்.
Flow
User
 ↓
/dashboard
 ↓
Is user logged in?
 ├── YES → Dashboard ✅
 │
 └── NO  → /login 🔐

Angular developer-க்கு இது Route Guard (CanActivate) மாதிரி.
Angular Route Guard
        ↓
Protected Route
        ↓
React Protected Route

React-la எப்படி?
Usually ஒரு reusable component உருவாக்குவோம்:
function ProtectedRoute() {
  // token check
  // token இருந்தால் → Dashboard
  // token இல்லையென்றால் → Login
}

Then:
<Route
  path="/dashboard"
  element={<ProtectedRoute />}
>
  ...
</Route>

But இங்க கொஞ்சம் important concepts — Navigate, token check, nested route / Outlet — combine ஆகும்.
அதனால next message-la நம்ம Login → token → ProtectedRoute → Dashboard complete flow-ஐ code-ஆ step-by-step build பண்ணலாம். 🔥













Sample code venum












Sure da 😎 Protected Route-க்கு first simple sample பாப்போம். JWT complexity இப்போ வேண்டாம்; முதலில் concept மட்டும் clear பண்ணிக்கலாம்.
📁 Files
src/
├── App.tsx
├── Login.tsx
├── Dashboard.tsx
└── ProtectedRoute.tsx

1️⃣ Login.tsx
Login successful என்றால் token store பண்ணி Dashboard-க்கு navigate பண்ணுவோம்.
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleLogin() {
    // Demo purpose
    const token = "sample-token";

    localStorage.setItem("token", token);

    navigate("/dashboard");
  }

  return (
    <div>
      <h2>Login Page</h2>

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;

இங்க:
localStorage.setItem("token", token);

→ user login successful என்று temporary-ah token store பண்ணுறோம்.
2️⃣ ProtectedRoute.tsx
இதுதான் main concept 🔐
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

இதுல:
if (!token) {
  return <Navigate to="/login" />;
}

Token இல்லனா → Login page.
Token இருந்தா:
return <Outlet />;

→ requested protected component render ஆகும்.
3️⃣ Dashboard.tsx
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome Santhosh 🎉</p>
    </div>
  );
}

export default Dashboard;

4️⃣ App.tsx
இங்க routes connect பண்ணுவோம்:
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;

🔥 Complete flow
First user opens Dashboard directly:
/dashboard
     ↓
ProtectedRoute
     ↓
localStorage token?
     ↓
    NO
     ↓
Navigate → /login

Then user clicks Login:
Login button
     ↓
handleLogin()
     ↓
localStorage.setItem("token")
     ↓
navigate("/dashboard")
     ↓
ProtectedRoute
     ↓
token exists ✅
     ↓
<Outlet />
     ↓
Dashboard

🅰️ Angular comparison
React:
<ProtectedRoute />

roughly equivalent to Angular:
canActivate: [AuthGuard]

React:
<Navigate to="/login" />

roughly:
this.router.navigate(['/login']);

React:
<Outlet />

இது நம்ம முன்னாடி பார்த்த nested routes Outlet தான். Here it acts as the place where the protected child route (Dashboard) gets rendered.
One important note: இந்த example learning purpose மட்டும். Real project-la localStorage token check மட்டும் போதாது; actual JWT validation/backend security தேவை.













import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;


intha place additional ah oru route tag iruku dashboard route ku mela oru parent tag mari correct ah ?













Correct da macha! 😎💯 Nee right-ah observe pannirukka.
Dashboard route-ku mela irukkura additional <Route> parent route தான்.
<Route element={<ProtectedRoute />}>

  <Route
    path="/dashboard"
    element={<Dashboard />}
  />

</Route>


ஏன் இந்த parent route தேவை?
இந்த parent route-oda job, அதற்குள் இருக்கிற child routes-ஐ protect பண்ணுறது.
             App.tsx
                |
              Routes
                |
        ┌───────┴────────┐
        |                |
   /login route     Parent Route
        |                |
     Login.tsx     ProtectedRoute
                         |
                    /dashboard
                         |
                    Dashboard.tsx


Execution flow
User /dashboard open பண்ணும்போது:
1. React Router parent route-ஐ process பண்ணும்.
2. Parent route-ல் ProtectedRoute render ஆகும்.
3. Token இருக்கிறதா என்று check பண்ணும்.
4. Token இல்லையென்றால் /login-க்கு redirect ஆகும்.
5. Token இருந்தால் <Outlet /> வழியாக Dashboard render ஆகும்.
Parent route-ல் path ஏன் இல்லை?
<Route element={<ProtectedRoute />}>


இதில் path கொடுக்கலை. ஏனென்றால் இது தனியாக ஒரு URL-ஐ represent பண்ணவில்லை. இதற்குள் இருக்கும் routes-க்கு shared protection கொடுக்கிறது.
இதைத்தான் pathless parent route என்போம்.
Angular comparison:
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [AuthGuard]
}


Angular-ல் CanActivate guard போடுவது போல, React-ல் இந்த parent route மூலம் protection logic-ஐ reusable ஆக்குறோம்.
முக்கியமான point da: நாளைக்கு /profile, /settings போன்ற routes-ஐயும் இதே parent route-க்குள் வைத்தால், அவற்றுக்கும் அதே protection apply பண்ணலாம். 🔥
















thanks













Anytime da macha! ❤️😎
Namma React journey super-ah poitu irukku. 🔥
Concept puriyalana udane kelu da. Namma project build pannumbothu ovvoru line of code-um detail-ah paathukalam, Angular comparison-oda.