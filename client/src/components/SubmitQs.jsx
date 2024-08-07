// This is a new prompt component where user can ask question

import { useEffect, useRef, useState } from "react";
import { FaArrowUpLong } from "react-icons/fa6";
import Upload from "./Upload";
import { IKImage } from "imagekitio-react";
import model from "../lib/Gemini";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Markdown from "react-markdown";

function SubmitQs({ data }) {
  const endRef = useRef(null);
  const queryClient = useQueryClient();

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

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/chats/${data._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: question.length ? question : undefined,
            answer: answer,
            img: imgInfo.dbData?.filePath || undefined,
          }),
        }
      );

      // since the res is send as plain text use .text() and return it

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.text();
    },

    onSuccess: (id) => {
      console.log("id from res", id);
      // invalidate and refetch chatlist on chat page
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          setQuestion("");
          setAnswer("");
          setImgInfo({
            isLoading: false,
            dbData: {},
            error: "",
            aiData: {}, // ai response
          });
        });
    },
    onError: (error) => {
      console.error(error, "Error creating chat");
    },
  });

  const chat = model.startChat({
    // roles can't be changed. either user or model, use this history in chat model
    history: [
      // data?.history.map(({ role, parts }) => ({
      //   role,
      //   parts: [{ text: parts[0].text }],
      // })),
    ],
    generationConfig: {
      // maxOutputTokens: 100,
    },
  });

  // Using GeminiAPI, we are generating response
  const add = async (prompt) => {
    setQuestion(prompt);
    try {
      const result = await chat.sendMessageStream(
        Object.entries(imgInfo.aiData).length
          ? [imgInfo.aiData, prompt]
          : [prompt]
      );

      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
      }
      mutation.mutate();
    } catch (error) {
      console.log(error);
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
      {imgInfo?.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={imgInfo?.dbData?.filePath}
          width={100}
          transformation={[{ width: 100 }]}
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
