"use client";
import { useAnimation } from "framer-motion";

const popUpVariant = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1.2,
    transition: { duration: 1 },
  },
};

export default function usePopup() {
  const controller = useAnimation();
  const handleViewPortEnter = () => {
    console.log("Entered viewport");
    controller.start("visible");
  };

  const handleViewPortLeave = () => {
    controller.start("hidden");
  };

  return {
    handleViewPortEnter,
    handleViewPortLeave,
    popUpVariant,
    controller,
  };
}
