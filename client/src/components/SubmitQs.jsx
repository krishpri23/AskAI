// This is a new prompt component where user can ask question

import { useEffect, useRef, useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import Upload from "./Upload";
import { IKImage } from "imagekitio-react";
import model from "../lib/Gemini";
import Markdown from "react-markdown";

function SubmitQs() {
  const endRef = useRef(null);

  //  Using this variable, we can display them on the left/right side of the screen
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Send this fn to upload component to save the response object
  const [imgInfo, setImgInfo] = useState({
    isLoading: false,
    dbData: {},
    error: "",
    aiData: {}, // ai response
  });

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question, answer, imgInfo.dbData]);

  const chat = model.startChat({
    // roles can't be changed. either user or model, use this history in chat model
    history: [
      // {
      //   role: "user",
      //   parts: [{ text: "Write me a story" }],
      // },
      // {
      //   role: "model",
      //   parts: [{ text: "Great to meet you. What would you like to know?" }],
      // },
    ],
    generationConfig: {
      // maxOutputTokens: 100,
    },
  });

  // Using GeminiAPI, we are generating response
  const add = async (prompt) => {
    setQuestion(prompt);

    const result = await chat.sendMessageStream(
      Object.entries(imgInfo.aiData).length
        ? [prompt, imgInfo.aiData]
        : [prompt]
    );

    let accumulatedText = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      accumulatedText += chunkText;
      console.log(accumulatedText, "acc text");

      setAnswer(accumulatedText);
    }
    setImgInfo({ isLoading: false, error: "", dbData: {}, aiData: {} });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    add(text);
    e.target.text.value = "";
  };

  return (
    <>
      <div className="flex flex-col">
        {question && <div className="user"> {question} </div>}
        {answer && (
          <div className="response">
            {" "}
            <Markdown>{answer}</Markdown>{" "}
          </div>
        )}
      </div>

      {imgInfo?.isLoading && <span> Loading...</span>}
      {imgInfo?.dbData && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={imgInfo?.dbData?.filePath}
          width={100}
        />
      )}
      {/* To scroll down automatically on refresh */}
      <div ref={endRef} />

      <form
        action=""
        onSubmit={handleSubmit}
        className="w-full rounded-xl bg-slate-600 text-slate-300 flex items-center my-5 "
      >
        <Upload setImgInfo={setImgInfo} />

        <input
          type="text"
          name="text"
          className="w-full px-2 py-3 outline-none border-none bg-transparent"
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
