import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import logo from "../../assets/Rtulogo.png";
import { FaGoogle, FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [Conpassword, setConPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();

    try {
      if (!email.endsWith("@rtu.edu.ph")) {
        setError("Only @rtu.edu.ph emails are allowed.");
        openErrorModal();
        return;
      }

      if (password !== Conpassword) {
        setError("Passwords do not match.");
        openErrorModal();
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      // Log or store additional user information
      console.log("User Information:", {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        providerData: user.providerData,
        metadata: {
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
        },
      });

      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
      });

      openSuccessModal();
    } catch (error) {
      console.error(error);
      openErrorModal();
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      provider.setCustomParameters({
        login_hint: "0000-000000@rtu.edu.ph",
        hd: "rtu.edu.ph",
      });

      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-In Successful:", result.user);
      navigate("/signin");
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  const closeModal = () => {
    setIsSuccessModalOpen(false);
    setIsErrorModalOpen(false);
  };

  const openSuccessModal = () => {
    setIsSuccessModalOpen(true);
    setTimeout(() => {
      closeModal();
      navigate("/signin");
    }, 3000); // Automatically close after 3 seconds and navigate to the sign-in page
  };

  const openErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse bg-primary">
      <div className="pb-10 lg:w-1/2 bg-secondary">
        <div className="flex flex-col max-w-lg mx-auto min-w-xl">
          <form onSubmit={signUp} className="flex flex-col px-5 md:px-20">
            <h1 className="mt-10 mb-2 text-5xl font-bold md:text-5xl">
              REGISTRATION
            </h1>
            <p className="mb-8">
              {" "}
              Schedule your time for a seamless blend of efficiency and
              enjoyment.
            </p>
            <p className="text-xs text-red-500">Note: Use Institutional Email.</p>
            
            <p className="mt-5 mb-5 font-semibold md:text-md">
              Kindly Fill up this form
            </p>
            <p className="mb-2 font-normal md:text-sm">Email*</p>
            <input
              className="p-3 text-sm border-b placeholder:text-sm"
              type="email"
              placeholder="0000-000000@rtu.edu.ph"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>

            <p className="mt-5 mb-2 font-normal md:text-sm">First Name*</p>
            <input
              className="p-3 text-sm border-b placeholder:text-sm"
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            ></input>

            <p className="mt-5 mb-2 font-normal md:text-sm">Last Name*</p>
            <input
              className="p-3 text-sm border-b placeholder:text-sm"
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            ></input>

            <p className="mt-5 mb-2 text-sm font-normal md:text-sm">
              Password*
            </p>
            <div className="relative ">
              <input
                className="w-full p-3 text-sm border-b placeholder:text-sm"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute text-xs font-roboto right-2 top-3"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <p className="mt-5 mb-2 text-sm font-normal md:text-sm">
              Confirm Password*
            </p>
            <div className="relative ">
              <input
                className="w-full p-3 text-sm border-b placeholder:text-sm"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={Conpassword}
                onChange={(e) => setConPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="py-3 mt-10 text-sm rounded-md md:text-sm bg-primary text-secondary font-roboto"
            >
              Sign Up
            </button>
            <div className="flex items-center justify-center mt-5">
              <hr className="w-1/2 my-4 border-t border-gray-200" />
              <p className="mx-4">or</p>
              <hr className="w-1/2 my-4 border-t border-gray-200" />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 py-3 mt-10 text-sm text-center border rounded-md md:text-sm text-primary font-roboto"
              onClick={handleGoogleSignIn}
            >
              <FaGoogle className="text-lg" />
              Sign up with Google
            </button>
            <div className="flex justify-center gap-2 mt-5 text-sm">
              <p>Already have an account? </p>{" "}
              <Link to="/signin" className="font-semibold">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className=" lg:w-1/2">
        <div className="flex flex-col items-center justify-center h-screen">
          <img src={logo} alt="" className="h-80" />
          <h1 className="flex flex-wrap text-4xl font-bold text-center text-secondary">
            Rizal Technological University
          </h1>
          <p className="flex flex-wrap mt-2 text-lg text-secondary">
            Boni Ave, Mandaluyong, 1550 Metro Manila
          </p>
        </div>
      </div>
      <div
        id="success-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          isSuccessModalOpen ? "fixed" : "hidden"
        } overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-xl max-h-full p-4 mx-auto mt-80">
          <div className="relative bg-white rounded-lg shadow-lg ">
            <div className="p-5 border-b">
              <h3 className="text-xl font-bold text-center text-green-800 font-roboto ">
                Sign Up Success
              </h3>
            </div>

            <div className="p-4 space-y-4 md:p-5">
              <p className="mb-5 text-base leading-relaxed text-center font-roboto text-primary">
                Thank you for signing up! <br></br>Your account has been created
                successfully.
              </p>
              <div className="flex justify-center ">
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="error-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          isErrorModalOpen ? "fixed" : "hidden"
        } overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-xl max-h-full p-4 mx-auto mt-80">
          <div className="relative bg-white rounded-lg shadow-lg ">
            <div className="p-5 border-b">
              <h3 className="text-xl font-bold text-center text-red-800 font-roboto">
                Error
              </h3>
            </div>
            <div className="flex flex-col items-center justify-center mt-5 font-roboto">
              <p className="mb-2 text-sm">Failed Signing Up Due to:</p>
              <h1>Incorrect Institutional Rtu Email</h1>
              <p>Account Already Exist</p>
            </div>
            <div className="p-4 space-y-4 md:p-5">
              <div className="flex justify-center ">
                <button
                  onClick={closeModal}
                  className="p-3 text-xs rounded-md font-roboto text-secondary bg-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
