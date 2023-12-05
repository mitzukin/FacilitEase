import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import logo from "../../assets/Rtulogo.png";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth"; // Correct import

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // State for success modal
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // State for error modal
  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();

    if (!email.endsWith("@rtu.edu.ph")) {
      setError("Only @rtu.edu.ph emails are allowed.");
      openErrorModal();
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Update user profile with the provided name
        updateProfile(auth.currentUser, {
          displayName: name,
        }).then(() => {
          // Open the success modal
          openSuccessModal();
        });
      })
      .catch((error) => {
        console.error(error);
        openErrorModal();
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      // Create a GoogleAuthProvider instance with hd parameter
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      provider.setCustomParameters({
        'login_hint': '0000-000000@rtu.edu.ph',
        'hd': 'rtu.edu.ph'  // Specify the Google Apps domain
      });

      const result = await signInWithPopup(auth, provider);

      // The user is signed in, and you can access the user information via result.user
      console.log("Google Sign-In Successful:", result.user);
      navigate("/signin");
    } catch (error) {
      // Handle errors, e.g., user cancels the sign-in, or there's an authentication error
      console.error("Google Sign-In Error:", error.message);
    }
  };

  const closeModal = () => {
    // Close both success and error modals
    setIsSuccessModalOpen(false);
    setIsErrorModalOpen(false);
  };

  const openSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };

  const openErrorModal = () => {
    setIsErrorModalOpen(true);
  };


  return (
    <div className="flex flex-col lg:flex-row-reverse bg-primary">
      <div className="pb-10 lg:w-1/2 bg-secondary">
        <div className="flex flex-col max-w-lg mx-auto min-w-xl">
          <form onSubmit={signUp} className="flex flex-col px-5 mg:px-20">
            <h1 className="mt-32 mb-2 text-5xl font-bold md:text-7xl">
              REGISTRATION
            </h1>
            <p className="mb-10">
              {" "}
              Schedule your time for a seamless blend of efficiency and
              enjoyment.
            </p>
            <p className="mt-5 mb-5 font-semibold md:text-md">
              Kindly Fill up this form
            </p>
            <p className="mb-2 font-normal md:text-sm">Email*</p>
            <input
              className="p-3 text-sm border-b placeholder:text-sm"
              type="email"
              placeholder="example@rtu.edu.ph"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>

            <p className="mt-5 mb-2 font-normal md:text-sm">Name*</p>
            <input
              className="p-3 text-sm border-b placeholder:text-sm"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></input>

            <p className="mt-5 mb-2 text-sm font-normal md:text-sm">
              Password*
            </p>
            <input
              className="p-3 text-sm border-b placeholder:text-sm"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>

            <button
              type="submit"
              className="py-3 mt-10 text-sm rounded-md md:text-sm bg-primary text-secondary font-roboto"
            >
              {" "}
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

      <div className=" lg:h-full lg:w-1/2">
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
          <Link to="/signin" className="p-3 text-xs rounded-md font-roboto text-secondary bg-primary">
            Go to Sign In
          </Link>
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
