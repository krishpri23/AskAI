import React, { useEffect, useRef } from "react";
import "./chatpage.css";
import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IKImage } from "imagekitio-react";

const ChatPage = () => {
  const { id } = useParams();
  console.log(id, "id");

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", id],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${id}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  console.log("data from chat id", data);

  return (
    <div className="chatpage">
      {/* To add scroll inside this div */}
      <div className="wrapper">
        <div className="chats">
          {isPending ? (
            "Loading....."
          ) : error ? (
            <p>Something went wrong </p>
          ) : (
            data?.history?.map((msg, i) => {
              console.log(msg.parts[0].text);
              return (
                <>
                  {msg.img && (
                    <IKImage
                      key={i}
                      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                      path={msg.img}
                      width={100}
                      transformation={[{ height: 100, width: 100 }]}
                      loading="lazy"
                      lgip={{ active: true, quality: 20 }}
                    />
                  )}
                  <div
                    className={msg.role === "user" ? "message user" : "message"}
                    key={i}
                  >
                    {msg.parts[0].text}
                  </div>
                </>
              );
            })
          )}
          {/* Should be inside chats only then ref will work  */}
          <NewPrompt data={data} />
        </div>{" "}
      </div>
    </div>
  );
};

export default ChatPage;
