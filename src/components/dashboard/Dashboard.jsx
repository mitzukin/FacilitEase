import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import DashRtu from "../../assets/Dashboard.png";
import Rizal from "../../assets/DashboardRizal.png";
import { Link } from "react-router-dom";
import card1 from "../../assets/Card1.png";
import card2 from "../../assets/Card2.png";
import card3 from "../../assets/Card3.png";
import Laptop from "../laptop";
import CardComponents from "../CardComponents";
import MobileNavbar from "./MobileNavbar";
const Dashboard = () => {
  const [showGoToTop, setShowGoToTop] = useState(false);

  useEffect(() => {
    // Add a scroll event listener to show/hide the "Go to Top" button
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowGoToTop(true);
      } else {
        setShowGoToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="">
       <div className="fixed z-10 w-full bg-secondary">
      <MobileNavbar/>
      </div>
      <div className="absolute z-10 hidden md:flex bg-secondary">
        <Sidebar />
      </div>
    
      <div className="flex items-center justify-center h-full px-20 ">
        <div className="flex flex-col mt-20 bg-white rounded-lg lg:px-56 lg:flex-row">
          <div className="flex flex-col lg:w-1/2">
            <div className="mb-8 font-roboto">
              <h1 className="px-4 mt-20 text-4xl font-bold lg:text-6xl">
                Elevate Efficiency: Your All-in-One Facility Management Solution
              </h1>
              <p className="px-4 mt-5 text-shade">
                At Rizal Technological University, we revolutionize efficiency
                with our all-in-one facility management solution, seamlessly
                streamlining operations and enhancing the campus environment for
                thriving innovation and learning.
              </p>
              <div className="px-5 ml-5 py-4 mt-10 rounded text-center text-xs text-secondary bg-primary w-[160px]">
                <Link to="/schedule">Make an Appointment</Link>
              </div>
            </div>
          </div>
          <div className="relative mx-auto lg:w-1/2">
            <div className="flex items-center justify-center">
              <img src={DashRtu} alt="" />
            </div>
            <div className="absolute right-0 top-32">
              <img src={Rizal} alt="" />
            </div>
            <div className="w-[400px] border-b border-primary mx-auto mt-16"></div>
            <h1 className="mt-5 font-semibold text-center font-roboto">
              Cities Of Mandaluyong and Pasig
            </h1>
            <p className="text-sm text-center font-roboto">
              {" "}
              Established on July 11, 1969
            </p>
          </div>
        </div>
      </div>
      <div className="px-20 mt-56 Card-section">
        <div className="mx-auto ">
          <h1 className="px-10 pt-32 text-3xl font-bold text-center text-secondary lg:mx-32 lg:text-5xl font-roboto ">
            {" "}
            Where Precision Meets Comfort – Your All-in-One Facility Management
            Solution.
          </h1>
        </div>
        <p className="px-10 mt-2 text-center text-secondary font-roboto">
          {" "}
          Efficiency meets comfort in every space. Our all-in-one facility
          management solution orchestrates seamless operations, ensuring
          precision and comfort throughout your facilities
        </p>

        <div className="flex flex-col items-center lg:px-40 lg:gap-20 font-roboto lg:flex-row lg:justify-center lg:mt-28">
          <div className="flex flex-col px-5 py-20 mx-4 my-4 text-center rounded-lg md:px-10 md:py-24 bg-primary text-secondary ">
            <img src={card1} alt="" className="mx-auto mb-4" />
            <h1 className="mt-4 text-xl font-semibold font-roboto">
              Resourceful Workspace Allocation{" "}
            </h1>
            <p className="mt-3 text-center ">
              Effortlessly manage your facility's spatial dynamics with our
              intelligent workspace allocation feature.
            </p>
          </div>

          <div className="flex flex-col items-center px-10 py-20 mx-4 my-4 text-center bg-white rounded-lg md:px-10 md:py-24 ">
            <img src={card2} alt="" className="mx-auto mb-4" />
            <h1 className="mt-4 text-xl font-semibold font-roboto">
              Intuitive Meeting Room Booking
            </h1>
            <p className="mt-3 text-center ">
              Seamlessly schedule and organize meetings with our intuitive
              meeting room booking feature.
            </p>
          </div>

          <div className="flex flex-col items-center px-5 py-20 mx-4 my-4 text-center rounded-lg md:px-10 md:py-24 bg-primary text-secondary ">
            <img src={card3} alt="" className="mx-auto mb-4" />
            <h1 className="mt-4 text-xl font-semibold font-roboto">
              Real-time Facility Insights
            </h1>
            <p className="mt-3 text-center ">
              Effortlessly manage your facility's spatial dynamics with our
              intelligent workspace allocation feature.
            </p>
          </div>
        </div>

        <p className="px-10 py-20 text-center font-roboto text-secondary">
          From optimizing workflow to enhancing the overall atmosphere, our
          solution is your key to creating a workplace where productivity meets
          relaxation effortlessly.
        </p>
      </div>
      {showGoToTop && (
        <button
          className="fixed px-4 py-2 text-sm text-white rounded bottom-8 right-8 bg-primary"
          onClick={handleGoToTop}
        >
          Go to Top
        </button>
      )}
      <Laptop />
      <div className="CardComponents">
        <CardComponents />
      </div>
      <footer className="w-full text-sm bg-footer">
        <p className="py-5 text-center text-secondary">
          2023 FacilitEase. All right Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
