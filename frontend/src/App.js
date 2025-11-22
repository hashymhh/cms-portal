import React from "react";
import Login from "./Screens/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import mystore from "./redux/store";
import StudentHome from "./Screens/Student/Home";
import FacultyHome from "./Screens/Faculty/Home";
import AdminHome from "./Screens/Admin/Home";
import CoordinatorHome from "./Screens/Coordinator/Home";
import ForgetPassword from "./Screens/ForgetPassword";
import UpdatePassword from "./Screens/UpdatePassword";
// import ModernCMS_UI from "./utils/ModernUI";

const App = () => {
  // Initialize Modern UI enhancements
  // useEffect(() => {
  //   // Initialize the Modern UI system
  //   window.modernCMS = new ModernCMS_UI();
    
  //   // Cleanup on unmount
  //   return () => {
  //     // Remove any event listeners if needed
  //   };
  // }, []);

  return (
    <>
      <Provider store={mystore}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route
              path="/:type/update-password/:resetId"
              element={<UpdatePassword />}
            />
            <Route path="student" element={<StudentHome />} />
            <Route path="faculty" element={<FacultyHome />} />
            <Route path="admin" element={<AdminHome />} />
            <Route path="coordinator" element={<CoordinatorHome />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
