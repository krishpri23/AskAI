import { useLocation } from "react-router-dom";
import SubmitQs from "../../components/SubmitQs";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";

// shows single chat details
function ChatPage() {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  console.log("DATA FOR CHAT PAGE", data);

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center bg-slate-900  ">
      <div className="relative w-3/4 flex-1 flex flex-col space-y-5 overflow-y-auto px-10 py-5">
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong"
          : data &&
            data?.history?.map((message, i) => (
              <>
                {message.img && (
                  <IKImage
                    urlEndpoint={import.meta.VITE_IMAGE_KIT_ENDPOINT}
                    height={200}
                    width={300}
                    transformation={[{ height: 200, width: 300 }]}
                    loading="lazy"
                    // low quality image
                    lqip={{ active: true, quality: 20 }}
                  />
                )}
                <div
                  key={i}
                  className={message.role === "user" ? "user" : "model"}
                >
                  <Markdown>{message?.parts[0]?.text}</Markdown>
                </div>
              </>
            ))}
      </div>

      {/* To Prevent rendering the form component whenever a new message is received, create separate component */}
      <div className="w-3/4  mx-auto">
        <SubmitQs data={data} />
      </div>
    </section>
  );
}

export default ChatPage;
