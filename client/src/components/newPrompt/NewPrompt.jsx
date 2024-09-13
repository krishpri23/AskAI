import { useEffect, useRef } from "react";
import "./newprompt.css";

const NewPrompt = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      console.log(scrollRef.current);
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      {/* add new chat */}
      TEST
      <div ref={scrollRef} className="endChat"></div>
      <form className="newForm">
        <label htmlFor="fileInput">
          <img className="attachment" src="/attachment.png" alt="attachment" />
        </label>
        <input
          type="file"
          name="fileInput"
          id="fileInput"
          multiple={false}
          hidden
        />
        <input type="text" placeholder="Ask me anything" />
        <button>
          <img src="/arrow.png" alt="send" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
