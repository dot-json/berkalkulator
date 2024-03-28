import { cn } from "../lib/utils";
import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";

const HouseholdSalaryCalculator = () => {
  return (
    <div className={cn("flex flex-col gap-4")}>
      <header>
        <FamilyMemberTabs />
      </header>
      <main className={cn("grid grid-cols-1 gap-4 md:grid-cols-2")}>
        <SalaryCalculator />
        <HouseholdSummary />
      </main>
    </div>
  );
};

export default HouseholdSalaryCalculator;
