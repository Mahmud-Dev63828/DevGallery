import React, { useState, useEffect,  } from "react";
import {  ref, onValue } from "firebase/database";
import { db, auth } from "../../../Database/firebase.config";
import libery from "../../Libery/Lib";
import { setFirebaseData, uploadFile } from "../../Utils/upload.utils";
import { IoCloudUploadOutline } from "react-icons/io5";
const PostBlog = () => {
    const { InfoToast, SuccesToast, ErrorToast } = libery;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userData, setUserData] = useState({});
    const [postImg, setPostImg] = useState({});
 

    //  Fetch current user details from Firebase users/
    useEffect(() => {
        const userRef = ref(db, "users/");
        onValue(userRef, (snapshot) => {
            snapshot.forEach((child) => {
                if (child.val().userid === auth.currentUser?.uid) {
                    setUserData({ ...child.val(), userKey: child.key });
                }
            });
        });
    }, []);

    //   cloudunary setup
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    //  upload img function 
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
                        setPostImg(result.info.secure_url)
                    }
                }
            );
        } else {
            throw new Error("Upload Failed");
        }
    };

    //  Handle blog publish

    const handlePublish = async () => {
        if (!title || !content) {
            ErrorToast("title content requier");
            return;
        }

        const blogData = {
            title,
            content,

            userid: auth.currentUser?.uid,
            username: userData.username || "Unknown",
            profile_picture: userData.profile_picture || "",
            postImgLink: postImg,
        };

        try {
            await setFirebaseData("blogs/", blogData);
            SuccesToast(" Blog published!");
            setTitle("");
            setContent("");
            setPostImg('')
        } catch (error) {
            console.error(" Blog post error:", error);
            alert("Blog post failed");
        }
    };

    console.log(postImg);

    return (
        <div className="w-[48%] mx-auto mt-16 p-8 bg-white shadow-lg rounded-2xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Create Blog
            </h2>

            <form className="flex flex-col gap-6">
                {/* Title */}
                <div>
                    <label className="block mb-1 text-gray-700 font-medium">Title</label>
                    <input
                        type="text"
                        placeholder="Enter your blog title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block mb-1 text-gray-700 font-medium">
                        Content
                    </label>
                    <textarea
                        rows="6"
                        placeholder="Write your blog content here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    ></textarea>
                </div>
                {/* Cover Upload */}
                <div>
                    <div className="flex items-center">
                        <p className="mb-4">Upload Your File</p>
                        <span
                            onClick={handleProfilePictureUpdate}
                            className=" text-black ml-2.5 text-4xl cursor-pointer"
                        >
                            <IoCloudUploadOutline />
                        </span>
                    </div>
                    {postImg && typeof postImg === "string" && (
                        <img
                            src={postImg}
                            alt="Cover Preview"
                            className="w-20 h-28 object-cover rounded-lg shadow-md"
                        />
                    )}
                </div>

                {/* Publish Button */}
                <button
                    type="button"
                    onClick={handlePublish}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                >
                    Publish Blog
                </button>
            </form>
        </div>
    );
};

export default React.memo(PostBlog);
