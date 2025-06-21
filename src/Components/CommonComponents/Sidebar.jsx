import React, { useEffect, useState } from "react";
import { FaHome, FaBlog, FaUser } from "react-icons/fa";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { onValue, ref, update } from "firebase/database";
import { db, auth } from "../../../Database/firebase.config";

const Sidebar = () => {
  const [userdata, setuserdata] = useState({});
  const profileImg =
    "https://images.pexels.com/photos/6940512/pexels-photo-6940512.jpeg?auto=compress&cs=tinysrgb&w=600";

  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: <FaHome size={20} />, label: "Home", path: "/" },
   
  ];
  /**
   * ! fetch the userdata to the firebase realtime databse
   */
  useEffect(() => {
    const fetchData = () => {
      const userRef = ref(db, "users/");
      onValue(userRef, (snapshot) => {
        let obj = {};
        snapshot.forEach((user) => {
          if (auth.currentUser.uid === user.val().userid)
            obj = { ...user.val(), userKey: user.key };
        });
        setuserdata(obj);
      });
    };
    fetchData();
  }, []);

  //   cloudinary setup
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  // HANDLE PROFILE PICTURE UPLOAD
  const handleProfilePictureUpdate = () => {
    if (window.cloudinary) {
      cloudinary.openUploadWidget(
        {
          cloudName: "dazbaelpk",
          uploadPreset: "BoiPoka",
          googleApiKey: "AIzaSyDAkM28XiEySKD67TNnFxDPA4hkyp6YSpk",
          searchBySites: ["all", "cloudinary.com"],
          searchByRights: true,
          sources: [
            "local",
            "url",
            "camera",
            "dropbox",
            "image_search",
            "shutterstock",
            "gettyimages",
            "istock",
            "unsplash",
            "google_drive",
          ],
        },
        (error, result) => {
          if (error) {
            throw new Error("coudinary profile picture upload error");
          }
          if (result.info.secure_url) {
            update(ref(db, `users/${userdata.userKey}`), {
              profile_picture: result.info.secure_url,
            });
          }
        }
      );
    } else {
      throw new Error("Upload Failed");
    }
  };


  const { email, userid, username, profile_picture } = userdata;
  console.log(email);

  return (
    <div className="w-[18dvw] h-screen bg-white border-r border-gray-300 flex flex-col items-center py-6">
      {/* Top Profile */}
      <div className="flex flex-col items-center gap-2 mb-12">
        <div className="w-[70px] h-[70px] border-green-300 border-2 rounded-full relative cursor-pointer group">
          <picture>
            <img
              src={profile_picture}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </picture>
          <span
            onClick={handleProfilePictureUpdate}
            className="absolute  hidden group-hover:block left-1/3 top-1/2 -translate-y-1/2 text-white text-2xl"
          >
            <IoCloudUploadOutline />
          </span>
        </div>
        <p className="text-sm font-semibold text-gray-700 text-center">
          {username}
        </p>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col items-center gap-3 w-full">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;

          return (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className={`flex flex-row items-center gap-3 px-8 py-3 rounded-lg cursor-pointer w-[90%] transition duration-300 ${
                isActive ? "bg-[#92e3a9]" : "hover:bg-[#92e3a9]"
              }`}
            >
              <div
                className={`w-8 h-6 flex items-center justify-center text-gray-600 ${
                  isActive ? "text-white" : "group-hover:text-white"
                }`}
              >
                {item.icon}
              </div>

              <span
                className={`text-sm font-medium ${
                  isActive
                    ? "text-white"
                    : "text-gray-600 group-hover:text-white"
                }`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
