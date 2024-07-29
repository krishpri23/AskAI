import { SignIn } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex justify-center items-center w-full h-1/2 ">
      <SignIn path="/login" signUpUrl="login" />
    </div>
  );
}

export default Login;
