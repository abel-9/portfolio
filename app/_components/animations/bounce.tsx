"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function Bounce() {
  const controller = useAnimation();

  useEffect(() => {
    controller.start({
      y: [0, -30, 0],
      transition: {
        duration: 0.5,
        repeatType: "reverse",
        ease: "easeOut",
      },
      mode: "bounce",
    });
  }, [controller]);

  return <motion.div animate={controller}>A</motion.div>;
}
