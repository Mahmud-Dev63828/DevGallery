import React, { useContext, useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../../Database/firebase.config";
import { ThemeContext } from "../../Context/ThemeContext";

const BlogList = () => {
    const { mode, setMode } = useContext(ThemeContext);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);


    //   fetch blogs Data using onvalue
    useEffect(() => {
        const blogRef = ref(db, "blogs/");
        const unsubscribe = onValue(blogRef, (snapshot) => {
            const blogData = [];
            snapshot.forEach((childSnapshot) => {
                const blog = childSnapshot.val();
                blogData.push({ id: childSnapshot.key, ...blog });
            });

            setBlogs(blogData.reverse());
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className={mode == "light" ? "w-[48%] mx-auto mt-10 text-black bg-white" : "w-[48%] text-white mx-auto mt-10 bg-gray-700"}>
            <h2 className="text-2xl font-bold mb-4  text-center">
                All Blogs
            </h2>

            {loading ? (
                <p className="text-center  text-lg animate-pulse">
                    Loading blogs...
                </p>
            ) : blogs.length === 0 ? (
                <p className="text-center "> No blogs found.</p>
            ) : (
                <div className="flex flex-col gap-6 max-h-[600px] overflow-y-scroll pr-2">
                    {blogs.map((blog) => (
                        <div
                            key={blog.id}
                            className=" rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
                        >
                            {/*  User Info */}
                            <div className="flex items-center gap-3 mb-4">
                                <img
                                    src={
                                        blog.profile_picture || "https://i.pravatar.cc/150?img=1"
                                    }
                                    alt={blog.username || "User"}
                                    className="w-10 h-10 rounded-full object-cover border"
                                />
                                <p className=" font-semibold">
                                    {blog.username || "userName Missing"}
                                </p>
                            </div>

                            {/*  Blog Content */}
                            <h3 className="text-xl font-bold  mb-2">
                                {blog.title}
                            </h3>
                            <p className=" text-sm">{blog.content}</p>
                            <picture >
                                <img className="mt-2" src={blog.postImgLink} alt="" />
                            </picture>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default React.memo(BlogList);