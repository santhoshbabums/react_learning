Polam macha! 😎🔥 React.memo() concept purinjiduchu nu vechukittu next topic-ku polam.
Next topic: useReducer() in React
Macha, useState already namma padichirukom. Ippo useReducer kathukalam.
Real-time example: Shopping cart-la products add pannradhu, quantity increase/decrease pannradhu, items remove pannradhu.
Shopping Cart 🛒









Wireless Mouse
₹500 per item
−1
+



Total
₹500

This is a small simulation of shopping-cart state.

useState vs useReducer
- useState — simple state changes, like opening a popup or updating a name.
- useReducer — multiple related state changes, like adding a product, removing it, and changing its quantity.
Angular comparison: useReducer is not exactly the same as an Angular feature, but its reducer function is similar to a predictable state-update pattern.
Next, we'll build the same cart using useReducer, step by step, and understand what state, action, and dispatch mean.
















what i am saying useReduceer we can simply use ueState right ? that will make make the particaular vairable updates with current vaule right ? why seperate useRedeucer concept













Correct macha! 💯🔥 useState veche same functionality build pannalam. useReducer kandippa use pannanum nu rule illa.
Un question is correct: “useState irukkumbodhu, ethukku separate-ah useReducer?”
Let’s understand with a real example.
1. Using useState
Imagine namma shopping cart build panrom. Product quantity update pannanum.
const [quantity, setQuantity] = useState(1);

const increase = () => {
  setQuantity(quantity + 1);
};

const decrease = () => {
  setQuantity(quantity - 1);
};


Simple, right? Quantity mattum manage panrom. useState is the best choice here.
2. When the cart becomes more complex
Suppose namma shopping cart-la multiple operations irukku:
- Add a product
- Remove a product
- Increase quantity
- Decrease quantity
- Clear the entire cart
Using useState, you can still do all these things. But as the state and update logic grow, many separate functions and setters can become harder to maintain.
useReducer lets us organize those updates in one place.
type State = {
  quantity: number;
};

type Action =
  | { type: "increase" }
  | { type: "decrease" }
  | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increase":
      return { quantity: state.quantity + 1 };

    case "decrease":
      return { quantity: Math.max(0, state.quantity - 1) };

    case "reset":
      return { quantity: 0 };
  }
}


Use it inside your component:
const [state, dispatch] = useReducer(reducer, {
  quantity: 1,
});

// Increase quantity
dispatch({ type: "increase" });

// Decrease quantity
dispatch({ type: "decrease" });

// Reset quantity
dispatch({ type: "reset" });


Here, dispatch sends an action to the reducer, and the reducer decides what the new state should be.
3. So, which one should you use?
Situation	Recommended
Username, input field, counter	useState
Show/hide popup	useState
Multiple related state updates	Consider useReducer
Complex state-transition logic	useReducer can be easier to maintain
Remember this, macha: useReducer doesn't provide a magical state update that useState cannot do. Both can update state and trigger a re-render.
The main difference is how you organize the update logic.
Angular comparison: just as you can put simple logic directly in a component or separate complex logic into a service, React gives you different ways to organize state updates.
My recommendation for you: use useState by default. Learn useReducer so you can understand it when you see it in a real React project or interview.
















are we can simply write a function with switch case , it's looks normal switch case, any proper example













Exactly macha! 😂🔥 Nee correct-ah dhaan think panra.
“Normal JavaScript function + switch case write pannalaam la? Ethukku useReducer?”
Yes da, switch case is just normal JavaScript. But useReducer gives that function a specific role in managing React state.
Let’s take a proper real-time example from your Angular/React developer work.
Example: Employee management application
Imagine BOA application-la employee status manage panrom. An employee can be Active, Inactive, or On Leave.
1. Normal JavaScript function
function getNewStatus(currentStatus: string, action: string) {
  switch (action) {
    case "activate":
      return "Active";

    case "deactivate":
      return "Inactive";

    case "leave":
      return "On Leave";

    default:
      return currentStatus;
  }
}


Usage:
let status = "Active";

status = getNewStatus(status, "deactivate");

console.log(status); // Inactive


Correct macha! This works perfectly. But notice one thing: React doesn't automatically know that this normal variable changed. Changing a regular variable doesn't trigger a React re-render.
2. Using useState + the same function
We can do this:
const [status, setStatus] = useState("Active");

function deactivateEmployee() {
  const newStatus = getNewStatus(status, "deactivate");
  setStatus(newStatus);
}


This works too! React updates the UI because we call setStatus.
So, why would we need useReducer?
3. The actual benefit of useReducer
Suppose the employee has several related pieces of state:
- Employee status
- Loading status
- Error message
And different actions must update these values together. You can still manage them using multiple useState calls, but the update logic can become scattered across many handlers.
With useReducer, you organize those transitions centrally:
import { useReducer } from "react";

type State = {
  status: string;
  loading: boolean;
  error: string;
};

type Action =
  | { type: "deactivate" }
  | { type: "activate" }
  | { type: "failed"; message: string };

const initialState: State = {
  status: "Active",
  loading: false,
  error: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "deactivate":
      return { ...state, status: "Inactive", error: "" };

    case "activate":
      return { ...state, status: "Active", error: "" };

    case "failed":
      return { ...state, loading: false, error: action.message };
  }
}

function Employee() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <p>Status: {state.status}</p>
      <p>Error: {state.error}</p>

      <button onClick={() => dispatch({ type: "deactivate" })}>
        Deactivate
      </button>

      <button onClick={() => dispatch({ type: "activate" })}>
        Activate
      </button>

      <button
        onClick={() =>
          dispatch({ type: "failed", message: "Update failed" })
        }
      >
        Simulate Error
      </button>
    </>
  );
}


What exactly is different?
With useState
Button → handler function → setStatus(...) / setError(...)

With useReducer
Button → dispatch(action) → reducer's switch case → returns the next state → React updates the UI

One important point: useReducer doesn't automatically handle API requests or errors. We wrote the error action ourselves. Its benefit is keeping related state-update rules in one reducer function.
My final answer, macha: Your thinking is right. A normal function with switch can calculate a new value, and useState can update React with that value. useReducer is useful when you want a single, organized place to define how multiple related state changes happen. For a simple counter or status variable, useState is absolutely enough.

Correct macha! 🔥💯 Ippo correct-ah purinjikita!
useReducer is useful when state management becomes complex. It helps organize related state updates in one place.
- Simple state update → useState
- Multiple related state updates and complex logic → useReducer
For example, shopping cart-la add product, remove product, update quantity, clear cart nu neraya operations irundha, useReducer use pannina maintain panna easy-ah irukkum.
One important point, da: useReducer doesn't give special functionality that useState cannot do. It gives us a cleaner way to organize complex state-update logic.
Semma macha! Next topic polama? 😎