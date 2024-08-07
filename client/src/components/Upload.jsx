import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { useRef } from "react";
import { FaPaperclip } from "react-icons/fa6";

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/upload");

    console.log("response from api", response);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    console.log("response from img upload", data);
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

function Upload({ setImgInfo }) {
  // when we click on file icon, IKUpload will run
  const uploadRef = useRef(null);
  const onError = (err) => {
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    // set the res obj to this fn
    setImgInfo((prev) => ({ ...prev, isLoading: false, dbData: res }));
  };
  const onUploadProgress = (progress) => {
    console.log("Progress", progress);
  };

  //converts the file into a Base64-encoded string and send to gem api
  const onUploadStart = (evt) => {
    //evt has local file details
    const file = evt.target.files[0];
    //browser api reads file content
    const reader = new FileReader();
    console.log("reader", reader);
    reader.onloadend = () => {
      setImgInfo((prev) => ({
        ...prev,
        isLoading: true,
        aiData: {
          inlineData: {
            data: reader.result.split(",")[1],
            mimeType: file.type,
          },
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
  const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;
  console.log("endpoint", urlEndpoint, publicKey);

  return (
    <div className="px-4">
      <IKContext
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        <IKUpload
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          useUniqueFileName={true}
          style={{ display: "none" }}
          ref={uploadRef}
        />
      </IKContext>
      <div className="icon-btn ml-2" onClick={() => uploadRef.current.click()}>
        <FaPaperclip />
      </div>
    </div>
  );
}

export default Upload;
