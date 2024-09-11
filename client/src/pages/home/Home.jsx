import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const handleClick = async () => {
    await fetch("http://localhost:3000/api/test", {
      credentials: "include",
    });
  };
  return (
    <div className="font-poppins w-full flex flex-col justify-center items-center lg:flex-row text-white ">
      {/* <img
        src="/orbital.png"
        alt="orbit"
        className="absolute top-0 bottom-0 left-0 opacity-30 animate-spin-slow "
      /> */}

      <section className=" px-10 flex flex-col justify-center items-start gap-3 lg:w-1/2  mt-10">
        <h1 className="uppercase text-8xl font-bold tracking-widest bg-gradient-to-r from-blue-400 to-red-800 text-transparent bg-clip-text">
          {" "}
          Ask AI{" "}
        </h1>
        <h3> Supercharge your creativity and productivity </h3>
        <p>
          {" "}
          Lorem ipsum dolor sit, amet cnsectecut adipiching elit, pa=lcsadjf
          sint fosan{" "}
        </p>
        <Link
          className="w-1/3 px-5 py-2 text-center  text-white mt-5 rounded-3xl bg-blue-500 hover:bg-white hover:text-blue-500"
          to={"/dashboard"}
        >
          {" "}
          Get started{" "}
        </Link>
        <button onClick={handleClick}> Test button</button>
      </section>
      <section className="flex-1 flex justify-center items-center mt-10 ">
        <div className="relative bg-indigo-950 rounded-xl w-3/4 flex flex-col justify-center items-center h-72 ">
          <div className=" w-full  h-full overflow-hidden absolute top-0 left-0 ">
            <img
              src="/bg.png"
              alt="celebration"
              className="w-full h-full opacity-25 animate-slide"
            />
          </div>
          <img
            src="/bot.png"
            alt="coding bot"
            className="max-w-80 p-5 object-cover animate-bot"
          />
        </div>
      </section>
    </div>
  );
}

export default Home;
