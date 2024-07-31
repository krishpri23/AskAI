// Main content of the dashboard page with a submit form to ask questions
import { FaArrowUpLong } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import { FaRegImages } from "react-icons/fa6";
import { FaComputer } from "react-icons/fa6";

function DashboardPage() {
  return (
    <section className="relative w-full flex flex-col min-h-screen bg-slate-900 text-white p-5 ">
      {/* logo and create chat links */}
      <div className="flex-1 flex flex-col justify-center items-center">
        {/* <img src="" alt="" />  */}
        <h1 className="name">Ask AI</h1>
        <div className="flex justify-center items-center py-5 gap-10">
          <div className="ring-1 ring-slate-500 rounded-xl px-8 py-5 flex flex-col justify-center items-center">
            <FaCirclePlus className="w-10 h-7 my-2 text-slate-500 " />
            <span>Create a new chat</span>
          </div>
          <div className="ring-1 ring-slate-500 rounded-xl px-8 py-5 flex flex-col justify-center items-center">
            <FaRegImages className="w-10 h-7 my-2 text-slate-500" />
            <span> Analyze images </span>
          </div>
          <div className="ring-1 ring-slate-500 rounded-xl px-8 py-5 flex flex-col justify-center items-center">
            <FaComputer className="w-10 h-7 my-2 text-slate-500" />
            <span>Help me with code </span>
          </div>
        </div>
      </div>

      <div className=" mt-auto w-full flex justify-center mb-10 ">
        <form
          action=""
          className="w-3/4 rounded-xl bg-slate-700 text-slate-300 flex items-center "
        >
          <input
            className="w-full px-10 py-3 outline-none border-none bg-transparent"
            placeholder="Ask me anything..."
          />
          <button className="rounded-full bg-slate-100 p-2 text-slate-900 mr-2">
            {" "}
            <FaArrowUpLong />
          </button>
        </form>
      </div>
    </section>
  );
}

export default DashboardPage;
