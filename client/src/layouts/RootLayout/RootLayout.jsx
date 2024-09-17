// this is the root file not app.jsx
import "./rootlayout.css";
import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const RootLayout = () => {
  // Import your publishable key
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const queryClient = new QueryClient();

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <QueryClientProvider client={queryClient}>
        <div className="rootlayout">
          <header>
            <Link to="/">
              <div className="logo">
                <img src="/logo.png" alt="logo" />
                <span> ASK AI </span>
              </div>
            </Link>
            <div className="user">
              <SignedOut>
                <SignInButton />
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
