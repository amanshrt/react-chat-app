import React from "react";
import UploadDocument from "../components/UploadDocument";
import ChatPage from "./ChatPage";

const Home: React.FC = () => {
  return (
    <>
      <UploadDocument/>
      <ChatPage />
    </>
  );
};

export default Home;
