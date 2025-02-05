import Dashboard from "./components/Dashboard"
import Layout from "./components/Layout"
import { createContext, useState } from "react"


export const ExpenseContext = createContext();

function App() {
  const [toggleHamburger, setToggleHamburger] = useState(false)


  return (
    <>
      <ExpenseContext.Provider value={{ toggleHamburger, setToggleHamburger }}>
        <Layout>
          <Dashboard />
        </Layout>
      </ExpenseContext.Provider>
    </>
  )
}

export default App
