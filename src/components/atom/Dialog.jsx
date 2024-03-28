import { Cross2Icon } from "@radix-ui/react-icons";

import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const Dialog = ({ open, setOpen, title, children }) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className={cn("fixed inset-0 z-50 bg-black/10 backdrop-blur-md")}
            onClick={() => setOpen(false)}
          />
          <motion.div
            key="dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className={cn(
              "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border border-gray-400/50 bg-gray-200 p-6 shadow-lg duration-200 sm:rounded-lg",
            )}
          >
            <div className={cn("flex items-center justify-between gap-4")}>
              <h1
                className={cn(
                  "tracking-tigh text-lg font-semibold leading-none",
                )}
              >
                {title}
              </h1>
              <button
                className={cn(
                  "text-muted-natural-200 opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none",
                )}
                onClick={() => setOpen(false)}
              >
                <Cross2Icon className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export { Dialog };
