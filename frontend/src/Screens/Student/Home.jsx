import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { toast, Toaster } from "react-hot-toast";
import Notice from "../Notice";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions";
import axiosWrapper from "../../utils/AxiosWrapper";
import Timetable from "./Timetable";
import Material from "./Material";
import Profile from "./Profile";
import Course from "./Course";
import DateSheet from "./DateSheet";
import Calender from "./Calender";
import FeedBack from "./FeedBack";
import FeeVoucher from "./FeeVoucher";
import Exam from "../Exam";
import ViewMarks from "./ViewMarks";
import { useNavigate, useLocation } from "react-router-dom";
import StudentIcons from "../../components/StudentIcons";

// Exact module names from Concordia College CMS PDF Page 2
const MENU_ITEMS = [
  { id: "profile", label: "Profile", icon: <StudentIcons.Profile />, component: null },
  { id: "course", label: "Course", icon: <StudentIcons.Course />, component: Course },
  { id: "timetable", label: "TimeTable", icon: <StudentIcons.Timetable />, component: Timetable },
  { id: "datesheet", label: "DateSheet", icon: <StudentIcons.DateSheet />, component: DateSheet },
  { id: "calender", label: "Calender", icon: <StudentIcons.Calendar />, component: Calender },
  { id: "feedback", label: "FeedBack", icon: <StudentIcons.Feedback />, component: FeedBack },
  { id: "feevoucher", label: "Fee Voucher", icon: <StudentIcons.FeeVoucher />, component: FeeVoucher },
];

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("profile");
  const [profileData, setProfileData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("userToken");
  const location = useLocation();
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    setIsLoading(true);
    try {
      toast.loading("Loading user details...");
      const response = await axiosWrapper.get(`/student/my-details`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.data.success) {
        setProfileData(response.data.data);
        dispatch(setUserData(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Error fetching user details"
      );
    } finally {
      setIsLoading(false);
      toast.dismiss();
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [dispatch, userToken]);


  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">Loading...</div>
      );
    }

    if (selectedMenu === "profile" && profileData) {
      return <Profile profileData={profileData} />;
    }

    const MenuItem = MENU_ITEMS.find(
      (item) => item.id === selectedMenu
    )?.component;

    return MenuItem ? <MenuItem /> : null;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
     const pathMenuId = urlParams.get("page") || "profile";
    const validMenu = MENU_ITEMS.find((item) => item.id === pathMenuId);
     setSelectedMenu(validMenu ? validMenu.id : "profile");
  }, [location.pathname]);

  const handleMenuClick = (menuId) => {
    setSelectedMenu(menuId);
    navigate(`/student?page=${menuId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <>
      <style>{`
        .topbar {
          position: fixed;
          top: 0;
          left: 260px;
          right: 0;
          height: 60px;
          background: linear-gradient(135deg, #f28300 0%, #ff9d4d 100%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          z-index: 999;
        }
        .topbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .topbar-icon {
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .topbar-icon:hover {
          background: rgba(255,255,255,0.3);
          transform: scale(1.05);
        }
        .topbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        @media (max-width: 768px) {
          .topbar { left: 70px; }
        }
      `}</style>

      <Sidebar 
        activeMenu={selectedMenu}
        onMenuChange={handleMenuClick}
        menuItems={MENU_ITEMS}
        userType="student"
      />

      {/* Orange Topbar */}
      <div className="topbar">
        <div className="topbar-left">
          <div style={{display:'flex', flexDirection:'column'}}>
            <div style={{fontSize:18, fontWeight:700, color:'#fff'}}>Student Portal</div>
            <div className="breadcrumb" style={{color:'rgba(255,255,255,0.9)', marginTop:6}}>
              <a href="#" onClick={(e)=>{e.preventDefault(); setSelectedMenu('profile')}}>Home</a>
              <span>/</span>
              <span>{MENU_ITEMS.find(item => item.id === selectedMenu)?.label || 'Profile'}</span>
            </div>
          </div>
        </div>
        <div className="topbar-right">
          <div className="topbar-icon" title="Messages">
            ✉️
          </div>
          <div className="topbar-icon" title="Notifications">
            🔔
          </div>
            <div className="topbar-icon" title="Logout" onClick={handleLogout}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H10C11.1 21 12 20.1 12 19V17H10V19H5V5H10V7H12V5C12 3.9 11.1 3 10 3ZM14 8L12.59 9.41L14.17 11H8V13H14.17L12.59 14.59L14 16L18 12L14 8Z"/>
              </svg>
            </div>
        </div>
      </div>
    
      {/* Main content area with left margin for sidebar and top margin for topbar */}
      <div style={{ marginLeft: '260px', marginTop: '60px', minHeight: 'calc(100vh - 60px)', background: '#f9fafb' }}>
        <div className="max-w-7xl mx-auto p-6">
          {renderContent()}
        </div>
      </div>
    
      <Toaster position="bottom-center" />
    </>
  );
};

export default Home;

