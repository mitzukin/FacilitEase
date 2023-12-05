import {
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup, 
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Rtulogo.png";
import { Link } from "react-router-dom";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  
  const signIn = (e) => {
    e.preventDefault();

    if (!email.endsWith("@rtu.edu.ph")) {
      setError("Only @rtu.edu.ph emails are allowed.");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(userCredential);

        // Check if the user is successfully signed in before navigating to the dashboard
        if (user) {
          navigate("/dashboard");
        } else {
          setError("Invalid email or password");
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid email or password");
      });
  };
  const handleGoogleSignIn = async () => {
    try {
      const auth = getAuth();  // Get the authentication instance
  
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
      navigate("/dashboard");
    } catch (error) {
      // Handle errors, e.g., user cancels the sign-in, or there's an authentication error
      console.error("Google Sign-In Error:", error.message);
    }
  };
  

  return (
    <div className="flex flex-col lg:flex-row bg-primary">
      <div className="pb-10 lg:w-1/2 bg-secondary">
        <div className="flex flex-col max-w-lg mx-auto min-w-xl">
          <form onSubmit={signIn} className="flex flex-col px-5 mg:px-20">
            <h1 className="mt-32 mb-2 text-5xl font-bold md:text-7xl">
              EMPOWER YOUR DAY{" "}
            </h1>
            <p className="mb-10">
              {" "}
              Schedule your time for a seamless blend of efficiency and
              enjoyment.
            </p>
            <p className="mt-5 mb-5 md:text-sm">Please Enter your details</p>
            <p className="mb-2 font-normal md:text-sm">Email</p>
            <input
              className="p-3 text-sm border-b placeholder:text-sm"
              type="email"
              placeholder="example@rtu.edu.ph"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
            <p className="mt-5 mb-2 text-sm font-normal md:text-sm">Password</p>
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
              Sign In
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
              Sign in with Google
            </button>
            <div className="flex justify-center gap-2 mt-5 text-sm">
              <p>Don't have an account? </p>{" "}
              <Link to="/signup" className="font-semibold">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className=" lg:h-full lg:w-1/2">
        <div className="flex flex-col items-center justify-center h-screen">
          <img src={logo} alt="" className="h-80" />
          <h1 className="text-lg font-semibold text-center text-secondary">
            Rizal Technological University
          </h1>
          <p className="text-secondary">
            Boni Ave, Mandaluyong, 1550 Metro Manila
          </p>
        </div>
      </div>
    </div>
  );
};


export default SignIn;
