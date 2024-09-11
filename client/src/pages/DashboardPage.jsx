// Main content of the dashboard page with a submit form to ask questions
import { FaArrowUpLong } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import { FaRegImages } from "react-icons/fa6";
import { FaComputer } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (text) => {
      const response = await fetch("http://localhost:3000/api/chats", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      // since the res is send as plain text use .text() and return it

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.text();
    },

    onSuccess: (id) => {
      console.log("id from res", id);
      // invalidate and refetch chatlist on the sidebar
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
    onError: (error) => {
      console.error(error, "Error creating chat");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;
    mutation.mutate(text);
  };

  return (
    <section className="relative w-full  flex flex-col  bg-slate-900 text-white ">
      {/* logo and create chat links */}
      <div className="flex-grow flex flex-col justify-center items-center">
        {/* <img src="" alt="" />  */}
        <h1 className="uppercase text-8xl font-bold tracking-widest bg-gradient-to-r from-blue-400 to-red-800 text-transparent bg-clip-text">
          Ask AI
        </h1>
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
          onSubmit={handleSubmit}
          className="w-3/4 rounded-xl bg-slate-700 text-slate-300 flex items-center "
        >
          <input
            className="w-full px-10 py-3 outline-none border-none bg-transparent"
            placeholder="Ask me anything..."
            name="text"
          />
          <button
            className="rounded-full bg-slate-100 p-2 text-slate-900 mr-2"
            // onClick={handleSubmit}
          >
            {" "}
            <FaArrowUpLong />
          </button>
        </form>
      </div>
    </section>
  );
}

export default DashboardPage;
