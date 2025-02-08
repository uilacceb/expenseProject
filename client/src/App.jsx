import AddExpenseForm from "./components/AddExpenseForm";
import Dashboard from "./components/Dashboard"
import Layout from "./components/Layout"
import { createContext, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import TransactionHistory from "./components/TransactionHistory";
import ExpenseDetailMobile from "./components/ExpenseDetailMobile";
import UpdateExpenseForm from "./components/UpdateExpenseForm"


export const ExpenseContext = createContext();

function App() {
  const [toggleHamburger, setToggleHamburger] = useState(false)
  const [user, setUser] = useState();
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [note, setNote] = useState('');

  return (
    <>
      <Router>
        <ExpenseContext.Provider value={{ toggleHamburger, setToggleHamburger, user, setUser, date, setDate, category, setCategory, amount, setAmount, description, setDescription, note, setNote }}>
          <Routes>
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/add-expense" element={<Layout><AddExpenseForm /></Layout>} />
            <Route path="/update-expense" element={<Layout><UpdateExpenseForm /></Layout>} />
            <Route path="/transaction-history" element={<Layout><TransactionHistory /></Layout>} />
            <Route path="/expense-detail" element={<Layout><ExpenseDetailMobile /></Layout>} />
          </Routes>

        </ExpenseContext.Provider>
      </Router >
    </>
  )
}

export default App
