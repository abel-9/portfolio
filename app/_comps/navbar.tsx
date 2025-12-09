"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  Code,
  FolderGit2,
  Mail,
  ProjectorIcon,
} from "lucide-react";

const tabs = [
  { name: "Home", id: "home", href: "/#home", icon: Home },
  { name: "About Me", id: "about", href: "/#about", icon: User },
  { name: "Skills", id: "skills", href: "/#skills", icon: Code },
  {
    name: "Experiance",
    id: "experience",
    href: "/#experience",
    icon: FolderGit2,
  },
  {
    name: "Projects",
    id: "projects",
    href: "/#projects",
    icon: ProjectorIcon,
  },
  { name: "Contact Me", id: "contact", href: "/#contact", icon: Mail },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("home");
  const pathname = usePathname();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveTab(hash);
      } else if (pathname === "/") {
        setActiveTab("home");
      }
    };

    // Initial check
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

  return (
    <nav className="p-4 h-24 bg-transparent">
      <div className="rounded-full m-auto md:w-3/5 lg:w-1/2 w-full  h-full bg-bg shadow-sm">
        <div className="relative flex items-center h-full rounded-full px-4 justify-between">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.href}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex items-center justify-center flex-1 h-2/3 rounded-full text-sm font-medium transition-colors z-10"
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 bg-primary/50 backdrop-blur-xs border border-white/20 rounded-full shadow-sm"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.5,
                  }}
                />
              )}
              <span
                className={`relative z-10 flex items-center justify-center ${
                  tab.id === activeTab ? "opacity-60" : "opacity-100"
                }`}
              >
                <span className="hidden md:inline text-text">{tab.name}</span>
                <tab.icon className="w-5 h-5 md:hidden text-text" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
