useMemo() என்றால் என்ன?
ஒரு calculation result-ஐ cache பண்ணி, தேவையில்லாமல் அதே calculation திரும்பத் திரும்ப நடக்காமல் இருக்க உதவும் React Hook.
Simple example
Suppose namma app-la:
const numbers = [10, 20, 30, 40, 50];

const total = numbers.reduce((sum, num) => sum + num, 0);


total calculate பண்ணுறோம். Component வேறு காரணத்துக்காக re-render ஆனாலும், இந்த calculation மறுபடியும் நடக்கலாம்.
useMemo() use பண்ணினா:
import { useMemo } from "react";

const total = useMemo(() => {
  return numbers.reduce((sum, num) => sum + num, 0);
}, [numbers]);


numbers dependency change ஆகாத வரை, React previous calculation result-ஐ reuse பண்ணலாம்.
Angular comparison
Angular-la இதுக்கு exact equivalent built-in Hook கிடையாது. Conceptually, expensive calculation results-ஐ cache பண்ணுவது போன்ற optimization.
Without useMemo:
Re-render → Calculation again

With useMemo:
Re-render → Dependency unchanged?
                   ├── Yes → Cached result
                   └── No  → Recalculate


Important da: எல்லா calculation-க்கும் useMemo() தேவையில்லை. Expensive calculations அல்லது profiling மூலம் performance issue தெரிந்தால் use பண்ணலாம்.
Next, useMemo()-வை ஒரு proper example-ல useState-உடன் இணைத்துப் பார்ப்போம். 💪
















const numbers = [10, 20, 30, 40, 50];

const total = numbers.reduce((sum, num) => sum + num, 0);

oru doubt, number same ah irundha fine, same return value ah cache mari ue pannalam but every time component render ahhurapo numbers change ahhna enna panuva usememo waster thana?













Correct da macha! 🔥 Nee right-ah think panra. useMemo use pannalum dependency change aana calculation thirumba execute aagum. Appo enna benefit nu paakalaam.
1. Normal calculation — useMemo illaama
const numbers = [10, 20, 30, 40, 50];

const total = numbers.reduce((sum, num) => sum + num, 0);


Component ovvoru time render aagumbothum reduce() thirumba execute aagum.
- numbers same → calculation thirumba nadakkum.
- numbers change → calculation thirumba nadakkum.
2. useMemo use pannina
const total = useMemo(() => {
  return numbers.reduce((sum, num) => sum + num, 0);
}, [numbers]);


Situation	Enna nadakkum?
Dependency same	Cached result reuse pannum
Dependency change	Calculation thirumba execute aagum
Calculation romba simple	useMemo thevai illaama irukkalaam
3. Appo useMemo waste aaguma?
Dependency ovvoru render-layum change aana, aama da — cache benefit kidaikkaadhu; useMemo-ku overhead-um irukkum.
Example:
function App() {
  const numbers = [10, 20, 30, 40, 50];

  const total = useMemo(() => {
    console.log("Calculating...");
    return numbers.reduce((sum, num) => sum + num, 0);
  }, [numbers]);

  return <h1>{total}</h1>;
}


Inga problem enna theriyuma? numbers array component-kulla create pannirukkom. Ovvoru render-layum pudhu array reference create aagum. So React-ku dependency change aana maadhiri theriyum; calculation thirumba nadakkum.
Correct approach
const numbers = [10, 20, 30, 40, 50];

function App() {
  const total = useMemo(() => {
    return numbers.reduce((sum, num) => sum + num, 0);
  }, []);

  return <h1>{total}</h1>;
}


Inga numbers component-ku veliya irukkaradhunaala reference stable-ah irukkum. Dependency [] — calculation result-ai subsequent renders-la reuse pannalaam.
Real-world rule da macha: useMemo mainly expensive calculations-ku useful. Simple reduce() or small array calculations-ku usually thevai illa. Dependency frequently change aagudhu-na, useMemo use pannradhukku munnaadi adhu actual performance benefit kudukkudha-nu consider pannanum.
















Component ovvoru time render aagumbothum reduce() thirumba execute aagum.
- numbers same → calculation thirumba nadakkum.
- numbers change → calculation thirumba nadakkum.
rendukee nadukama?















Aama da macha 😂🔥 rendu situation-layum reduce() execute aagum!
const total = numbers.reduce((sum, num) => sum + num, 0);


- numbers same-ah irundhaalum → reduce() execute aagum.
- numbers change aanaalum → reduce() execute aagum.
Reason: useMemo illaama irukkumbodhu React-ku previous calculation result-ai automatically cache panni reuse panna instruction kudukkala.
useMemo use pannina mattum dhaan dependency same-ah irundhaa previous result reuse pannum; dependency change aana calculation thirumba execute aagum.
Simple-ah remember pannikko:
- Normal calculation = every render-um calculate.
- useMemo = dependency change aana mattum recalculate (normal circumstances-la).
















apdi sollu numbers dependency change aggal;ana calculation nadakathu , dependent change ahhana cal nadakum correct ah?













Correct da macha! 💯🔥
useMemo use pannumbodhu:
- ✅ Dependency change aagala → Calculation nadakkaadhu; cached result reuse aagum.
- ✅ Dependency change aachu → Calculation thirumba nadakkum.
const total = useMemo(() => {
  return numbers.reduce((sum, num) => sum + num, 0);
}, [numbers]);


Inga [numbers] dhaan dependency array da.
Oru important point: numbers-oda reference change aaganum; array-kulla value mattum change panninaa React adha detect pannaama pogalaam, especially same array-ai mutate pannina. So React-la array-ai direct-ah mutate pannaama pudhu array create pannanum.
Idhu dhaan useMemo-oda core concept da! 😎