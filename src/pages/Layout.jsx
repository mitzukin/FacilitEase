import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => {
      // Unsubscribe from the listener when the component unmounts
      unsubscribe();
    };
  }, []);

  const handleSignOut = () => {
    auth.signOut();
    // After signing out, navigate to the home page
    navigate("/home");
  };

  return (
    <>
      <nav>
        <ul className="absolute flex items-center w-full h-16 gap-5 text-lg md:justify-end bg-bg font-roboto">
          {!user && (
            <li className="ml-5">
              <Link to="/home">Home</Link>
            </li>
          )}
          <li>
            {user ? (
              <button onClick={handleSignOut}>Sign Out</button>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </li>
          {!user && (
            <li className="mr-10">
              {/* Change the Link to only allow access to Sign Up when there is no signed-in user */}
              <Link to={user ? "/dashboard" : "/signup"}>Sign Up</Link>
            </li>
          )}
        </ul>
      </nav>
      <Outlet /> {/* Render nested routes/components */}
    </>
  );
};

export default Layout;
