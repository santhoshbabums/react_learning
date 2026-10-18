Concept 21 — Custom Hooks

Angular developer-ku இது initially கொஞ்சம் different-ah இருக்கும், but concept easy.

Angular mapping
Angular	React
Reusable Service / utility logic	Custom Hook
constructor(private service...)	Hook call
Service method	Custom Hook function
Reuse logic across components	Reuse logic across components

Example:

Instead of writing this in every component:

const [count, setCount] = useState(0);

function increment() {
  setCount(count + 1);
}

namma reusable hook create pannalam:

function useCounter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  return { count, increment };
}

Then any component:

const { count, increment } = useCounter();
Mental model 🧠
Normal function
      ↓
Reusable logic

Custom Hook
      ↓
Reusable React logic + Hooks

One important rule:

Custom Hook name use-la start aaganum.

Examples:

useCounter()
useAuth()
useUsers()
useFetch()
useForm()

Next namma useCounter() proper example → Angular equivalent → why Custom Hooks are needed nu step-by-step paakalaam. 🔥