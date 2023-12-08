import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import MobileNavbar from "../components/dashboard/MobileNavbar";

const Contact = () => {
  return (
    <div>
      <div className="fixed z-10 w-full bg-secondary">
        <MobileNavbar />
      </div>
      <div className="absolute z-10 bg-secondary">
        <Sidebar />
      </div>
    </div>
  );
};

export default Contact;
