import HouseholdSalaryCalculator from "./components/HouseholdSalaryCalculator";
import { MainContextProvider } from "./components/MainContextProvider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <MainContextProvider>
      <div className="container py-8">
        <HouseholdSalaryCalculator />
      </div>
      <ToastContainer />
    </MainContextProvider>
  );
}

export default App;
