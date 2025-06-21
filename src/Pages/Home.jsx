import React, { lazy, Suspense, useContext } from 'react'

import { ThemeContext } from '../Context/ThemeContext';
const BlogList = lazy(() => (import('../Components/HomePageComponent/BlogList')));
const PostBlog = lazy(() => (import('../Components/HomePageComponent/PostBlog')));

const Home = () => {
    const { mode, setMode } = useContext(ThemeContext);
    console.log(mode);
    //   handleTheme function
    const handleTheme = () => {
        setMode((prev) => {
            return prev == "light" ? "dark" : "light";
        });
    }
    return (
        <div className="">

            <button onClick={handleTheme} className={mode == "light" ? "bg-green-400 cursor-pointer text-black ml-180  py-3 px-8" : " bg-black py-3 cursor-pointer text-white px-8 ml-180"} >{mode}</button>

            <div className='flex'>
                <Suspense fallback={'Loading.....'}>

                 <PostBlog />
                </Suspense>
                <Suspense fallback={'Loading.....'}>
                    <BlogList />
                </Suspense>


            </div>
        </div>
    )
}

export default Home
