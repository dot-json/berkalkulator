import { useState, useEffect } from "react";
import { cn, formatToFt } from "../../lib/utils";
import { useMainContext } from "../MainContextProvider";
import { Input } from "../atom/Input";
import { Slider } from "../atom/Slider";
import { Switch } from "../atom/Switch";
import { Dialog } from "../atom/Dialog";

import Trash from "../atom/icons/Trash";
import { Button } from "../atom/Button";
import PlusMinus from "../atom/PlusMinus";
import MarriageEligible from "../MarriageEligible";

const SalaryCalculator = () => {
  const {
    members,
    activeMember,
    handleDiscountChange,
    handleNameChange,
    handleSalaryChange,
    handleSalaryChangeByPercent,
    handleSalaryChangeBySlider,
    handleCsaladiChange,
    deleteMember,
    saveMarriedAt,
  } = useMainContext();
  const [marriedAtOpen, setMarriedAtOpen] = useState(false);
  const [marriedAtValid, setMarriedAtValid] = useState("unchanged");
  const [marriedAt, setMarriedAt] = useState("");

  const percentButtons = [
    { value: 0.99, label: "-1%" },
    { value: 0.95, label: "-5%" },
    { value: 1.01, label: "+1%" },
    { value: 1.05, label: "+5%" },
  ];

  const discounts = [
    { label: "25 év alattiak SZJA mentessége", key: "szja_mentesseg" },
    { label: "Friss házasok kedvezménye", key: "friss_hazasok" },
    { label: "Személyi adókedvezmény", key: "szemelyi_adokedvezmeny" },
    { label: "Családi kedvezmény", key: "csaladi_kedvezmeny" },
  ];

  const validateMarriedAt = (date) => {
    const pattern = /^\d{4}\/(0?[1-9]|1[0-2])\/(0?[1-9]|[1-2][0-9]|3[0-1])$/;
    if (pattern.test(date) && new Date(date) < new Date()) {
      setMarriedAtValid("valid");
    } else {
      setMarriedAtValid("invalid");
    }
  };

  const handleMarriedAtChange = (e) => {
    validateMarriedAt(e.target.value);
    setMarriedAt(e.target.value);
  };

  useEffect(() => {
    if (!members[activeMember]) return;
    setMarriedAt(members[activeMember].marriedAt || "");
  }, [activeMember, marriedAtOpen]);

  if (members.length === 0)
    return (
      <div
        className={cn(
          "flex flex-col gap-4 rounded-lg border border-gray-300 bg-gray-200/50 p-4",
        )}
      >
        <h1 className={cn("text-2xl font-medium uppercase")}>
          Családtag hozzáadása
        </h1>
        <p className={cn("font-light")}>
          A családtag hozzáadásával tudod számolni a nettó bért.
        </p>
      </div>
    );

  return (
    <>
      <div
        className={cn(
          "flex flex-col gap-4 rounded-lg border border-gray-300 bg-gray-200/50 p-4",
        )}
      >
        <div className={cn("flex items-center justify-between")}>
          <h1 className={cn("text-2xl font-medium uppercase")}>
            {members[activeMember].name} bérének kiszámítása
          </h1>
          <div
            className={cn(
              "size-8 cursor-pointer rounded-md p-1 transition-colors hover:bg-red-500 hover:text-gray-100",
            )}
            onClick={() => deleteMember(activeMember)}
          >
            <Trash />
          </div>
        </div>
        <div className={cn("flex max-w-96 flex-col gap-1")}>
          <p className={cn("font-light")}>Családtag neve</p>
          <Input
            placeholder="Cool Name"
            type="text"
            value={members[activeMember].name}
            onChange={handleNameChange}
          />
        </div>
        <div className={cn("flex max-w-96 flex-col gap-1")}>
          <p className={cn("font-light")}>Bruttó bér</p>
          <Input
            placeholder="250 000 Ft"
            type="number"
            value={members[activeMember].salary}
            onChange={handleSalaryChange}
          />
        </div>
        <Slider
          defaultValue={[177400]}
          max={9999999}
          step={1}
          className={cn("max-w-96")}
          value={[members[activeMember].salary]}
          onValueChange={(value) => handleSalaryChangeBySlider(value[0])}
        />
        <div className={cn("flex w-full max-w-96 gap-2")}>
          {percentButtons.map((button) => (
            <button
              key={button.label}
              type="button"
              className={cn(
                "w-full rounded-md border border-gray-400 bg-gray-200/50 py-2 font-medium transition-colors hover:border-primary hover:bg-primary hover:text-gray-100",
              )}
              onClick={() => handleSalaryChangeByPercent(button.value)}
            >
              {button.label}
            </button>
          ))}
        </div>
        <div className={cn("mt-2 flex flex-col gap-2")}>
          <h2 className={cn("mb-1 text-xl font-medium uppercase")}>
            Kedvezmények
          </h2>
          {discounts.map((discount) => (
            <div
              key={discount.label}
              className={cn("flex flex-wrap items-center gap-2")}
            >
              <Switch
                checked={members[activeMember].discounts[discount.key]}
                onCheckedChange={() => handleDiscountChange(discount.key)}
              />
              <p
                className={cn("cursor-pointer select-none font-light")}
                onClick={() => handleDiscountChange(discount.key)}
              >
                {discount.label}
              </p>
              {discount.key === "friss_hazasok" &&
                members[activeMember].discounts["friss_hazasok"] && (
                  <MarriageEligible setMarriedAtOpen={setMarriedAtOpen} />
                )}
              {discount.key === "csaladi_kedvezmeny" &&
                members[activeMember].discounts["csaladi_kedvezmeny"] && (
                  <div className={cn("flex gap-2")}>
                    <PlusMinus
                      type={"eltartott"}
                      value={members[activeMember].csaladi.eltartott}
                      setValue={handleCsaladiChange}
                    />
                    <span>Eltartott, ebből kedvezményezett:</span>
                    <PlusMinus
                      type={"kedvezmenyezett"}
                      value={members[activeMember].csaladi.kedvezmenyezett}
                      setValue={handleCsaladiChange}
                      max={members[activeMember].csaladi.eltartott}
                    />
                  </div>
                )}
            </div>
          ))}
        </div>
        <hr className={cn("my-2 border-t-gray-400")} />
        <div className={cn("flex flex-col gap-2")}>
          <h2 className={cn("text-xl font-medium uppercase")}>
            Számított nettó bér
          </h2>
          <p className={cn("text-4xl font-bold")}>
            {formatToFt(members[activeMember].netSalary)}
          </p>
        </div>
      </div>
      <Dialog
        open={marriedAtOpen}
        setOpen={setMarriedAtOpen}
        title="Dátum megadása"
      >
        <p className={cn("text-xs text-gray-500")}>
          A kedvezmény először a házasságkötés követő hónapra vehető igénybe és
          a házassági életközösség alatt legfeljebb 24 hónapon keresztül jár.
        </p>
        <div className={cn("flex max-w-96 flex-col gap-1")}>
          <p className={cn("font-medium")}>Add meg a házasság dátumát</p>
          <Input
            placeholder="YYYY/MM/DD"
            onChange={handleMarriedAtChange}
            value={marriedAt}
            className={cn(
              "border-gray-400 bg-gray-200/50 px-2 py-1",
              marriedAtValid === "invalid" && "!border-red-500 !bg-red-500/10",
              marriedAtValid === "valid" &&
                "!border-green-500 !bg-green-500/10",
            )}
          />
        </div>
        <Button
          variant="default"
          size="default"
          className={cn("w-fit")}
          disabled={marriedAtValid !== "valid"}
          onClick={() => {
            saveMarriedAt(marriedAt);
            setMarriedAtOpen(false);
          }}
        >
          Mentés
        </Button>
      </Dialog>
    </>
  );
};

export default SalaryCalculator;
