import WelcomeUser from "./WelcomeUser";
import Balance from "./Balance";
import ToggleMenu from "./ToggleMenu";

const Dashboard = () => {


  return (
    <>
      <div className="flex flex-col h-screen ">
        <ToggleMenu />
        <WelcomeUser />
        <Balance />
      </div>
    </>
  )
}

export default Dashboard