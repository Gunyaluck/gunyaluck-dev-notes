import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert ISO 8601 date string to readable format (e.g., "11 September 2024")
 * @param {string} isoDateString - ISO 8601 date string (e.g., "2024-08-21T00:00:00.000Z")
 * @returns {string} - Formatted date string (e.g., "21 August 2024")
 */
export function formatDate(isoDateString: string): string {
  if (!isoDateString) return "";
  
  try {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return isoDateString;
  }
}

