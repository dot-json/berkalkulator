import { cn, formatToFt } from "../../lib/utils";
import { useMainContext } from "../MainContextProvider";

const HouseholdSummary = () => {
  const { members } = useMainContext();

  return (
    <div
      className={cn(
        "flex flex-col gap-8 rounded-lg border border-gray-300 bg-gray-200/50 p-4",
      )}
    >
      <h1 className={cn("text-2xl font-medium uppercase")}>
        háztartás összesített jövedelme
      </h1>
      <div
        className={cn(
          "w-full rounded-md border border-gray-400/50 bg-gray-200/75",
        )}
      >
        <table className={cn("w-full border-collapse")}>
          <thead className={cn("border-b border-b-gray-400/50")}>
            <tr>
              <th className={cn("w-1/2 px-2 py-1 text-start font-normal")}>
                Családtag
              </th>
              <th className={cn("w-1/2 px-2 py-1 text-start font-normal")}>
                Nettó bér
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index} className={cn("border-b border-b-gray-400/50")}>
                <td className={cn("w-1/2 px-2 py-1 text-sm font-light")}>
                  {member.name}
                </td>
                <td className={cn("w-1/2 px-2 py-1 text-sm font-light")}>
                  {formatToFt(member.netSalary)}
                </td>
              </tr>
            ))}
            <tr>
              <td className={cn("w-1/2 px-2 py-1")}>Összesen</td>
              <td className={cn("w-1/2 px-2 py-1")}>
                {formatToFt(
                  members.reduce((acc, member) => acc + member.netSalary, 0),
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HouseholdSummary;
