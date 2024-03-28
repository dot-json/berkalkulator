import { cn } from "../../lib/utils";
import Add from "./icons/Add";
import Minus from "./icons/Minus";

const PlusMinus = ({ type, value, setValue, max }) => {
  return (
    <div className={cn("flex items-center gap-2")}>
      <button
        type="button"
        onClick={() => value > 0 && setValue(type, value - 1)}
        className={cn("size-4 rounded-full border border-gray-400 bg-gray-300")}
      >
        <Minus />
      </button>
      <span className={cn("min-w-5 select-none text-center font-semibold")}>
        {value}
      </span>
      <button
        type="button"
        onClick={() =>
          max === undefined
            ? setValue(type, value + 1)
            : setValue(type, max > value ? value + 1 : value)
        }
        className={cn("size-4 rounded-full border border-gray-400 bg-gray-300")}
      >
        <Add />
      </button>
    </div>
  );
};

export default PlusMinus;
