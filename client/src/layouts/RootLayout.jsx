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

// react query
const queryClient = new QueryClient();

// Import your clerk publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/ ">
      <QueryClientProvider client={queryClient}>
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
          <main className="flex-1 bg-slate-950  text-slate-300">
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default RootLayout;
