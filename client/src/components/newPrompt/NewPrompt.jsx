import { useEffect, useRef, useState } from "react";
import "./newprompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import generativeModel from "../../lib/gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const queryClient = useQueryClient();

  const scrollRef = useRef(null);
  const [img, setImg] = useState({
    isLoading: false,
    error: null,
    dbData: {},
    aiData: {},
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [question, answer]);

  // when we send message, we get result from AI in accumulatedText then run this fn, update data in db and revalidate single chat
  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: ({ chat }) => {
      console.log(chat, "received on success");
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          setQuestion("");
          setAnswer("");
          setImg({
            isLoading: false,
            error: null,
            dbData: {},
            aiData: {},
          });
        });
    },
    onError: (err) => {
      console.log(err, "Error in mutation in new prompt");
    },
  });

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

        accumulatedText += chunkText;
        // This will display chunks of text as AI responds rather than showing the entire answer at once
        setAnswer(accumulatedText);
      }
      mutation.mutate();
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
      {answer.length > 1 && answer != undefined ? (
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
