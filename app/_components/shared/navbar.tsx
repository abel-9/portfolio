"use client";
import { Box, Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const controller = useAnimation();

  const navItems = [
    { href: "#about", label: "About Me" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed w-full top-0 z-20 bg-bg p-1 shadow-sm flex flex-col gap-2">
      <div className="flex justify-between items-center mx-auto w-[90%]">
        <div className="flex items-center gap-2">
          <motion.span
            animate={controller}
            onMouseEnter={() => {
              controller.start({
                rotate: 360,
                transition: {
                  duration: 0.7,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                },
              });
            }}
            onMouseLeave={() => {
              controller.stop(); // ✋ stops immediately
              controller.set({ rotate: 0 }); // reset angle (optional)
            }}
          >
            <Box className="text-primary h-6 w-6" />
          </motion.span>
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
          className="flex md:hidden"
        >
          {isCollapsed ? (
            <Menu className="text-accent h-6 w-6" />
          ) : (
            <X className="text-accent h-6 w-6" />
          )}
        </div>
      </div>
      <div className=" bg-bg-dark/50 rounded-xl">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col gap-2 md:hidden mx-auto w-[90%]"
            >
              {navItems.map((item) => (
                <a
                  onClick={() => setIsCollapsed(true)}
                  key={item.href}
                  href={item.href}
                  className="relative font-semibold text-accent text-sm hover:bg-bg-light hover:shadow-xs p-2 rounded-xl"
                >
                  <div className="hidden absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
