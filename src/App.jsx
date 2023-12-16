// app.jsx
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import Event from "./pages/Event";
import Contact from "./pages/Contact";
import Schedule from "./pages/Schedule";
import memo from "./assets/Memo.png";
import Chatbox from "./components/chatbox";
function App() {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  const toggleChatbox = () => {
    setIsChatboxOpen((prev) => !prev);
  };
  return (
    <>
      <BrowserRouter basename="/FacilitEase">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/event" element={<Event />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <div className="fixed rounded-lg md:hidden right-5 bottom-20">
        <button
          className="flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-shade"
          onClick={toggleChatbox}
        >
          <p className="text-xs text-secondary font-roboto">Ask Memo</p>
          <img src={memo} alt="" className="h-full w-[30px]" />
        </button>
        {isChatboxOpen && <Chatbox />}
      </div>
    </>
  );
}

export default App;
