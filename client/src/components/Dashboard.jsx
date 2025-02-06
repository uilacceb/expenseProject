import WelcomeUser from "./WelcomeUser";
import ToggleMenu from "./ToggleMenu";


const Dashboard = () => {


  return (
    <>
      <div className="flex">
        <ToggleMenu />
        <WelcomeUser />
      </div >
    </>
  )
}

export default Dashboard