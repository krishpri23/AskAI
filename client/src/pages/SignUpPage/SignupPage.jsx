import { SignUp } from "@clerk/clerk-react";
import React from "react";

const SignupPage = () => {
  return (
    <div className="signuppage">
      <SignUp path="/signup" signInUrl="signin" />
    </div>
  );
};

export default SignupPage;
