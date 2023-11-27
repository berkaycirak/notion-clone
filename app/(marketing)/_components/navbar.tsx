"use client";
import useScrollTop from "@/hooks/useScrollTop";
import React from "react";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
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
        {isLoading && (
          <>
            <Button variant="ghost" size="sm" disabled>
              Sign in
            </Button>
            <Button size="sm" disabled>
              Get Notion Free
            </Button>
          </>
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">Get Notion Free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm">
              <Link href="/documents">Enter Notion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}

        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navbar;
