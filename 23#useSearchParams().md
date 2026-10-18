Polam da 😎🔥 Dynamic routes + useParams() clear. Ippo React Router-la next important concept — useSearchParams(), then after that navigation patterns & route protection side-ku move pannalam.

Concept 19 — Query Parameters

Dynamic route:

/users/101

inga 101 is a path parameter.

But sometimes URL ippadi irukkum:

/users?search=santhosh&page=2

Here:

/users
  ↓
?search=santhosh&page=2

These are query parameters.

1️⃣ Angular comparison

Angular-la:

this.route.queryParams.subscribe(params => {
  console.log(params['search']);
});

React-la:

import { useSearchParams } from "react-router-dom";

function Users() {

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");

  console.log(search);

  return <h2>Search: {search}</h2>;
}

If URL is:

/users?search=santhosh

then:

search = "santhosh"
2️⃣ Multiple query parameters

URL:

/users?search=santhosh&page=2

Code:

const [searchParams] = useSearchParams();

const search = searchParams.get("search");
const page = searchParams.get("page");

console.log(search); // santhosh
console.log(page);   // 2
3️⃣ Path parameter vs Query parameter

This distinction is important da:

Path parameter
/users/101
<Route path="/users/:id" element={<UserDetails />} />
const { id } = useParams();

Think:

Which specific resource?

101 → specific user.

Query parameter
/users?search=santhosh&page=2
const [searchParams] = useSearchParams();

const search = searchParams.get("search");

Think:

How should I filter/search/sort this resource?

Easy memory trick 🧠
/users/101
        ↑
    PATH PARAM
    "Which user?"

/users?search=santhosh&page=2
       ↑
     QUERY PARAM
     "How should I search/filter?"

Angular developer perspective:

Angular ActivatedRoute
       ↓
params / queryParams

React Router
       ↓
useParams() / useSearchParams()

🔥 This completes the major URL parameter concepts. Next we'll move into Context API → Angular Services/Shared State, which is our Concept 20.