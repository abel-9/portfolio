"use client";
import { Box, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const navItems = [
    { href: "#about", label: "About Me" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 bg-bg p-2 shadow-sm flex flex-col gap-2">
      <div className="flex justify-between items-center mx-auto w-[90%]">
        <div className="flex items-center gap-2">
          <Box className="text-primary h-6 w-6" />
          <span className="font-semibold text-primary">Abel Girmay</span>
        </div>
        <div className="max-md:hidden flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative font-semibold text-accent w-24 text-center hover:bg-bg-light hover:shadow-xs p-2 rounded-xl"
            >
              <div className="hidden absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              {item.label}
            </a>
          ))}
        </div>
        <div
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
          className="flex"
        >
          <Menu className="md:hidden text-accent h-6 w-6" />
        </div>
      </div>
      <div className="bg-bg-dark/50 rounded-xl">
        {!isCollapsed && (
          <div className="flex flex-col gap-2 md:hidden mx-auto w-[90%]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative font-semibold text-accent hover:bg-bg-light hover:shadow-xs p-2 rounded-xl"
              >
                <div className="hidden absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
