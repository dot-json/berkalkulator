import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { useMainContext } from "./MainContextProvider";

const MarriageEligible = ({ setMarriedAtOpen }) => {
  const [eligible, setEligible] = useState(false);
  const { members, activeMember, eligibleForMarriageDiscount } =
    useMainContext();

  useEffect(() => {
    setEligible(eligibleForMarriageDiscount(members[activeMember]));
  }, [activeMember, members[activeMember].marriedAt]);

  return (
    <div className={cn("flex h-6 gap-2")}>
      <button
        className={cn(
          "flex h-full items-center justify-center rounded-full bg-gray-700 px-2.5 text-xs font-semibold text-gray-100",
        )}
        onClick={() => {
          setMarriedAtOpen(true);
        }}
      >
        Dátum{" "}
        {members[activeMember].marriedAt === null
          ? "hozzáadása"
          : "szerkesztése"}
      </button>
      <span
        className={cn(
          "flex h-full select-none items-center justify-center rounded-full border px-2.5 text-xs font-semibold text-gray-100 opacity-0 transition-opacity",
          members[activeMember].discounts["friss_hazasok"] && "opacity-100",
          eligible ? "bg-green-500 " : "bg-red-500",
        )}
      >
        {eligible ? "Jogosult" : "Nem jogosult"}
      </span>
    </div>
  );
};

export default MarriageEligible;
