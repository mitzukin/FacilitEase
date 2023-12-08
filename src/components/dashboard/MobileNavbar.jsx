import React, { useState } from "react";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { LuLayoutDashboard, LuContact2 } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { FiPenTool } from "react-icons/fi";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    auth.signOut();
    // After signing out, navigate to the home page
    navigate("/signin");
  };

  return (
    <div
      className={`flex flex-col justify-between  p-3  text-primary transition-all duration-300 md:hidden`}
    >
      <div className="flex items-center justify-between gap-5 p-1">
        <div>
      <p className="pt-1 text-lg font-bold text-center font-roboto text-primary">
          FACILIT<span className="text-orange-500">EASE</span>{" "}
        </p>
        </div>
        <div className="pt-1">
        {isMenuOpen ? (
          <IoIosClose onClick={handleToggleMenu} size={40} />
        ) : (
          <GiHamburgerMenu onClick={handleToggleMenu} />
        )}
        </div>
        
      </div>

      {isMenuOpen && (
        <div className="flex flex-col w-screen h-screen font-roboto text-shade menu-items">
          <div className="flex flex-col w-full mt-5 border-b md:mb-10"></div>
          <div className="flex flex-col items-start justify-center ml-10">
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
          </div>
          <div className="w-full mt-10 mb-10 border-b"></div>

          <Link to="/dashboard">
            <div className="flex items-center gap-5 px-6 py-4 rounded-md hover:bg-light hover:text-primary">
              <LuLayoutDashboard size={18} />
              Home
            </div>
          </Link>
          <Link to="/schedule" className="">
            <div className="flex items-center gap-5 px-6 py-4 rounded-md hover:bg-light hover:text-primary">
              <FiPenTool size={18} />
              Schedule
            </div>
          </Link>

          <Link to="/event">
            <div className="flex items-center gap-5 px-6 py-4 rounded-md hover:bg-light hover:text-primary">
              <FaRegCalendarCheck size={18} />
              Event
            </div>
          </Link>
          <Link to="/contact">
            <div className="flex items-center gap-5 px-6 py-4 rounded-md hover:bg-light hover:text-primary">
              <LuContact2 size={18} />
              Contact
            </div>
          </Link>

          <div className=" text-shade">
            <div className="px-6 py-4 rounded-md hover:bg-light hover:text-primary">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-5"
              >
                <BiLogOut size={18} />
                <span className="font-roboto">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
