"use client";
import useScrollTop from "@/hooks/useScrollTop";
import React from "react";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

const Navbar = () => {
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6 ",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="flex w-full md:justify-end justify-between items-center gap-x-2">
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navbar;
