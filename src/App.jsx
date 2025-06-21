import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import CommonLayout from "./Components/CommonLayout";
import Home from "./Pages/Home";
import { ThemeProvider } from "./Context/ThemeContext";
// import SignIn from "./Pages/SignIn";
// import Sidebar from "./Components/CommonComponents/Sidebar";
// import Home from "./Pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<CommonLayout />}>
            <Route index element={<Home />} />
          
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
