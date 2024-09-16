import { useEffect, useRef, useState } from "react";
import "./newprompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import generativeModel from "../../lib/gemini";
import Markdown from "react-markdown";

const NewPrompt = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const scrollRef = useRef(null);
  const [img, setImg] = useState({
    isLoading: false,
    error: null,
    dbData: {},
    aiData: {},
  });

  console.log(img?.aiData, " image data ");

  useEffect(() => {
    if (scrollRef.current) {
      console.log(scrollRef.current);
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [question, answer]);

  // To store chat history
  const chat = generativeModel.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });

  const add = async (text) => {
    if (!text) return;

    try {
      setQuestion(text);

      // This makes sure AI response is sent as streams
      const result = await chat.sendMessageStream(
        Object.entries(img?.aiData).length ? [img.aiData, text] : [text]
      );

      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        accumulatedText += chunkText;
        // This will display chunks of text as AI responds rather than showing the entire answer at once
        setAnswer(accumulatedText);
      }

      setImg({
        isLoading: false,
        error: null,
        dbData: {},
        aiData: {},
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // text represents the input name
    const question = e.target.text.value;
    add(question);
    e.target.text.value = "";
  };

  return (
    <>
      {/* add new chat */}
      {img?.isLoading && <div>Loading....</div>}
      {img?.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGEKIT_ENDPOINT}
          path={img?.dbData?.filePath}
          width={100}
          transformation={[
            {
              height: 100,
              width: 100,
            },
          ]}
        />
      )}
      {question && <div className="message user"> {question}</div>}
      {answer.length > 1 || answer != undefined ? (
        <div className="message">
          {" "}
          <Markdown>{answer}</Markdown>
        </div>
      ) : null}
      <div ref={scrollRef} className="endChat"></div>
      <form className="newForm" onSubmit={handleSubmit}>
        <Upload setImg={setImg} />
        <input
          type="file"
          name="fileInput"
          id="fileInput"
          multiple={false}
          hidden
        />
        <input
          className="input-box"
          type="text"
          name="text"
          placeholder="Ask me anything"
        />
        <button>
          <img src="/arrow.png" alt="send" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
