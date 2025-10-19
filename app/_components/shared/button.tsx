"use client";
import React from "react";
import { HTMLMotionProps, motion } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "rounded";
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const sizes: Record<string, string> = {
    sm: "px-2 py-1 text-sm w-20 rounded-md ",
    md: "px-4 py-2 text-base w-32 rounded-md ",
    lg: "px-6 py-3 text-lg w-40 rounded-md ",
    rounded: "text-md w-10 aspect-square rounded-full",
  };

  const variants: Record<string, string> = {
    primary: `${
      rest.disabled ? "opacity-50 cursor-not-allowed" : ""
    } bg-primary text-text hover:bg-primary/90 hover:text-text shadow-shadow-sm`,
    accent: `${
      rest.disabled ? "opacity-50 cursor-not-allowed" : ""
    } bg-accent text-accent hover:bg-accent/90 hover:text-text shadow-shadow-sm`,
    outline: `${
      rest.disabled ? "opacity-50 cursor-not-allowed" : ""
    } border border-accent text-accent hover:bg-accent hover:text-text`,
    ghost: `${
      rest.disabled ? "opacity-50 cursor-not-allowed" : ""
    } text-accent hover:bg-accent/10 hover:text-accent-foreground`,
  };

  return (
    <motion.button
      type="button"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`font-medium transition-colors duration-200 ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
