import React, { useState } from "react";
import { signInWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Rtulogo.png";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();

    if (!email.endsWith("@rtu.edu.ph")) {
      setError("Only @rtu.edu.ph emails are allowed.");
      window.alert("Only @rtu.edu.ph emails are allowed.");
      setEmail("");
      setPassword("");
      return;
    }

    try {
      setLoading(true); // Set loading to true when starting the sign-in process

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
        window.alert("Invalid email or password");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
      window.alert("Invalid email or password");
      setEmail("");
      setPassword("");
    } finally {
      setLoading(false); // Set loading to false when the sign-in process is complete
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true); // Set loading to true when starting the Google sign-in process

      const authInstance = getAuth();
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      provider.setCustomParameters({
        'login_hint': '0000-000000@rtu.edu.ph',
        'hd': 'rtu.edu.ph',
      });

      const result = await signInWithPopup(authInstance, provider);

      console.log("Google Sign-In Successful:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    } finally {
      setLoading(false); // Set loading to false when the Google sign-in process is complete
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
              Schedule your time for a seamless blend of efficiency and enjoyment.
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
              disabled={loading} // Disable the button when loading is true
            >
              {loading ? "Signing In..." : "Sign In"}
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
              disabled={loading} // Disable the button when loading is true
            >
              <FaGoogle className="text-lg" />
              {loading ? "Signing In with Google..." : "Sign in with Google"}
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
