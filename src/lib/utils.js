import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast, Zoom } from "react-toastify";

export const MINIMAL_BER = 177400;

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatToFt(value) {
  return `${value.toLocaleString()} Ft`;
}

export const emitToast = (message, type = "success") => {
  const options = {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
  };
  switch (type) {
    case "success":
      return toast.success(message, options);
    case "error":
      return toast.error(message, options);
    case "warn":
      return toast.warn(message, options);
    case "info":
      return toast.info(message, options);
    default:
      return toast(message, options);
  }
};
