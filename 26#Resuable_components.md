Reusable Component என்றால் என்ன?
ஒரே UI/logic-ஐ பல இடங்களில் repeat பண்ணாமல், ஒரு component create பண்ணி பல இடங்களில் reuse பண்ணுவது.
Angular-la நீங்க already இதை நிறைய use பண்ணிருப்பீங்க:
<app-button></app-button>

React-la:
<Button />

1️⃣ Simple example — Button
Suppose application-la 3 buttons இருக்கு:
Save
Cancel
Delete

ஒவ்வொன்றுக்கும் தனித்தனியா <button> எழுதாம:
function Button() {
  return <button>Click Me</button>;
}

But இது reusable இல்ல 😄 ஏன்னா எல்லா இடத்திலும் same text.
So props use பண்ணுவோம்.
function Button({ text }: { text: string }) {
  return <button>{text}</button>;
}

இப்போ:
<Button text="Save" />
<Button text="Cancel" />
<Button text="Delete" />

Output:
[ Save ]
[ Cancel ]
[ Delete ]

இதுதான் reusable component.
2️⃣ Angular comparison
Angular:
@Input() text!: string;

<button>{{ text }}</button>

Use:
<app-button text="Save"></app-button>
<app-button text="Cancel"></app-button>

React:
function Button({ text }: { text: string }) {
  return <button>{text}</button>;
}

Use:
<Button text="Save" />
<Button text="Cancel" />

So:
Angular @Input()
      ↓
React Props

3️⃣ Real-world reusable Card
Suppose BOA application-la employee cards display பண்ணணும்:
Santhosh
IT Analyst
Angular Developer

Arun
Developer
React Developer

Instead of creating two separate components, one UserCard:
type UserCardProps = {
  name: string;
  role: string;
  technology: string;
};

function UserCard({
  name,
  role,
  technology
}: UserCardProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{role}</p>
      <p>{technology}</p>
    </div>
  );
}

Then:
function App() {
  return (
    <div>
      <UserCard
        name="Santhosh"
        role="IT Analyst"
        technology="Angular"
      />

      <UserCard
        name="Arun"
        role="Developer"
        technology="React"
      />
    </div>
  );
}

Flow 🧠
App
 │
 ├── UserCard
 │     name = Santhosh
 │     role = IT Analyst
 │
 └── UserCard
       name = Arun
       role = Developer

Same component, different data. 🔥
💡 Important rule
Reusable component create பண்ணும்போது:
UI structure same, data different → Reusable component.

Example:
Same Card design
        ↓
Different users
        ↓
Props
        ↓
Reusable component

இதுதான் React-la component reusability + props combine ஆகுற முக்கிய இடம்.
Next Concept 23 — Authentication / JWT. இது real-world React application-ku ரொம்ப important. 🔐