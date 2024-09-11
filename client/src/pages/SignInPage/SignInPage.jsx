import { SignIn } from "@clerk/clerk-react";
import React from "react";
import "./signinpage.css";

const SignInPage = () => {
  return (
    <div className="signinpage">
      <SignIn path="/signin" signUpUrl="/signup" />
      <h2> sign in page</h2>
    </div>
  );
};

export default SignInPage;
