import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Address } from "./zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to get addresses from localStorage
export const getStoredAddresses = (): Address[] => {
  if (typeof window !== "undefined") {
    const storedAddresses = localStorage.getItem("addresses");
    return storedAddresses ? JSON.parse(storedAddresses) : [];
  }
  return [];
};

// Utility function to save addresses to localStorage
export const saveAddressesToStorage = (addresses: Address[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }
};
