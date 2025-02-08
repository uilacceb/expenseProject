import AddExpenseForm from "./components/AddExpenseForm";
import Dashboard from "./components/Dashboard"
import Layout from "./components/Layout"
import { createContext, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import TransactionHistory from "./components/TransactionHistory";


export const ExpenseContext = createContext();

function App() {
  const [toggleHamburger, setToggleHamburger] = useState(false)
  const [user, setUser] = useState();


  return (
    <>
      <Router>
        <ExpenseContext.Provider value={{ toggleHamburger, setToggleHamburger, user, setUser }}>
          <Routes>
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/add-expense" element={<Layout><AddExpenseForm /></Layout>} />
            <Route path="/transaction-history" element={<Layout><TransactionHistory /></Layout>} />
          </Routes>

        </ExpenseContext.Provider>
      </Router >
    </>
  )
}

export default App
