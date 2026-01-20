import { forwardRef } from "react";

/**
 * Button component that supports multiple variants and styles
 * @param {string} variant - Button variant: "primary" | "secondary" | "outline" | "text" | "icon" | "menu" | "upload" | "close" | "close-dark"
 * @param {string} size - Button size: "sm" | "md" | "lg" | "full" | "icon" | "icon-lg" | "auto"
 * @param {React.ReactNode} children - Button content
 * @param {string} className - Additional CSS classes
 * @param {boolean} disabled - Disabled state
 * @param {function} onClick - Click handler
 * @param {string} type - Button type: "button" | "submit" | "reset"
 * @param {string|number} width - Custom width (e.g., "121", "141", "full")
 * @param {object} ...props - Other button props
 */
export const Button = forwardRef(({
  variant = "primary",
  size = "md",
  children,
  className = "",
  disabled = false,
  onClick,
  type = "button",
  width,
  ...props
}, ref) => {
  // Base classes
  const baseClasses = "transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Variant classes
  const variantClasses = {
    primary: "bg-brown-600 text-white rounded-full hover:bg-brown-500 body-1-white",
    secondary: "bg-brown-600 text-white rounded-full hover:bg-brown-200 hover:text-brown-600 body-1-white",
    outline: "border border-brown-400 bg-transparent text-brown-600 rounded-full hover:bg-brown-600 hover:text-white body-1-brown-600",
    text: "body-1-brown-500 hover:text-brown-600 underline bg-transparent border-none p-0",
    icon: "flex items-center justify-center rounded-full bg-white border border-brown-300 hover:bg-brown-100",
    "icon-notification": "flex items-center justify-center rounded-full bg-white border border-brown-300 hover:bg-brown-100",
    menu: "w-full flex items-center gap-3 px-4 py-3 hover:bg-brown-300 text-left body-1-brown-600",
    upload: "px-6 py-2 bg-white border border-brown-300 rounded-full body-1-brown-600 hover:bg-brown-100",
    close: "p-1 hover:bg-white/20 rounded-full shrink-0",
    "close-dark": "p-2 hover:bg-brown-100 rounded-full",
    hamburger: "w-[18px] h-[12px] flex flex-col items-center justify-between cursor-pointer bg-transparent border-none p-0",
  };
  
  // Size classes
  const sizeClasses = {
    sm: "h-10 px-4 py-2",
    md: "h-12",
    lg: "h-[48px]",
    full: "w-full h-[48px] px-6 py-3",
    icon: "w-10 h-10",
    "icon-lg": "w-12 h-12",
    auto: "",
  };
  
  // Width classes for specific buttons
  const widthClasses = {
    "121": "w-[121px]",
    "127": "w-[127px]",
    "141": "w-[141px]",
    "154": "w-[154px]",
    "161": "w-[161px]",
    "185": "w-[185px] lg:w-[185px]",
    "207": "w-[207px]",
    "120": "w-[120px] lg:w-auto",
    full: "w-full",
  };
  
  // Padding classes based on variant and size
  // If width is specified, use flex centering instead of padding
  const paddingClasses = {
    primary: !width 
      ? (size === "md" ? "px-6 py-3" : size === "lg" ? "px-10 py-3" : "px-6 py-3")
      : (size === "lg" ? "px-6 py-2 flex items-center justify-center" : "px-6 py-2 flex items-center justify-center"),
    secondary: !width 
      ? (size === "md" ? "px-6 py-3" : size === "lg" ? "px-10 py-3" : "px-6 py-3")
      : (size === "lg" ? "px-6 py-2 flex items-center justify-center" : "px-6 py-2 flex items-center justify-center"),
    outline: !width 
      ? (size === "md" ? "px-6 py-3" : size === "lg" ? "px-10 py-3" : "px-6 py-3")
      : (size === "lg" ? "px-6 py-2 flex items-center justify-center" : "px-6 py-2 flex items-center justify-center"),
    text: "",
    icon: "",
    "icon-notification": "",
    menu: "",
    upload: "",
    close: "",
    "close-dark": "",
    hamburger: "w-[18px] h-[12px]",
  };
  
  // Combine classes
  let combinedClasses = baseClasses;
  
  // Add variant classes
  combinedClasses += ` ${variantClasses[variant] || variantClasses.primary}`;
  
  // Add size classes (skip if variant has specific sizing)
  if (!["icon", "icon-notification", "hamburger", "close", "close-dark"].includes(variant)) {
    combinedClasses += ` ${sizeClasses[size] || sizeClasses.md}`;
  }
  
  // Add padding classes
  if (paddingClasses[variant]) {
    combinedClasses += ` ${paddingClasses[variant]}`;
  }
  
  // Add width classes
  if (width) {
    combinedClasses += ` ${widthClasses[width] || ""}`;
  }
  
  // Add custom className
  if (className) {
    combinedClasses += ` ${className}`;
  }
  
  // Clean up extra spaces
  combinedClasses = combinedClasses.trim().replace(/\s+/g, " ");
  
  return (
    <button
      ref={ref}
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
