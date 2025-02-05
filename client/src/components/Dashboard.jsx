import WelcomeUser from "./WelcomeUser";
import ToggleMenu from "./ToggleMenu";

const Dashboard = () => {


  return (
    <>
      <div className="flex min-h-screen">
        <ToggleMenu />
        <div className="flex flex-col flex-1">
          <WelcomeUser />
        </div>
      </div>
    </>
  )
}

export default Dashboard