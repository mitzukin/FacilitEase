import React from "react";
import LaptopAppointment from "../assets/laptop1.png";
const laptop = () => {
  return (
    <div className="py-28">
      <div className="flex flex-col items-center justify-center mt-10 mb-20 lg:px-56 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <img src={LaptopAppointment} alt="" className="mx-auto " />
        </div>
        <div className="w-full lg:w-1/2 font-roboto">
          <div className="flex flex-col ">
            <h1 className="px-5 text-2xl font-semibold lg:text-5xl">
              Effortlessly Schedule Room Appointments, Personalized to Your
              Preferences.
            </h1>
            <p className="px-5 mt-5 mb-5">
              Welcome to a new era of convenience – where making an appointment
              is as easy as a gentle breeze. With our intuitive "Make an
              Appointment" feature, you have the power to effortlessly schedule
              and secure your preferred rooms.
            </p>

            <div className="px-5">
              <p>
                <span className="mr-5 text-2xl font-bold">01</span> SIMPLE
                NAVIGATE
              </p>
              <p>
                <span className="mr-5 text-2xl font-bold">02</span> CHOOSE YOUR
                IDEAL TIME
              </p>
              <p>
                <span className="mr-5 text-2xl font-bold">03</span> CONFIRM YOUR
                BOOKING WITH JUST ONE CLICK{" "}
              </p>
            </div>
            <p className="px-5 mt-5">
              Elevate your efficiency – it's your appointment, your space, your
              way.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center lg:px-56 lg:flex-row-reverse">
        <div className="w-full lg:w-1/2">
          <img src={LaptopAppointment} alt="" className="mx-auto " />
        </div>
        <div className="w-full lg:w-1/2 font-roboto">
          <div className="flex flex-col ">
            <h1 className="px-5 text-2xl font-semibold lg:text-5xl ">
              EventSync: Seamlessly Navigate Your Schedule
            </h1>
            <p className="px-5 mt-5 mb-5">
              Organizing your schedule becomes a seamless journey. With our
              user-friendly platform, event scheduling transforms into a
              streamlined experience.
            </p>

            <div className="px-5">
              <p>
                <span className="mr-5 text-2xl font-bold">01</span> EFFORTLESSLY
                PLAN
              </p>
              <p>
                <span className="mr-5 text-2xl font-bold">02</span> COORDINATE
                EVERY DETAIL
              </p>
              <p>
                <span className="mr-5 text-2xl font-bold">03</span> ENSURING
                THAT YOUR EVENTS UNFOLD WITH PRECISION & EASE
              </p>
            </div>
            <p className="px-5 mt-5">
            Stay in sync with your agenda, manage diverse events effortlessly, and elevate your scheduling experience with EventSync.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default laptop;
