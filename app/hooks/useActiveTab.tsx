import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function useActiveTab() {
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

  return { activeTab, setActiveTab };
}
