import Todo from "./Components/Todo.jsx";
import "./App.css";
import { useState } from "react";
import Start from "./Components/Start.jsx";

function App() {
  const [start, setStart] = useState(false);
  return (
    <div className='App'>
      <Todo setStart={setStart} />
      {start ? <Start setStart={setStart} /> : ""}
    </div>
  );
}

export default App;
