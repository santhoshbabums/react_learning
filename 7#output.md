🟢 Concept 6 — Events → Angular @Output()

Idhuvum unakku super easy ah irukkum because Angular @Output() already theriyum.

Angular-la

Child:

@Output() clicked = new EventEmitter<void>();

onClick() {
  this.clicked.emit();
}

Parent:

<app-user (clicked)="handleClick()"></app-user>
React-la same idea

React-la @Output() nu separate concept illa.

Parent oru function-a child-ku prop-ah pass pannum.

App.tsx
import User from "./components/User";

function App() {

  function handleClick() {
    alert("User button clicked!");
  }

  return (
    <>
      <h1>My React App</h1>

      <User onClick={handleClick} />
    </>
  );
}

export default App;
User.tsx
function User({ onClick }: { onClick: () => void }) {

  return (
    <div>
      <h2>User Details</h2>

      <button onClick={onClick}>
        Click Me
      </button>
    </div>
  );
}

export default User;
Flow purinjiko 👇
App (Parent)
   |
   | function handleClick()
   ↓
User (Child)
   |
   | onClick()
   ↓
App's handleClick()

So React-la:

Parent function → child prop → child calls function

🔥 Angular vs React mapping
Angular	React
@Output()	Callback prop
EventEmitter	Function
.emit()	Function call
(clicked)="handleClick()"	onClick={handleClick}

One important syntax:

onClick={handleClick}

❌ Don't do:

onClick={handleClick()}

Because handleClick() means call immediately.

onClick={handleClick} means React, event happen aana indha function-a call pannu.

Next-la event data child → parent pass panradhu paapom — Angular EventEmitter<string> equivalent.