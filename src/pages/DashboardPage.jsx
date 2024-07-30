// Main content of the dashboard page with a submit form to ask questions

function DashboardPage() {
  return (
    <section className="relative w-full flex flex-col min-h-screen bg-indigo-900 text-white p-5 ">
      {/* logo and create chat links */}
      <div className="flex-grow flex flex-col justify-center items-center">
        {/* <img src="" alt="" />  */}
        <h1 className="name">Ask AI</h1>
        <div className="flex justify-center items-center py-5 gap-10">
          <button>create chat</button>
          <button>chat 2</button>
          <button>chat 3</button>
        </div>
      </div>

      <div className=" mt-auto w-full flex justify-center debug-overflow">
        <input
          className="w-full px-10 py-2 rounded-xl bg-slate-100 text-slate-800 outline-none"
          placeholder="Type here..."
        />
      </div>
    </section>
  );
}

export default DashboardPage;
