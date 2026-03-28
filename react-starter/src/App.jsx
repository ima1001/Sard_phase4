import { useState } from 'react'
import { Routes, Route, NavLink } from "react-router-dom"
import './App.css'
import Editor from "./Pages/Editor.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Welcome to Sard</h1>
      <nav>
        <NavLink to="/">Editor</NavLink>
      </nav>
      <section id="center">
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>

        {<Routes>
          <Route path="/" element={<Editor />} /> 
        </Routes>}

      </section>
    </>
  )
}

export default App
