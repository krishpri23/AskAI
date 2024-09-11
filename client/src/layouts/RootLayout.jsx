import { ClerkProvider } from "@clerk/clerk-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

function RootLayout() {
  // react query
  const queryClient = new QueryClient();

  // Import your clerk publishable key
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    return (
      <div className="bg-red-300 p-10 mx-auto">
        <h2> Missing publishable key </h2>
      </div>
    );
    // throw new Error("Missing Publishable Key");
  }
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/ ">
      <QueryClientProvider client={queryClient}>
        <main className="flex flex-col min-h-screen bg-slate-950 text-slate-300">
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
          {/* takes the rest of space */}
          <div className="flex-1">
            <Outlet />
          </div>
        </main>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default RootLayout;
