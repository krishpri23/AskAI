import { useEffect, useRef } from "react";
import { FaArrowUpLong, FaPaperclip } from "react-icons/fa6";

function SubmitQs() {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* To scroll down automatically on refresh */}
      <div ref={endRef} />
      <form
        action=""
        className="w-full rounded-xl bg-slate-600 text-slate-300 flex items-center my-5 "
      >
        <button className="icon-btn ml-2">
          <FaPaperclip />
        </button>
        <input
          className="w-full px-10 py-3 outline-none border-none bg-transparent"
          placeholder="Ask me anything..."
        />
        <button className="icon-btn">
          {" "}
          <FaArrowUpLong />
        </button>
      </form>
    </>
  );
}

export default SubmitQs;
