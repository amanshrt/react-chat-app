import React from 'react';
import UploadDocument from "../components/UploadDocument";
import ChatPage from './ChatPage';
import '../styles/index.css'; // Ensure this path matches your file structure

const Home: React.FC = () => {
  return (
    <>
      <div className="ribbon"><span>DEMO PURPOSE ONLY</span></div>
      <UploadDocument />
      <ChatPage />
    </>
  );
};

export default Home;

