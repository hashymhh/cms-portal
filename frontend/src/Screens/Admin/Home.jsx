import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { toast, Toaster } from "react-hot-toast";
import Notice from "../Notice";
import Student from "./Student";
import Faculty from "./Faculty";
import Subjects from "./Subject";
import Admin from "./Admin";
import Branch from "./Branch";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions";
import axiosWrapper from "../../utils/AxiosWrapper";
import Profile from "./Profile";
import Exam from "../Exam";
import { useNavigate, useLocation } from "react-router-dom";

// Admin panel modules with orange/white theme
const MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "🏠", component: Profile },
  { id: "departments", label: "Departments", icon: "🏢", component: Branch },
  { id: "users", label: "User Management", icon: "👥", component: Admin },
  { id: "students", label: "Students", icon: "🎓", component: Student },
  { id: "faculty", label: "Faculty", icon: "👨‍🏫", component: Faculty },
  { id: "subjects", label: "Subjects", icon: "📚", component: Subjects },
  { id: "timetable", label: "Timetable", icon: "📅", component: null },
  { id: "exams", label: "Exams", icon: "📝", component: Exam },
  { id: "reports", label: "Reports & Analytics", icon: "📊", component: null },
  { id: "finance", label: "Finance", icon: "💸", component: null },
  { id: "announcements", label: "Announcements", icon: "📢", component: Notice },
  { id: "settings", label: "Settings", icon: "⚙️", component: null },
];

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [profileData, setProfileData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("userToken");

  const fetchUserDetails = async () => {
    setIsLoading(true);
    try {
      toast.loading("Loading user details...");
      const response = await axiosWrapper.get(`/admin/my-details`, {
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

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const pathMenuId = urlParams.get("page") || "dashboard";
    const validMenu = MENU_ITEMS.find((item) => item.id === pathMenuId);
    setSelectedMenu(validMenu ? validMenu.id : "dashboard");
  }, [location.pathname]);

  // --- Inline Admin Dashboard view (MVP) - no new files ---
  const enrollmentSample = [20, 28, 34, 45, 60, 55, 72, 80, 95, 110, 130];
  const performanceSample = [78, 82, 69, 91, 87]; // percent scores for classes
  const alerts = [
    { id: 1, type: 'Payment', message: '2 students pending fee payment', time: '1h ago' },
    { id: 2, type: 'System', message: 'Scheduled maintenance tomorrow 2:00 AM', time: '3h ago' },
    { id: 3, type: 'Exam', message: 'Date sheet published for Semester 1', time: '1d ago' },
  ];
  const recentActivity = [
    { id: 1, who: 'Admission', action: 'New student Ayesha Khan enrolled', time: '2 hours ago' },
    { id: 2, who: 'Faculty', action: 'Dr. Fatima uploaded material for ICS', time: '5 hours ago' },
    { id: 3, who: 'Finance', action: 'Voucher #248503958 issued', time: '1 day ago' },
  ];

  const renderDashboard = () => {
    const maxEnroll = Math.max(...enrollmentSample);
    const points = enrollmentSample.map((v, i) => `${(i / (enrollmentSample.length - 1)) * 100},${100 - (v / maxEnroll) * 100}`).join(' ');

    return (
      <div className="space-y-6">
        {/* Overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-lg shadow flex flex-col">
            <div className="text-sm font-semibold text-gray-500">Total Students</div>
            <div className="text-2xl font-bold text-gray-800 mt-2">1,248</div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow flex flex-col">
            <div className="text-sm font-semibold text-gray-500">Active Courses</div>
            <div className="text-2xl font-bold text-gray-800 mt-2">24</div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow flex flex-col">
            <div className="text-sm font-semibold text-gray-500">Faculty Members</div>
            <div className="text-2xl font-bold text-gray-800 mt-2">18</div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow flex flex-col">
            <div className="text-sm font-semibold text-gray-500">Total Revenue</div>
            <div className="text-2xl font-bold text-gray-800 mt-2">PKR 2,450,000</div>
          </div>
        </div>

        {/* Enrollment trend + Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Enrollment Trend</h3>
              <div className="text-sm text-gray-500">Last 11 months</div>
            </div>
            <div style={{height:160}} className="w-full flex items-center">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <polyline fill="none" stroke="#FF6B35" strokeWidth="2" points={points} />
              </svg>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">System Alerts</h3>
            <ul className="space-y-3">
              {alerts.map(a => (
                <li key={a.id} className="flex items-start gap-3">
                  <div className="w-2 h-8 rounded bg-orange-300 mt-1" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800">{a.type}</div>
                    <div className="text-sm text-gray-600">{a.message}</div>
                    <div className="text-xs text-gray-400">{a.time}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Class Performance graph */}
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Class Performance</h3>
            <div className="text-sm text-gray-500">Average Scores</div>
          </div>
          <div className="flex items-end gap-4 h-40">
            {performanceSample.map((v, idx) => (
              <div key={idx} className="flex-1 h-full">
                <div className="w-full bg-orange-100 rounded-t-md" style={{height:`${v}%`}} />
                <div className="text-center text-sm mt-2 text-gray-600">Class {idx+1}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</h3>
          <ul className="space-y-3">
            {recentActivity.map(a => (
              <li key={a.id} className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-800">{a.who}</div>
                  <div className="text-sm text-gray-600">{a.action}</div>
                </div>
                <div className="text-xs text-gray-400">{a.time}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">Loading...</div>
      );
    }

    // Show admin dashboard (MVP) when dashboard is selected
    if (selectedMenu === "dashboard") {
      return renderDashboard();
    }

    const MenuItem = MENU_ITEMS.find(
      (item) => item.id === selectedMenu
    )?.component;

    return MenuItem ? <MenuItem /> : (
      <div className="text-center p-8 text-gray-500">
        Module under development
      </div>
    );
  };

  const handleMenuClick = (menuId) => {
    setSelectedMenu(menuId);
    navigate(`/admin?page=${menuId}`);
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
          background: linear-gradient(135deg, #FF6B35 0%, #ff8555 100%);
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
      />

      {/* Orange Topbar */}
      <div className="topbar">
        <div className="topbar-left">
          {/* Empty left side */}
        </div>
        <div className="topbar-right">
          <div className="topbar-icon" title="Messages">
            ✉️
          </div>
          <div className="topbar-icon" title="Notifications">
            🔔
          </div>
          <div className="topbar-icon" onClick={handleLogout} title="Profile">
            👤
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
