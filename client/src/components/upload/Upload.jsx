import React, { useRef } from "react";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { GenerativeModel } from "@google/generative-ai";

const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLICKEY;
const urlEndpoint = import.meta.env.VITE_IMAGEKIT_ENDPOINT;

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
    console.log(data, "response");
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload = ({ setImg }) => {
  // when I click on upload button, IKUpload will be called
  const uploadRef = useRef(null);
  const onError = (err) => {
    console.log("Error", err);
    setImg((prev) => ({ ...prev, error: err }));
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    setImg((prev) => ({ ...prev, isLoading: false, dbData: res }));

    if (uploadRef.current) {
      uploadRef.current.value = "";
    }
  };

  const onUploadProgress = (progress) => {
    console.log("Progress", progress);
  };

  const onUploadStart = (evt) => {
    const files = evt.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImg((prev) => ({
        ...prev,
        isLoading: true,
        aiData: {
          inlineData: {
            data: reader.result.split(",")[1], // Base64 encoded string
            mimeType: files.type,
          },
        },
      }));
    };

    reader.readAsDataURL(files); // Reads file as data URL (base64)
  };

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        onUploadProgress={onUploadProgress}
        onUploadStart={onUploadStart}
        style={{ display: "none" }}
        ref={uploadRef}
      />
      <label onClick={() => uploadRef.current.click()}>
        <img src="/attachment.png" alt="attachment" />
      </label>
    </IKContext>
  );
};

export default Upload;
