import { SignUp } from "@clerk/clerk-react";
import React from "react";

function Signup() {
  return (
    <div className="flex justify-center items-center w-full h-1/2 ">
      <SignUp path="/signup" signInUrl="login" />
    </div>
  );
}

export default Signup;
