import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import Sidebar from "./CommonComponents//Sidebar";
import UserNotVerified from "../Pages/Error/UserNotVerified";
import { auth } from "../../Database/firebase.config";
const CommonLayout = () => {
  const [userVerified, setUserVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setUserVerified(true);
      } else {
        setUserVerified(false);
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  // Conditional rendering
  if (!userVerified) {
    return <UserNotVerified />;
  }

  return (
    <div className="flex h-screen w-full commonlayout overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full p-5 bg-[rgba(255,255,255,0.77)] pt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default CommonLayout;
