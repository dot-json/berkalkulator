import * as React from "react";

import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "placeholder:text-muted-neutral-200 flex h-10 w-full rounded-md border border-gray-400 bg-gray-100/50 px-3 py-2 text-sm outline-transparent transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-gray-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
