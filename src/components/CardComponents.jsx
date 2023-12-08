import React from "react";
import Hammer from "../assets/Hammer.png";
import Broom from "../assets/Broom.png";
import Check from "../assets/Check.png";
import Hand from "../assets/Hand.png";
import Menu from "../assets/Menu.png";

const CardComponents = () => {
  const card = [
    {
      img: Hammer,
      header: " Optimize Operations",
      paragraph:
        "Providing a centralized platform to manage and monitor various aspects of facilities. This includes resource allocation, maintenance schedules, and space utilization, resulting in streamlined and optimized day-to-day operations.",
    },
    {
      img: Broom,
      header: " Cost Savings",
      paragraph:
        "Efficiently managing resources, preventive maintenance, and energy consumption, organizations can reduce operational costs and extend the lifespan of equipment, ultimately contributing to a more cost-effective operation.",
    },
    {
      img: Check,
      header: "Improved Productivity",
      paragraph:
        "Automating routine tasks, minimizing downtime through proactive maintenance, and optimizing space usage, employees can work in a well-maintained and organized setting, fostering higher levels of productivity.",
    },
    {
      img: Hand,
      header: "Enhanced Safety and Compliance",
      paragraph:
        "Ensuring that facilities adhere to safety regulations and compliance standards. The system can track and manage safety protocols, emergency procedures, and regulatory requirements, reducing the risk of incidents and ensuring a secure workplace.",
    },
    {
      img: Menu,
      header: "Strategic Decision-Making",
      paragraph:
        "Access to real-time data and analytics provided  decision-makers. It enables organizations to make informed decisions regarding resource allocation, and space planning, contributing to long-term strategic planning and growth.",
    },
  ];
  return (
    <div className="container px-5 py-20 mx-auto text-secondary font-roboto bg-tertiary">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <h1 className="mx-10 mt-20 mb-8 text-3xl font-bold">
          Unveiling the Power of an Advanced Management System
        </h1>
        {card.map((item, index) => (
          <div key={index} className="p-6 duration-300 border-4 shadow lg:hover:scale-105 bg-tertiary">
            <img src={item.img} alt=""  className="-translate-y-10 w-[70px]"/>
            <h2 className="mb-4 text-xl font-semibold">{item.header}</h2>
            <p>{item.paragraph}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardComponents;
