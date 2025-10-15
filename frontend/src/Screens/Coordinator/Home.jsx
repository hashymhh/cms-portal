import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import Notice from "../Notice";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions";
import axiosWrapper from "../../utils/AxiosWrapper";
import Profile from "./Profile";
import Timetable from "./Timetable";
import Material from "./Material";
import Exam from "../Exam";
import { useNavigate, useLocation } from "react-router-dom";

const MENU_ITEMS = [
  { id: "home", label: "Home", component: Profile },
  { id: "timetable", label: "Timetable", component: Timetable },
  { id: "material", label: "Material", component: Material },
  { id: "notice", label: "Notice", component: Notice },
  { id: "exam", label: "Exam", component: Exam },
];

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState("home");
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const userToken = localStorage.getItem("userToken");

  const fetchUserDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axiosWrapper.get("/coordinator/my-details");
      if (response.data.success) {
        setProfileData(response.data.message);
        dispatch(setUserData(response.data.message));
      } else {
        toast.error(response.data.message || "Failed to fetch profile");
      }
    } catch (error) {
      console.error("Error fetching coordinator details:", error);
      toast.error("Failed to fetch coordinator details");
      if (error.response?.status === 401) {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userType");
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userToken) {
      fetchUserDetails();
    } else {
      navigate("/login");
    }
  }, [dispatch, userToken, navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const pathMenuId = urlParams.get("page") || "home";
    const validMenu = MENU_ITEMS.find((item) => item.id === pathMenuId);
    setSelectedMenu(validMenu ? validMenu.id : "home");
  }, [location.search]);

  const getMenuItemClass = (menuId) => {
    const isSelected = selectedMenu === menuId;
    return `
      text-center px-6 py-3 cursor-pointer
      font-medium text-sm w-full
      rounded-md
      transition-all duration-300 ease-in-out
      ${
        isSelected
          ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg transform -translate-y-1"
          : "bg-green-50 text-green-700 hover:bg-green-100"
      }
    `;
  };

  const renderContent = () => {
    try {
      if (isLoading) {
        return (
          <div className="flex justify-center items-center h-64">Loading...</div>
        );
      }
      
      // Special handling for home/profile page
      if (selectedMenu === "home") {
        if (!profileData) {
          return <div className="flex justify-center items-center h-64">Loading profile...</div>;
        }
        return <Profile profileData={profileData} />;
      }
      
      // Render other menu items
      const menuItem = MENU_ITEMS.find((item) => item.id === selectedMenu);
      if (!menuItem) {
        console.error("Menu item not found:", selectedMenu);
        return <div className="text-center text-red-500 p-4">Menu item not found: {selectedMenu}</div>;
      }
      const MenuItem = menuItem.component;
      console.log("Rendering menu item:", selectedMenu, MenuItem);
      return <MenuItem />;
    } catch (error) {
      console.error("Error rendering content:", error);
      return <div className="text-center text-red-500 p-4">Error: {error.message}</div>;
    }
  };

  const handleMenuClick = (menuId) => {
    setSelectedMenu(menuId);
    navigate(`/coordinator?page=${menuId}`);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Coordinator Dashboard
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>Welcome to the Coordinator portal. You can manage timetables, materials, notices, and exams based on your permissions.</p>
              </div>
            </div>
          </div>
        </div>

        <ul className="flex justify-evenly items-center gap-10 w-full mx-auto my-8">
          {MENU_ITEMS.map((item) => (
            <li
              key={item.id}
              className={getMenuItemClass(item.id)}
              onClick={() => handleMenuClick(item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
        {renderContent()}
      </div>
      <Toaster position="bottom-center" />
    </>
  );
};

export default Home;