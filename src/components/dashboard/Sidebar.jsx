import React, { useState, useRef, useEffect } from "react";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { LuLayoutDashboard, LuContact2 } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { FiPenTool } from "react-icons/fi";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Chatbox from "../chatbox";
import memo from "../../assets/Memo.png"
const Sidebar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setCollapsed] = useState(true);
  
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  const toggleChatbox = () => {
    setIsChatboxOpen((prev) => !prev);
  };
  const toggleSidebar = () => {
    setCollapsed(!isCollapsed);
  };

  const closeSidebar = () => {
    setCollapsed(true);
  };

  const handleSignOut = () => {
    auth.signOut();
    // After signing out, navigate to the home page
    navigate("/signin");
  };

  // Ref to the sidebar element for detecting clicks outside
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      closeSidebar();
    }
  };

  // Add event listener for clicks outside the sidebar when it is open
  useEffect(() => {
    if (!isCollapsed) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isCollapsed]);

  return (
    <div>
      <div
        ref={sidebarRef}
        className={` flex-col hidden md:flex fixed  duration-300 ease-in-out items-${
          isCollapsed ? "center" : "left"
        } justify-between  h-full p-6 shadow-xl bg-bg 
      ${isCollapsed ? "w-16 md:w-20" : "w-64"} ${
          isCollapsed ? "collapsed" : ""
        }`}
        onClick={toggleSidebar}
      >
        <div className=" text-shade">
          <div className="flex items-center gap-4 px-6 py-4 duration-300 ease-in-out rounded-md hover:bg-light hover:text-primary">
            <GiHamburgerMenu size={18} />
            {!isCollapsed && (
              <span className="ml-2 text-xs font-semibold font-roboto">
                Menu
              </span>
            )}
          </div>

          {!isCollapsed && (
            <div className="flex flex-col items-center justify-center">
              <p className="font-bold text-center font-roboto text-primary">
                FACILIT<span className="text-orange-500">EASE</span>{" "}
              </p>
              <div className="flex flex-col w-full border-b md:mb-10"></div>

              <img
                src="https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-4-1024x1024.jpg"
                alt="User Profile"
                className="rounded-full mt-10 h-[100px] w-[100px] shadow-xl"
              />

              <p className="mt-2 text-sm font-semibold text-primary">
                2021-000000
              </p>
              <p className="mb-5 text-xs ">2021-000000@rtu.edu.ph</p>

              <Link
                to="/profile"
                className="px-6 py-3 text-xs rounded-md text-secondary bg-primary"
              >
                Account Profile
              </Link>
              <div className="w-full mt-10 mb-10 border-b"></div>
            </div>
          )}
        </div>

        <div
          className={`flex flex-col text-xs font-semibold md:mt-20 lg:md-0 ${
            isCollapsed ? "-translate-y-0" : "md:-translate-y-28"
          } font-roboto text-shade`}
        >
          <Link to="/dashboard">
            <div className="flex items-center gap-5 px-6 py-4 rounded-md hover:bg-light hover:text-primary">
              <LuLayoutDashboard size={18} />
              {!isCollapsed && <span className="ml-2 ">Home</span>}
            </div>
          </Link>
          <Link to="/schedule" className="">
            <div className="flex items-center gap-5 px-6 py-4 rounded-md hover:bg-light hover:text-primary">
              <FiPenTool size={18} />
              {!isCollapsed && <span className="ml-2">Schedule</span>}
            </div>
          </Link>

          <Link to="/event">
            <div className="flex items-center gap-5 px-6 py-4 rounded-md hover:bg-light hover:text-primary">
              <FaRegCalendarCheck size={18} />
              {!isCollapsed && <span className="ml-2 ">Event</span>}
            </div>
          </Link>
          <Link to="/contact">
            <div className="flex items-center gap-5 px-6 py-4 rounded-md hover:bg-light hover:text-primary">
              <LuContact2 size={18} />
              {!isCollapsed && <span className="ml-2">Contact</span>}
            </div>
          </Link>


        
        </div>
        <div className=" text-shade">
        <button className="w-full" onClick={toggleChatbox}>
            <div className="flex items-center gap-5 px-6 py-4 text-xs font-semibold rounded-md font-roboto hover:bg-light hover:text-primary">
              <img src={memo} alt="" className="h-full w-[25px]"/>
              {!isCollapsed && <span className="ml-2">Memo</span>}
            </div>
          </button>
          {isChatboxOpen && <Chatbox />}
          <div className="px-6 py-4 rounded-md hover:bg-light hover:text-primary">
            <button onClick={handleSignOut} className="flex items-center gap-5">
              <BiLogOut size={18} />
              {!isCollapsed && (
                <span className="ml-2 text-xs font-semibold font-roboto">
                  Logout
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
