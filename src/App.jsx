import { Route, Routes } from "react-router"

import Home from "./pages/Home"
import "bootstrap/dist/css/bootstrap.min.css"
import AddItem from "./pages/AddItem"
import Recovered from "./pages/Recovered"
import "./App.css"

function App() {
  return (
    <>
      <main className="bg-dark">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/recover/:id" element={<Recovered />} />
        </Routes>
      </main>
    </>
  )
}

export default App
