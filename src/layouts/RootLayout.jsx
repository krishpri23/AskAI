import { ClerkProvider } from "@clerk/clerk-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/ ">
      <div className="min-h-screen flex flex-col">
        <header className="p-4 flex justify-between bg-slate-950 text-slate-300 font-bold">
          <Link to="/">
            <span>AskAI</span>
          </Link>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <main className="flex-grow bg-slate-950  text-slate-300">
          <Outlet />
        </main>
      </div>
    </ClerkProvider>
  );
}

export default RootLayout;
