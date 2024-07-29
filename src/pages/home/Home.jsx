import React from "react";

function Home() {
  return (
    <main className="w-full px-10 py-5 flex flex-col justify-center items-center md:flex-row md:justify-between md:items-start">
      <section className="px-5 py-2 flex flex-col justify-center gap-5 items-start text-white">
        <h1 className="uppercase text-3xl font-bold text-blue-600 tracking-widest bg-gradient-to-r from-blue-600 to-red-800 text-transparent bg-clip-text">
          {" "}
          AskAI{" "}
        </h1>
        <h3> Supercharge your creativity and productivity </h3>
        <p> blah blah blah </p>
        <button className="w-1/2 px-5 py-2 bg-white text-slate-800 font-bold rounded-3xl bg-gradient-to-r from-blue-400 to-red-500">
          {" "}
          Get started{" "}
        </button>
      </section>

      <section> sec 2</section>
    </main>
  );
}

export default Home;
