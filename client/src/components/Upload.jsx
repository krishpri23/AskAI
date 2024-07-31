import { IKContext, IKImage, IKUpload } from "imagekitio-react";

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/upload");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

function Upload({ imgInfo }) {
  const onError = (err) => {
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
  };
  const onUploadProgress = (progress) => {
    console.log("Progress", progress);
  };

  const onUploadStart = (evt) => {
    console.log("Start", evt);
  };

  const pubKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;
  console.log(pubKey, "key");
  return (
    <div className="bg-red-50 p-5">
      <IKContext
        urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
        publicKey={import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY}
        authenticator={authenticator}
      >
        <p>Upload an image</p>
        <IKUpload
          fileName="file.png"
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
        />
      </IKContext>
    </div>
  );
}

export default Upload;
