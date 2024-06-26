import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import SignupPage from './pages/SignupPage/SignupPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
     <Route path="/signup" element={<SignupPage />} />
    </Routes>
    </>
  )
}

export default App;
