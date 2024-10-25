import { SignIn } from "@clerk/clerk-react";
import React from "react";
import "./signinpage.css";

const SignInPage = () => {
  return (
    <div className="signinpage">
      <h2> Sign In </h2>
      <SignIn
        path="/signin"
        signUpUrl="/signup"
        forceRedirectUrl="/dashboard"
      />
      
    </div>
  );
};

export default SignInPage;
