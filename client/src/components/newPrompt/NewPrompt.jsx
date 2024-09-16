import { useEffect, useRef, useState } from "react";
import "./newprompt.css";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";

const NewPrompt = () => {
  const scrollRef = useRef(null);
  const [img, setImg] = useState({
    isLoading: false,
    error: null,
    dbData: {},
  });

  useEffect(() => {
    if (scrollRef.current) {
      console.log(scrollRef.current);
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  console.log("Img response", img);

  return (
    <>
      {/* add new chat */}
      {img?.isLoading && <div>Loading....</div>}
      {img?.dbData?.res?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGEKIT_ENDPOINT}
          path={img?.dbData?.res?.filePath}
          width={100}
          transformation={[
            {
              height: 100,
              width: 100,
            },
            {
              quality: 10,
            },
          ]}
        />
      )}
      <div ref={scrollRef} className="endChat"></div>
      <form className="newForm">
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
