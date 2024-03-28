import { cn } from "../../lib/utils";
import { useMainContext } from "../MainContextProvider";
import Add from "../atom/icons/Add";

const FamilyMemberTabs = () => {
  const { members, activeMember, setactiveMember, addMember } =
    useMainContext();

  return (
    <div className={cn("flex gap-4")}>
      {members.length > 0 && (
        <div className={cn("flex w-fit flex-wrap items-center gap-2")}>
          {members.map((member, index) => (
            <div
              key={index}
              className={cn(
                "flex h-12 items-center justify-center rounded-md border border-gray-300 px-3 text-gray-50 transition-colors duration-150 ease-in-out",
                activeMember === index && "border-primary bg-primary",
                activeMember !== index &&
                  "cursor-pointer bg-gray-200/50 text-gray-700 hover:bg-gray-300",
              )}
              onClick={() => setactiveMember(index)}
            >
              <p className={cn("select-none text-xl font-medium")}>
                {member.name}
              </p>
            </div>
          ))}
        </div>
      )}
      <button
        type="button"
        className={cn(
          "size-12 rounded-md border border-gray-300 bg-gray-200/50 p-1 transition-colors duration-150 ease-in-out hover:bg-neutral-300",
        )}
        onClick={addMember}
      >
        <Add />
      </button>
    </div>
  );
};

export default FamilyMemberTabs;
