import { createContext, useContext, useEffect, useState } from "react";

import { emitToast } from "../lib/utils";

const MainContext = createContext();

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a MainContextProvider");
  }
  return context;
};

export const MainContextProvider = ({ children }) => {
  const [members, setMembers] = useState([]);
  const [activeMember, setactiveMember] = useState(0);

  const addMember = () => {
    setMembers((prev) => [
      ...prev,
      {
        name: "Új családtag",
        salary: 0,
        netSalary: 0,
        marriedAt: null,
        csaladi: {
          eltartott: 0,
          kedvezmenyezett: 0,
        },
        discounts: {
          szja_mentesseg: false,
          friss_hazasok: false,
          szemelyi_adokedvezmeny: false,
          csaladi_kedvezmeny: false,
        },
      },
    ]);
    emitToast("Új családtag hozzáadva", "success");
  };

  const deleteMember = (index) => {
    setMembers((prev) => {
      const newMembers = [...prev];
      newMembers.splice(index, 1);
      return newMembers;
    });
    if (activeMember > members.length - 2) {
      setactiveMember(activeMember - 1);
    }
    if (members.length === 1) {
      setactiveMember(0);
    }
    emitToast("Családtag törölve", "success");
  };

  const handleNameChange = (e) => {
    const newMembers = [...members];
    newMembers[activeMember].name = e.target.value;
    setMembers(newMembers);
  };

  const handleSalaryChange = (e) => {
    const newMembers = [...members];
    newMembers[activeMember].salary = e.target.value;
    setMembers(newMembers);
    calcNetSalary(newMembers[activeMember]);
  };

  const handleSalaryChangeByPercent = (percent) => {
    const newMembers = [...members];
    newMembers[activeMember].salary = Math.round(
      newMembers[activeMember].salary * percent,
    );
    setMembers(newMembers);
    calcNetSalary(newMembers[activeMember]);
  };

  const handleSalaryChangeBySlider = (value) => {
    const newMembers = [...members];
    newMembers[activeMember].salary = value;
    setMembers(newMembers);
    calcNetSalary(newMembers[activeMember]);
  };

  const handleDiscountChange = (key) => {
    const newMembers = [...members];
    newMembers[activeMember].discounts[key] =
      !newMembers[activeMember].discounts[key];
    setMembers(newMembers);
    calcNetSalary(newMembers[activeMember]);
  };

  const handleCsaladiChange = (key, value) => {
    const newMembers = [...members];
    newMembers[activeMember].csaladi[key] = value;
    setMembers(newMembers);
    calcNetSalary(newMembers[activeMember]);
  };

  const saveMarriedAt = (marriedAt) => {
    const newMembers = [...members];
    newMembers[activeMember].marriedAt = marriedAt;
    setMembers(newMembers);
    emitToast("Házasság dátuma elmentve", "success");
    calcNetSalary(newMembers[activeMember]);
  };

  function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  const eligibleForMarriageDiscount = (member) => {
    if (!member.marriedAt) return false;

    const marriageDate = new Date(member.marriedAt);
    const now = new Date();

    let monthsDiff = monthDiff(marriageDate, now);

    console.log(monthsDiff);

    // check also if the marriage is fresh is it more than a month ago
    if (monthsDiff <= 24 && monthsDiff > 0) {
      return true;
    }
    return false;
  };

  const calcNetSalary = (member) => {
    let taxes = 0;

    if (member.discounts.szja_mentesseg) {
      let leftover = member.salary - 499952;
      if (leftover > 0) {
        taxes += leftover * 0.15;
      }
    } else {
      taxes += member.salary * 0.15;
    }

    if (member.discounts.friss_hazasok && eligibleForMarriageDiscount(member)) {
      taxes -= 5000;
    }

    if (member.discounts.szemelyi_adokedvezmeny) {
      taxes -= 77300;
    }

    if (
      member.discounts.csaladi_kedvezmeny &&
      member.csaladi.kedvezmenyezett > 0
    ) {
      if (member.csaladi.kedvezmenyezett === 1) {
        taxes -= 10000 * member.csaladi.eltartott;
      } else if (member.csaladi.kedvezmenyezett === 2) {
        taxes -= 20000 * member.csaladi.eltartott;
      } else {
        taxes -= 33000 * member.csaladi.eltartott;
      }
    }

    if (taxes < 0) {
      taxes = 0;
    }

    const newMembers = [...members];
    newMembers[activeMember].netSalary = Math.round(member.salary - taxes);
    setMembers(newMembers);
  };

  const contextValues = {
    members,
    activeMember,
    setMembers,
    setactiveMember,
    addMember,
    deleteMember,
    handleNameChange,
    handleSalaryChange,
    handleSalaryChangeByPercent,
    handleSalaryChangeBySlider,
    handleDiscountChange,
    handleCsaladiChange,
    saveMarriedAt,
    eligibleForMarriageDiscount,
    calcNetSalary,
  };

  return (
    <MainContext.Provider value={contextValues}>
      {children}
    </MainContext.Provider>
  );
};
