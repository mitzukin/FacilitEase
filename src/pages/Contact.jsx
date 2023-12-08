import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import MobileNavbar from "../components/dashboard/MobileNavbar";
import Facebook from "../assets/Facebook.png";
import Email from "../assets/Email.png";
import Linked from "../assets/Linked.png";
import Twitter from "../assets/Twitter.png";

const Contact = () => {
  return (
    <div>
      <div className="fixed z-10 w-full bg-secondary">
        <MobileNavbar />
      </div>
      <div className="absolute z-10 bg-secondary">
        <Sidebar />
      </div>

      <div className="flex items-center justify-center w-full h-screen ">
        <div className="flex flex-col gap-10 xl:mx-20 h-[700px] mt-40 xl:mt-0 justify-center xl:border  lg:px-32 xl:flex-row font-roboto ">
          <div className="flex flex-col items-center justify-center w-full xl:w-2/5 font-roboto">
            <h1 className="text-5xl font-extrabold xl:text-8xl">
              CONTACT INFO
            </h1>
            <p className="w-[380px] md:w-[500px] p-2 mt-5">
              {" "}
              Connecting with FacilitEase is just a click away! Whether you have
              questions, need support, or want to explore opportunities, our
              contact information is readily available on our website.{" "}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center font-roboto ">
            {socials.map((social, index) => (
              <div key={index} className="flex gap-2 px-1 my-4">
                <div className="">
                  <img src={social.logo} alt="" className="" />
                </div>
                <div className="text-xs">
                  <h3 className="font-bold">{social.title}</h3>
                  <p className="w-[300px] md:w-[500px]">{social.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const socials = [
  {
    logo: Facebook,
    title: "FacilitEase",
    content:
      "Stay connected and be a part of our community! Follow us on Facebook for the latest updates, exclusive content, and exciting announcements.",
  },
  {
    logo: Email,
    title: "FacilitEase@gmail.com",
    content:
      "Have a question or need assistance? Message us directly by sending an email. Our team is here to help, and we look forward to hearing from you!",
  },
  {
    logo: Linked,
    title: "FacilitEase",
    content:
      "Let's connect on LinkedIn! Stay updated on professional insights, industry trends, and exclusive updates from our team. Join our network by visiting our LinkedIn profile and clicking 'Connect.'",
  },
  {
    logo: Twitter,
    title: "@FacilitEase",
    content:
      "Stay in the loop with the latest updates and engage in real-time conversations! Follow us on Twitter for news, insights, and community discussions. Feel free to tweet us your thoughts—we love hearing from you! Connect with us on Twitter and be a part of the conversation. #ConnectWithUs",
  },
];

export default Contact;
