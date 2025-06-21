import React, { createContext, useState } from "react";

const BlogContext = createContext();

const BlogProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <BlogContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </BlogContext.Provider>
  );
};

export { BlogContext, BlogProvider };
