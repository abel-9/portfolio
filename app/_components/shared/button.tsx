"use client";
import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
}: ButtonProps) {
  const sizes: Record<string, string> = {
    sm: "px-2 py-1 text-sm w-20",
    md: "px-4 py-2 text-base w-32",
    lg: "px-6 py-3 text-lg w-40",
  };

  const variants: Record<string, string> = {
    primary:
      "bg-primary text-text hover:bg-primary/90 hover:text-text shadow-shadow-sm",
    accent:
      "bg-accent text-accent hover:bg-accent/90 hover:text-text shadow-shadow-sm",
    outline: "border border-accent text-accent hover:bg-accent hover:text-text",
    ghost: "text-accent hover:bg-accent/10 hover:text-accent-foreground",
  };

  return (
    <motion.button
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`rounded-md font-medium transition-colors duration-200 ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
