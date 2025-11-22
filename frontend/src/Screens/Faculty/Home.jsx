import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions";
import axiosWrapper from "../../utils/AxiosWrapper";
import { useNavigate, useLocation } from "react-router-dom";
import FacultyIcons from "../../components/FacultyIcons";

// Faculty panel menu items with professional SVG icons
const MENU_ITEMS = [
  { id: "profile", label: "Profile", icon: <FacultyIcons.Profile /> },
  { id: "courses", label: "Course Modules", icon: <FacultyIcons.Course /> },
  { id: "schedule", label: "Lecture Schedule", icon: <FacultyIcons.Schedule /> },
  { id: "attendance", label: "Attendance", icon: <FacultyIcons.Attendance /> },
  { id: "datesheet", label: "Datesheet", icon: <FacultyIcons.DateSheet /> },
  { id: "students", label: "Students List", icon: <FacultyIcons.Students /> },
];

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("userToken");

  // ==================== MODEL (STATE) ====================
  const [selectedMenu, setSelectedMenu] = useState("profile");
  const [profileData, setProfileData] = useState(null);
  
  // Course Modules State
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [selectedSubmodule, setSelectedSubmodule] = useState(null);
  const [selectedCourseDetail, setSelectedCourseDetail] = useState(null);
  const [courseModules, setCourseModules] = useState([
    {
      id: 1,
      name: "Pre Medical",
      icon: "🏥",
      submodules: [
        { id: 11, name: "Biology", icon: "🧬" },
        { id: 12, name: "Chemistry", icon: "⚗️" },
        { id: 13, name: "Physics", icon: "⚛️" },
        { id: 14, name: "English", icon: "📚" },
        { id: 15, name: "Urdu", icon: "📖" },
        { id: 16, name: "Islamic Studies", icon: "☪️" },
        { id: 17, name: "Pakistan Studies", icon: "🇵🇰" }
      ]
    },
    {
      id: 2,
      name: "Pre Engineering",
      icon: "⚙️",
      submodules: [
        { id: 21, name: "Mathematics", icon: "📐" },
        { id: 22, name: "Physics", icon: "⚛️" },
        { id: 23, name: "Chemistry", icon: "⚗️" },
        { id: 24, name: "English", icon: "📚" },
        { id: 25, name: "Urdu", icon: "📖" },
        { id: 26, name: "Islamic Studies", icon: "☪️" },
        { id: 27, name: "Pakistan Studies", icon: "🇵🇰" }
      ]
    },
    {
      id: 3,
      name: "ICS",
      icon: "💻",
      submodules: [
        { id: 31, name: "Computer Science", icon: "🖥️" },
        { id: 32, name: "Mathematics", icon: "📐" },
        { id: 33, name: "Physics", icon: "⚛️" },
        { id: 34, name: "English", icon: "📚" },
        { id: 35, name: "Urdu", icon: "📖" },
        { id: 36, name: "Islamic Studies", icon: "☪️" },
        { id: 37, name: "Pakistan Studies", icon: "🇵🇰" }
      ]
    }
  ]);

  // Lecture Schedule State
  const [scheduleData, setScheduleData] = useState([
    { day: "Monday", time: "8:00 - 9:00", subject: "Math", class: "Pre Engineering", room: "Room 101" },
    { day: "Monday", time: "9:00 - 10:00", subject: "Physics", class: "Pre Engineering", room: "Room 102" },
    { day: "Tuesday", time: "8:00 - 9:00", subject: "Chemistry", class: "Pre Medical", room: "Room 201" },
    { day: "Tuesday", time: "10:00 - 11:00", subject: "Biology", class: "Pre Medical", room: "Room 202" },
    { day: "Wednesday", time: "8:00 - 9:00", subject: "Computer Science", class: "ICS", room: "Room 301" },
    { day: "Wednesday", time: "11:00 - 12:00", subject: "Math", class: "ICS", room: "Room 101" },
    { day: "Thursday", time: "9:00 - 10:00", subject: "Math", class: "Pre Engineering", room: "Room 101" },
    { day: "Thursday", time: "10:00 - 11:00", subject: "Physics", class: "Pre Engineering", room: "Room 102" },
    { day: "Friday", time: "8:00 - 9:00", subject: "Biology", class: "Pre Medical", room: "Room 202" },
    { day: "Friday", time: "9:00 - 10:00", subject: "Chemistry", class: "Pre Medical", room: "Room 201" },
  ]);

  // Attendance State (MODEL)
  const [attendanceRecords, setAttendanceRecords] = useState([
    { 
      id: 1, 
      employeeId: "EMP001",
      name: "John Doe", 
      date: "2025-10-28", 
      checkIn: "08:00 AM", 
      checkOut: "04:00 PM", 
      status: "Present" 
    },
    { 
      id: 2, 
      employeeId: "EMP002",
      name: "Jane Smith", 
      date: "2025-10-27", 
      checkIn: "08:05 AM", 
      checkOut: "04:10 PM", 
      status: "Present" 
    },
  ]);
  const [showMarkAttendanceForm, setShowMarkAttendanceForm] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [markAttendanceForm, setMarkAttendanceForm] = useState({
    id: "",
    name: "",
    designation: "",
    company: "",
    attendanceDate: ""
  });
  const [leaveForm, setLeaveForm] = useState({
    id: "",
    name: "",
    designation: "",
    company: "",
    reason: "",
    attendanceDate: ""
  });

  // Students List State (MODEL)
  const [expandedStudentCourse, setExpandedStudentCourse] = useState(null);
  const [studentsData, setStudentsData] = useState([
    { 
      id: 1, 
      rollNo: "PE001", 
      name: "Ahmed Ali", 
      gender: "Male", 
      class: "Pre Engineering", 
      contact: "+92 300 1234567",
      email: "ahmed.ali@example.com",
      attendance: "95%", 
      image: null 
    },
    { 
      id: 2, 
      rollNo: "PE002", 
      name: "Fatima Khan", 
      gender: "Female", 
      class: "Pre Engineering", 
      contact: "+92 301 2345678",
      email: "fatima.khan@example.com",
      attendance: "92%", 
      image: null 
    },
    { 
      id: 3, 
      rollNo: "PE003", 
      name: "Hassan Raza", 
      gender: "Male", 
      class: "Pre Engineering", 
      contact: "+92 302 3456789",
      email: "hassan.raza@example.com",
      attendance: "89%", 
      image: null 
    },
    { 
      id: 4, 
      rollNo: "PM001", 
      name: "Hassan Ahmed", 
      gender: "Male", 
      class: "Pre Medical", 
      contact: "+92 303 4567890",
      email: "hassan.ahmed@example.com",
      attendance: "88%", 
      image: null 
    },
    { 
      id: 5, 
      rollNo: "PM002", 
      name: "Aisha Malik", 
      gender: "Female", 
      class: "Pre Medical", 
      contact: "+92 304 5678901",
      email: "aisha.malik@example.com",
      attendance: "97%", 
      image: null 
    },
    { 
      id: 6, 
      rollNo: "PM003", 
      name: "Sara Iqbal", 
      gender: "Female", 
      class: "Pre Medical", 
      contact: "+92 305 6789012",
      email: "sara.iqbal@example.com",
      attendance: "93%", 
      image: null 
    },
    { 
      id: 7, 
      rollNo: "ICS001", 
      name: "Ali Raza", 
      gender: "Male", 
      class: "ICS", 
      contact: "+92 306 7890123",
      email: "ali.raza@example.com",
      attendance: "90%", 
      image: null 
    },
    { 
      id: 8, 
      rollNo: "ICS002", 
      name: "Zainab Hassan", 
      gender: "Female", 
      class: "ICS", 
      contact: "+92 307 8901234",
      email: "zainab.hassan@example.com",
      attendance: "94%", 
      image: null 
    },
    { 
      id: 9, 
      rollNo: "ICS003", 
      name: "Bilal Ahmed", 
      gender: "Male", 
      class: "ICS", 
      contact: "+92 308 9012345",
      email: "bilal.ahmed@example.com",
      attendance: "91%", 
      image: null 
    },
  ]);

  // Course Detail State (for submodule content)
  const [courseDetailTab, setCourseDetailTab] = useState("info");
  const [assignmentsData, setAssignmentsData] = useState([
    { id: 1, title: "Assignment 1 - Introduction", totalMarks: 20, uploadDate: "2025-10-15", dueDate: "2025-10-25" },
    { id: 2, title: "Assignment 2 - Advanced Topics", totalMarks: 30, uploadDate: "2025-10-20", dueDate: "2025-11-05" },
    { id: 3, title: "Assignment 3 - Final Project", totalMarks: 50, uploadDate: "2025-10-25", dueDate: "2025-11-20" },
  ]);
  const [courseStudentsAttendance, setCourseStudentsAttendance] = useState([
    { id: 1, rollNo: "PE001", name: "Ahmed Ali", gender: "Male", status: "Present" },
    { id: 2, rollNo: "PE002", name: "Fatima Khan", gender: "Female", status: "Present" },
    { id: 3, rollNo: "PE003", name: "Hassan Raza", gender: "Male", status: "Absent" },
    { id: 4, rollNo: "PE004", name: "Zara Ahmed", gender: "Female", status: "Present" },
  ]);

  // ==================== CONTROLLER (HANDLERS) ====================
  
  // Profile fetch
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axiosWrapper.get("/faculty/my-details", {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        if (response.data.success) {
          setProfileData(response.data.data);
          dispatch(setUserData(response.data.data));
        }
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };

    fetchUserDetails();
  }, [dispatch, userToken]);

  // URL parameter handling
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const pathMenuId = urlParams.get("page") || "profile";
    const validMenu = MENU_ITEMS.find((item) => item.id === pathMenuId);
    setSelectedMenu(validMenu ? validMenu.id : "profile");
    
    // Reset sub-views when changing main menu
    setSelectedSubmodule(null);
    setSelectedCourseDetail(null);
  }, [location.search]);

  const handleMenuClick = (menuId) => {
    setSelectedMenu(menuId);
    navigate(`/faculty?page=${menuId}`);
  };

  // Small inline chart renderer (sparkline-like) - returns SVG element
  const Sparkline = ({ data = [], color = '#f28300' }) => {
    const max = Math.max(...data, 1);
    const w = 200; const h = 60; const step = w / Math.max(data.length - 1, 1);
    const points = data.map((v, i) => `${i * step},${h - (v / max) * (h - 8)}`).join(' ');
    return (
      <svg className="chart-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden>
        <polyline fill="none" stroke={color} strokeWidth="2" points={points} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userType");
    navigate("/");
  };

  // Course Modules Handlers
  const handleCourseToggle = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  const handleSubmoduleClick = (submodule) => {
    setSelectedSubmodule(submodule);
    setCourseDetailTab("info");
  };

  const handleBackToCourses = () => {
    setSelectedSubmodule(null);
  };

  // Attendance Handlers (CONTROLLER)
  const handleMarkAttendanceSubmit = (e) => {
    e.preventDefault();
    if (!markAttendanceForm.id || !markAttendanceForm.name || !markAttendanceForm.attendanceDate) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    // Add new attendance record
    const newRecord = {
      id: attendanceRecords.length + 1,
      employeeId: markAttendanceForm.id,
      name: markAttendanceForm.name,
      date: markAttendanceForm.attendanceDate,
      checkIn: timeString,
      checkOut: "-",
      status: "Present"
    };
    
    setAttendanceRecords(prev => [newRecord, ...prev]);
    toast.success(`Check-in marked for ${markAttendanceForm.name} at ${timeString}`, { icon: "✅" });
    
    // Reset form
    setMarkAttendanceForm({
      id: "",
      name: "",
      designation: "",
      company: "",
      attendanceDate: ""
    });
    setShowMarkAttendanceForm(false);
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    if (!leaveForm.id || !leaveForm.name || !leaveForm.reason || !leaveForm.attendanceDate) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("Leave application submitted successfully", { icon: "✅" });
    
    // Reset form
    setLeaveForm({ 
      id: "",
      name: "",
      designation: "",
      company: "",
      reason: "",
      attendanceDate: ""
    });
    setShowLeaveForm(false);
  };

  const handleMarkAttendanceFormChange = (field, value) => {
    setMarkAttendanceForm(prev => ({ ...prev, [field]: value }));
  };

  const handleLeaveFormChange = (field, value) => {
    setLeaveForm(prev => ({ ...prev, [field]: value }));
  };

  // Students List Handlers (CONTROLLER)
  const handleStudentCourseToggle = (courseId) => {
    setExpandedStudentCourse(expandedStudentCourse === courseId ? null : courseId);
  };

  // Course Attendance Handler
  const handleAttendanceStatusChange = (studentId, newStatus) => {
    setCourseStudentsAttendance(prev =>
      prev.map(student =>
        student.id === studentId ? { ...student, status: newStatus } : student
      )
    );
  };

  const handleSubmitAttendance = () => {
    toast.success("Attendance submitted successfully", { icon: "✅" });
  };

  // ==================== VIEW (RENDER FUNCTIONS) ====================

  // Profile Module
  const renderProfileModule = () => {
    const employeeData = profileData ? {
      employeeNo: profileData.employeeId || "N/A",
      name: `${profileData.firstName || ""} ${profileData.lastName || ""}`.trim() || "N/A",
      fatherName: profileData.fatherName || "N/A",
      department: profileData.department?.name || "N/A",
      designation: profileData.designation || "N/A",
      profilePicture: profileData.profile 
        ? `${process.env.REACT_APP_MEDIA_LINK}/${profileData.profile}`
        : null,
    } : null;

    if (!employeeData) {
      return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px", color: "#666", fontSize: "18px" }}>
          Loading profile data...
        </div>
      );
    }

    return (
      <div className="faculty-profile-container">
        <style>{`
          .faculty-profile-container { max-width:1200px; margin:0 auto; padding:24px; }
          .faculty-profile-header { position:relative; background:linear-gradient(135deg,#f28300,#ff9d4d); padding:30px 40px; border-radius:22px; color:#fff; box-shadow:0 6px 26px -8px rgba(242,131,0,.55),0 3px 8px rgba(0,0,0,.12); margin-bottom:34px; overflow:hidden; }
          .faculty-profile-header:after { content:''; position:absolute; inset:0; background:radial-gradient(circle at 80% 25%, rgba(255,255,255,.35), transparent 60%); }
          .faculty-panels { display:grid; grid-template-columns:repeat(auto-fit,minmax(360px,1fr)); gap:34px; }
          .faculty-panel { position:relative; background:linear-gradient(160deg,#ffffff 0%,#fffaf3 92%); border:1px solid #f3e2cc; border-radius:22px; padding:34px 36px 36px; box-shadow:0 6px 24px -8px rgba(0,0,0,.12); transition:transform .35s, box-shadow .35s; overflow:hidden; }
          .faculty-panel:before { content:''; position:absolute; top:-70px; right:-70px; width:180px; height:180px; background:linear-gradient(135deg,rgba(242,131,0,.35),rgba(255,157,77,.45)); filter:blur(46px); opacity:.4; }
          .faculty-panel:hover { transform:translateY(-6px); box-shadow:0 14px 36px -10px rgba(242,131,0,.35),0 6px 14px rgba(0,0,0,.08); }
          .faculty-panel h2 { font-size:20px; font-weight:700; color:#d97200; margin:0 0 22px; padding-bottom:14px; border-bottom:2px solid #ffe4cc; display:flex; align-items:center; gap:10px; }
          .faculty-panel h2:before { content:''; width:10px; height:10px; background:#f28300; border-radius:3px; box-shadow:0 0 0 4px rgba(242,131,0,.25); }
          .faculty-avatar { width:130px; height:130px; border-radius:50%; background:#fff; border:6px solid rgba(255,255,255,.65); box-shadow:0 10px 30px -8px rgba(242,131,0,.55),0 4px 12px rgba(0,0,0,.12), inset 0 0 0 4px rgba(255,255,255,.6); display:flex; align-items:center; justify-content:center; font-size:54px; font-weight:700; color:#f28300; position:relative; overflow:hidden; }
          .faculty-avatar[data-has-image='true'] { background-size:cover; background-position:center; color:transparent; }
          .faculty-avatar:after { content:''; position:absolute; inset:0; background:radial-gradient(circle at 28% 28%, rgba(255,255,255,.4), transparent 70%); }
          .center-fields { display:flex; flex-direction:column; gap:26px; align-items:center; }
          .field-block { width:100%; text-align:center; }
          .field-label { display:block; font-size:13px; font-weight:600; color:#6b5c4a; margin-bottom:6px; letter-spacing:.3px; }
          .field-value { font-size:18px; font-weight:600; color:#2f2f2f; margin:0; }
          .data-field { font-size:16px; font-weight:500; color:#333; margin:0; padding:12px 16px; background:#f8f9fa; border-radius:10px; border:1px solid #e0d6c5; }
          @media (max-width:900px){ .faculty-panels{ grid-template-columns:1fr; } }
        `}</style>

        <div className="faculty-profile-header">
          <h1 style={{margin:0,fontSize:30,fontWeight:700,letterSpacing:.5}}>Profile</h1>
          <div style={{fontSize:13,marginTop:6,opacity:.9,fontWeight:500}}>Manage your personal and employment information</div>
        </div>

        <div className="faculty-panels">
          <div className="faculty-panel">
            <h2>Personal Info</h2>
            <div className="center-fields">
              <div
                className="faculty-avatar"
                data-has-image={employeeData.profilePicture ? 'true' : 'false'}
                style={employeeData.profilePicture ? { backgroundImage:`url(${employeeData.profilePicture})` } : {}}
              >
                {!employeeData.profilePicture && (employeeData.name?.charAt(0)?.toUpperCase() || 'F')}
              </div>
              <div className="field-block">
                <label className="field-label">Name</label>
                <p className="field-value">{employeeData.name}</p>
              </div>
              <div className="field-block">
                <label className="field-label">Father's Name</label>
                <p className="field-value">{employeeData.fatherName}</p>
              </div>
            </div>
          </div>
          <div className="faculty-panel">
            <h2>Employee Information</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'18px'}}>
              <div>
                <label className="field-label" style={{textAlign:'left'}}>Employee No.</label>
                <p className="data-field">{employeeData.employeeNo}</p>
              </div>
              <div>
                <label className="field-label" style={{textAlign:'left'}}>Department</label>
                <p className="data-field">{employeeData.department}</p>
              </div>
              <div>
                <label className="field-label" style={{textAlign:'left'}}>Designation</label>
                <p className="data-field">{employeeData.designation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Course Modules - Main View
  const renderCourseModulesMain = () => (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <style>{`
        .course-header-enhanced { 
          position:relative; 
          background:linear-gradient(135deg,#f28300,#ff9d4d); 
          padding:28px 40px; 
          border-radius:20px; 
          color:#fff; 
          box-shadow:0 6px 28px -6px rgba(242,131,0,0.45),0 2px 6px rgba(0,0,0,0.08); 
          margin-bottom:32px; 
          overflow:hidden; 
        }
        .course-header-enhanced:after { 
          content:''; 
          position:absolute; 
          inset:0; 
          background:radial-gradient(circle at 80% 25%, rgba(255,255,255,0.35), transparent 60%); 
        }
        .course-header-enhanced h1 { 
          margin:0; 
          font-size:30px; 
          font-weight:700; 
          letter-spacing:.5px; 
          position:relative; 
          z-index:1; 
        }
        .course-card-enhanced { 
          position:relative; 
          background:linear-gradient(160deg,#ffffff 0%,#fffaf3 92%); 
          border:1px solid #f3e2cc; 
          border-radius:20px; 
          box-shadow:0 6px 24px -8px rgba(0,0,0,.12); 
          overflow:hidden; 
          margin-bottom:26px; 
          transition:box-shadow .35s; 
        }
        .course-card-enhanced:hover { 
          box-shadow:0 10px 32px -8px rgba(242,131,0,.28),0 6px 14px rgba(0,0,0,.08); 
        }
        .course-card-header { 
          background:linear-gradient(145deg,#fff7ee,#ffe9d1); 
          padding:24px 36px; 
          display:flex; 
          justify-content:space-between; 
          align-items:center; 
          cursor:pointer; 
          border-bottom:2px solid transparent; 
          transition:all .3s; 
        }
        .course-card-header.expanded { 
          border-bottom-color:#f28300; 
        }
        .course-card-header:hover { 
          background:linear-gradient(145deg,#fff5e6,#ffe4cc); 
        }
        .course-title-section { 
          display:flex; 
          align-items:center; 
          gap:18px; 
        }
        .course-icon-box { 
          font-size:38px; 
          filter:drop-shadow(0 3px 8px rgba(242,131,0,0.3)); 
        }
        .course-title { 
          font-size:22px; 
          font-weight:700; 
          color:#2f2f2f; 
          margin:0; 
          letter-spacing:.3px; 
        }
        .course-chevron { 
          font-size:24px; 
          color:#f28300; 
          transition:transform .35s cubic-bezier(.4,0,.2,1); 
        }
        .course-chevron.rotated { 
          transform:rotate(180deg); 
        }
        .submodules-container { 
          padding:0 36px; 
          display:none; 
          gap:22px; 
          flex-wrap:wrap; 
          max-height:0; 
          overflow:hidden; 
          transition:max-height .4s ease, padding .4s ease; 
        }
        .submodules-container.expanded { 
          display:flex; 
          padding:32px 36px; 
          max-height:1000px; 
        }
        .submodule-card { 
          position:relative; 
          background:linear-gradient(135deg,#f28300,#ff9d4d); 
          color:#fff; 
          padding:24px 32px; 
          border-radius:16px; 
          cursor:pointer; 
          display:flex; 
          align-items:center; 
          gap:14px; 
          font-size:18px; 
          font-weight:600; 
          transition:all .35s cubic-bezier(.4,0,.2,1); 
          box-shadow:0 6px 20px -6px rgba(242,131,0,0.45),0 2px 6px rgba(0,0,0,0.08); 
          overflow:hidden; 
        }
        .submodule-card:before { 
          content:''; 
          position:absolute; 
          inset:0; 
          background:radial-gradient(circle at 20% 50%, rgba(255,255,255,0.25), transparent 70%); 
        }
        .submodule-card:hover { 
          background:linear-gradient(135deg,#d97200,#f28300); 
          transform:translateY(-6px) scale(1.03); 
          box-shadow:0 12px 32px -8px rgba(242,131,0,0.55),0 6px 14px rgba(0,0,0,0.12); 
        }
        .submodule-icon { 
          font-size:32px; 
          filter:drop-shadow(0 2px 6px rgba(0,0,0,0.2)); 
          position:relative; 
          z-index:1; 
        }
      `}</style>
      {/* Header */}
      <div className="course-header-enhanced">
        <h1>Course Modules</h1>
      </div>

      {/* Course List */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {courseModules.map(course => (
          <div key={course.id} className="course-card-enhanced">
            {/* Course Header */}
            <div 
              onClick={() => handleCourseToggle(course.id)}
              className={`course-card-header ${expandedCourse === course.id ? 'expanded' : ''}`}
            >
              <div className="course-title-section">
                <span className="course-icon-box">{course.icon}</span>
                <h2 className="course-title">{course.name}</h2>
              </div>
              <span className={`course-chevron ${expandedCourse === course.id ? 'rotated' : ''}`}>
                ▼
              </span>
            </div>

            {/* Submodules */}
            <div className={`submodules-container ${expandedCourse === course.id ? 'expanded' : ''}`}>
              {expandedCourse === course.id && course.submodules.map(submodule => (
                <div
                  key={submodule.id}
                  onClick={() => handleSubmoduleClick(submodule)}
                  className="submodule-card"
                >
                  <span className="submodule-icon">{submodule.icon}</span>
                  {submodule.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Course Modules - Detail View (when submodule selected)
  const renderCourseModuleDetail = () => (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header with Back Button */}
      <div style={{ background: "#f28300", padding: "20px 30px", borderRadius: "12px", marginBottom: "30px", display: "flex", alignItems: "center", gap: "20px" }}>
        <button
          onClick={handleBackToCourses}
          style={{
            background: "white",
            color: "#f28300",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px"
          }}
        >
          ← Back
        </button>
        <h1 style={{ color: "white", fontSize: "28px", fontWeight: "bold", margin: 0 }}>
          {selectedSubmodule.icon} {selectedSubmodule.name}
        </h1>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        {["info", "resources", "assignments", "attendance", "announcements"].map(tab => (
          <button
            key={tab}
            onClick={() => setCourseDetailTab(tab)}
            style={{
              background: courseDetailTab === tab ? "#f28300" : "white",
              color: courseDetailTab === tab ? "white" : "#333",
              border: "2px solid #f28300",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "16px",
              transition: "all 0.2s",
              textTransform: "capitalize"
            }}
          >
            {tab === "info" ? "Course Information" : tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ background: "white", padding: "30px", borderRadius: "12px", border: "2px solid #f28300" }}>
        {courseDetailTab === "info" && (
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#333", marginBottom: "20px" }}>Course Information</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <label style={{ fontWeight: "600", color: "#666" }}>Course Code:</label>
                <p style={{ margin: "5px 0", color: "#333" }}>CS-{selectedSubmodule.id}</p>
              </div>
              <div>
                <label style={{ fontWeight: "600", color: "#666" }}>Instructor:</label>
                <p style={{ margin: "5px 0", color: "#333" }}>{profileData?.firstName} {profileData?.lastName}</p>
              </div>
              <div>
                <label style={{ fontWeight: "600", color: "#666" }}>Credit Hours:</label>
                <p style={{ margin: "5px 0", color: "#333" }}>3</p>
              </div>
              <div>
                <label style={{ fontWeight: "600", color: "#666" }}>Description:</label>
                <p style={{ margin: "5px 0", color: "#333" }}>
                  This course covers the fundamental concepts and practical applications of {selectedSubmodule.name}.
                  Students will learn through lectures, assignments, and hands-on projects.
                </p>
              </div>
            </div>
          </div>
        )}

        {courseDetailTab === "resources" && (
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#333", marginBottom: "20px" }}>Resources</h2>
            <div style={{ textAlign: "center", padding: "60px 20px", background: "#fff5e6", borderRadius: "8px" }}>
              <p style={{ fontSize: "18px", color: "#f28300", fontWeight: "600" }}>No Record Found</p>
            </div>
          </div>
        )}

        {courseDetailTab === "assignments" && (
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#333", marginBottom: "20px" }}>Assignments</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f28300", color: "white" }}>
                    <th style={{ padding: "15px", textAlign: "left", border: "1px solid #d66d0a" }}>Sr. No</th>
                    <th style={{ padding: "15px", textAlign: "left", border: "1px solid #d66d0a" }}>Title</th>
                    <th style={{ padding: "15px", textAlign: "left", border: "1px solid #d66d0a" }}>Total Marks</th>
                    <th style={{ padding: "15px", textAlign: "left", border: "1px solid #d66d0a" }}>Uploaded Date</th>
                    <th style={{ padding: "15px", textAlign: "left", border: "1px solid #d66d0a" }}>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {assignmentsData.map((assignment, index) => (
                    <tr key={assignment.id} style={{ background: index % 2 === 0 ? "#fff5e6" : "white" }}>
                      <td style={{ padding: "12px", border: "1px solid #f0d9b5" }}>{index + 1}</td>
                      <td style={{ padding: "12px", border: "1px solid #f0d9b5" }}>{assignment.title}</td>
                      <td style={{ padding: "12px", border: "1px solid #f0d9b5" }}>{assignment.totalMarks}</td>
                      <td style={{ padding: "12px", border: "1px solid #f0d9b5" }}>{assignment.uploadDate}</td>
                      <td style={{ padding: "12px", border: "1px solid #f0d9b5" }}>{assignment.dueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {courseDetailTab === "attendance" && (
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#333", marginBottom: "20px" }}>Attendance</h2>
            <div style={{ overflowX: "auto" }}>
              {/* Small Attendance bar chart */}
              <div className="ui-card" style={{marginBottom:12, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <div style={{fontSize:14, color:'#6b7280'}}>Class Attendance Overview</div>
                <svg width="140" height="40" viewBox="0 0 140 40" className="chart-svg" aria-hidden>
                  {[60,70,85,90,78].map((v,i)=>{
                    const bw = 18; const gap = 6; const x = i*(bw+gap);
                    const h = Math.max(2, (v/100)*32);
                    return (<rect key={i} x={x} y={40-h} width={bw} height={h} fill="#f28300" rx="3" />)
                  })}
                </svg>
              </div>
              <table className="table-hover" style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
                <thead>
                  <tr style={{ background: "#f28300", color: "white" }}>
                    <th className="sortable" style={{ padding: "15px", textAlign: "left", border: "1px solid #d66d0a" }}>Roll No <span style={{opacity:0.9}}>▾</span></th>
                    <th className="sortable" style={{ padding: "15px", textAlign: "left", border: "1px solid #d66d0a" }}>Name <span style={{opacity:0.9}}>▾</span></th>
                    <th style={{ padding: "15px", textAlign: "left", border: "1px solid #d66d0a" }}>Gender</th>
                    <th style={{ padding: "15px", textAlign: "left", border: "1px solid #d66d0a" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {courseStudentsAttendance.map((student, index) => (
                    <tr key={student.id} style={{ background: index % 2 === 0 ? "#fff5e6" : "white" }}>
                      <td style={{ padding: "12px", border: "1px solid #f0d9b5" }}>{student.rollNo}</td>
                      <td style={{ padding: "12px", border: "1px solid #f0d9b5" }}>{student.name}</td>
                      <td style={{ padding: "12px", border: "1px solid #f0d9b5" }}>{student.gender}</td>
                      <td style={{ padding: "12px", border: "1px solid #f0d9b5" }}>
                        <select
                          value={student.status}
                          onChange={(e) => handleAttendanceStatusChange(student.id, e.target.value)}
                          style={{
                            padding: "8px 12px",
                            borderRadius: "6px",
                            border: "2px solid #f28300",
                            background: student.status === "Present" ? "#d4edda" : "#f8d7da",
                            color: "#333",
                            fontWeight: "600",
                            cursor: "pointer"
                          }}
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={handleSubmitAttendance}
                style={{
                  background: "#f28300",
                  color: "white",
                  border: "none",
                  padding: "12px 30px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "16px"
                }}
              >
                Submit Attendance
              </button>
            </div>
          </div>
        )}

        {courseDetailTab === "announcements" && (
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#333", marginBottom: "20px" }}>Announcements</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div style={{ background: "#fff5e6", padding: "20px", borderRadius: "8px", border: "1px solid #f28300" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#333", marginBottom: "10px" }}>Mid-Term Examination</h3>
                <p style={{ color: "#666", marginBottom: "10px" }}>The mid-term examination will be held on November 15, 2025. Please prepare accordingly.</p>
                <small style={{ color: "#999" }}>Posted on: October 20, 2025</small>
              </div>
              <div style={{ background: "#fff5e6", padding: "20px", borderRadius: "8px", border: "1px solid #f28300" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#333", marginBottom: "10px" }}>Assignment Deadline Extension</h3>
                <p style={{ color: "#666", marginBottom: "10px" }}>Assignment 2 deadline has been extended to November 10, 2025.</p>
                <small style={{ color: "#999" }}>Posted on: October 25, 2025</small>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Lecture Schedule Module
  const renderLectureSchedule = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const times = ["8:00 - 9:00", "9:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00"];

    return (
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ background: "#f28300", padding: "20px 30px", borderRadius: "12px", marginBottom: "30px" }}>
          <h1 style={{ color: "white", fontSize: "28px", fontWeight: "bold", margin: 0 }}>Lecture Schedule</h1>
        </div>

        {/* Schedule Table */}
        <div style={{ background: "white", padding: "30px", borderRadius: "12px", border: "2px solid #f28300", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: "15px", background: "#f28300", color: "white", border: "2px solid #d66d0a", fontWeight: "bold" }}>Time / Day</th>
                {days.map(day => (
                  <th key={day} style={{ padding: "15px", background: "#f28300", color: "white", border: "2px solid #d66d0a", fontWeight: "bold" }}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time, timeIndex) => (
                <tr key={time}>
                  <td style={{ padding: "15px", background: "#fff5e6", border: "2px solid #f0d9b5", fontWeight: "600", color: "#333" }}>{time}</td>
                  {days.map(day => {
                    const lecture = scheduleData.find(l => l.day === day && l.time === time);
                    return (
                      <td key={day} style={{ padding: "15px", border: "2px solid #f0d9b5", background: lecture ? "#ffe6e6" : "white" }}>
                        {lecture ? (
                          <div>
                            <div style={{ fontWeight: "bold", color: "#333", marginBottom: "5px" }}>{lecture.subject}</div>
                            <div style={{ fontSize: "14px", color: "#666" }}>{lecture.class}</div>
                            <div style={{ fontSize: "12px", color: "#999" }}>{lecture.room}</div>
                          </div>
                        ) : (
                          <div style={{ textAlign: "center", color: "#ccc" }}>-</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Attendance Module
  // Attendance Module (VIEW)
  const renderAttendance = () => (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ background: "#f28300", padding: "20px 30px", borderRadius: "12px", marginBottom: "30px" }}>
        <h1 style={{ color: "white", fontSize: "28px", fontWeight: "bold", margin: 0 }}>Attendance</h1>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "30px", flexWrap: "wrap" }}>
        <button
          onClick={() => setShowMarkAttendanceForm(!showMarkAttendanceForm)}
          style={{
            background: "#28a745",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <span style={{ fontSize: "20px" }}>+</span> Attendance
        </button>
        <button
          onClick={() => setShowLeaveForm(!showLeaveForm)}
          style={{
            background: "#28a745",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <span style={{ fontSize: "20px" }}>+</span> Leave
        </button>
      </div>

      {/* Attendance Records Table */}
      <div style={{ background: "white", padding: "30px", borderRadius: "12px", border: "2px solid #f28300", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#333", marginBottom: "20px" }}>Attendance Listing</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f28300", color: "white" }}>
                <th style={{ padding: "15px", textAlign: "left", border: "1px solid #d66d0a" }}>Sr. #</th>
                <th style={{ padding: "15px", textAlign: "left", border: "1px solid #d66d0a" }}>ID</th>
                <th style={{ padding: "15px", textAlign: "left", border: "1px solid #d66d0a" }}>Name</th>
                <th style={{ padding: "15px", textAlign: "left", border: "1px solid #d66d0a" }}>Date</th>
                <th style={{ padding: "15px", textAlign: "left", border: "1px solid #d66d0a" }}>Check IN</th>
                <th style={{ padding: "15px", textAlign: "left", border: "1px solid #d66d0a" }}>Check OUT</th>
                <th style={{ padding: "15px", textAlign: "left", border: "1px solid #d66d0a" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, index) => (
                <tr key={record.id} style={{ background: index % 2 === 0 ? "#fff5e6" : "white" }}>
                  <td style={{ padding: "12px", border: "1px solid #f0d9b5" }}>{index + 1}</td>
                  <td style={{ padding: "12px", border: "1px solid #f0d9b5" }}>{record.employeeId}</td>
                  <td style={{ padding: "12px", border: "1px solid #f0d9b5" }}>{record.name}</td>
                  <td style={{ padding: "12px", border: "1px solid #f0d9b5" }}>{record.date}</td>
                  <td style={{ padding: "12px", border: "1px solid #f0d9b5" }}>{record.checkIn}</td>
                  <td style={{ padding: "12px", border: "1px solid #f0d9b5" }}>{record.checkOut}</td>
                  <td style={{ padding: "12px", border: "1px solid #f0d9b5" }}>
                    <span style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontWeight: "600",
                      background: record.status === "Present" ? "#d4edda" : record.status === "Late" ? "#fff3cd" : "#f8d7da",
                      color: record.status === "Present" ? "#155724" : record.status === "Late" ? "#856404" : "#721c24"
                    }}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mark Attendance Form */}
      {showMarkAttendanceForm && (
        <div style={{ background: "white", padding: "30px", borderRadius: "12px", border: "2px solid #f28300", marginBottom: "30px" }}>
          <div style={{ background: "#f28300", padding: "15px 20px", borderRadius: "8px 8px 0 0", margin: "-30px -30px 20px -30px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "white", margin: 0 }}>Mark Attendance</h2>
          </div>
          <form onSubmit={handleMarkAttendanceSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
              <div>
                <label style={{ display: "block", fontWeight: "600", color: "#666", marginBottom: "8px" }}>ID *</label>
                <input
                  type="text"
                  value={markAttendanceForm.id}
                  onChange={(e) => handleMarkAttendanceFormChange("id", e.target.value)}
                  className="input-focus"
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px", boxSizing: "border-box" }}
                  placeholder="Enter ID"
                  required
                />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: "600", color: "#666", marginBottom: "8px" }}>Name *</label>
                <input
                  type="text"
                  value={markAttendanceForm.name}
                  onChange={(e) => handleMarkAttendanceFormChange("name", e.target.value)}
                  className="input-focus"
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px", boxSizing: "border-box" }}
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: "600", color: "#666", marginBottom: "8px" }}>Designation</label>
                <input
                  type="text"
                  value={markAttendanceForm.designation}
                  onChange={(e) => handleMarkAttendanceFormChange("designation", e.target.value)}
                  className="input-focus"
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px", boxSizing: "border-box" }}
                  placeholder="Enter Designation"
                />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: "600", color: "#666", marginBottom: "8px" }}>Company</label>
                <input
                  type="text"
                  value={markAttendanceForm.company}
                  onChange={(e) => handleMarkAttendanceFormChange("company", e.target.value)}
                  className="input-focus"
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px", boxSizing: "border-box" }}
                  placeholder="Enter Company"
                />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: "600", color: "#666", marginBottom: "8px" }}>Attendance Date *</label>
                <input
                  type="date"
                  value={markAttendanceForm.attendanceDate}
                  onChange={(e) => handleMarkAttendanceFormChange("attendanceDate", e.target.value)}
                  className="input-focus"
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px", boxSizing: "border-box" }}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn-orange" style={{ marginTop:20, background:'#28a745', boxShadow:'0 6px 18px rgba(40,167,69,0.12)' }}>
              Mark CheckIN
            </button>
          </form>
        </div>
      )}

      {/* Leave Form */}
      {showLeaveForm && (
        <div style={{ background: "white", padding: "30px", borderRadius: "12px", border: "2px solid #f28300", marginBottom: "30px" }}>
          <div style={{ background: "#f28300", padding: "15px 20px", borderRadius: "8px 8px 0 0", margin: "-30px -30px 20px -30px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "white", margin: 0 }}>Leave Request</h2>
          </div>
          <form onSubmit={handleLeaveSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
              <div>
                <label style={{ display: "block", fontWeight: "600", color: "#666", marginBottom: "8px" }}>ID *</label>
                <input
                  type="text"
                  value={leaveForm.id}
                  onChange={(e) => handleLeaveFormChange("id", e.target.value)}
                  style={{ 
                    width: "100%", 
                    padding: "12px", 
                    borderRadius: "8px", 
                    border: "1px solid #ddd", 
                    fontSize: "16px",
                    boxSizing: "border-box"
                  }}
                  placeholder="Enter ID"
                  required
                />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: "600", color: "#666", marginBottom: "8px" }}>Name *</label>
                <input
                  type="text"
                  value={leaveForm.name}
                  onChange={(e) => handleLeaveFormChange("name", e.target.value)}
                  style={{ 
                    width: "100%", 
                    padding: "12px", 
                    borderRadius: "8px", 
                    border: "1px solid #ddd", 
                    fontSize: "16px",
                    boxSizing: "border-box"
                  }}
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: "600", color: "#666", marginBottom: "8px" }}>Designation</label>
                <input
                  type="text"
                  value={leaveForm.designation}
                  onChange={(e) => handleLeaveFormChange("designation", e.target.value)}
                  style={{ 
                    width: "100%", 
                    padding: "12px", 
                    borderRadius: "8px", 
                    border: "1px solid #ddd", 
                    fontSize: "16px",
                    boxSizing: "border-box"
                  }}
                  placeholder="Enter Designation"
                />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: "600", color: "#666", marginBottom: "8px" }}>Company</label>
                <input
                  type="text"
                  value={leaveForm.company}
                  onChange={(e) => handleLeaveFormChange("company", e.target.value)}
                  className="input-focus"
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px", boxSizing: "border-box" }}
                  placeholder="Enter Company"
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontWeight: "600", color: "#666", marginBottom: "8px" }}>Reason *</label>
                <textarea
                  value={leaveForm.reason}
                  onChange={(e) => handleLeaveFormChange("reason", e.target.value)}
                  rows={4}
                  className="input-focus"
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "16px", resize: "vertical", boxSizing: "border-box" }}
                  placeholder="Enter reason for leave..."
                  required
                />
              </div>
              <div>
                <label style={{ display: "block", fontWeight: "600", color: "#666", marginBottom: "8px" }}>Attendance Date *</label>
                <input
                  type="date"
                  value={leaveForm.attendanceDate}
                  onChange={(e) => handleLeaveFormChange("attendanceDate", e.target.value)}
                  style={{ 
                    width: "100%", 
                    padding: "12px", 
                    borderRadius: "8px", 
                    border: "1px solid #ddd", 
                    fontSize: "16px",
                    boxSizing: "border-box"
                  }}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn-orange" style={{ marginTop:20, background:'#28a745', boxShadow:'0 6px 18px rgba(40,167,69,0.12)' }}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );

  // Datesheet Module
  const renderDatesheet = () => (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ background: "#f28300", padding: "20px 30px", borderRadius: "12px", marginBottom: "30px" }}>
        <h1 style={{ color: "white", fontSize: "28px", fontWeight: "bold", margin: 0 }}>Datesheet</h1>
      </div>

      {/* Not Available Message */}
      <div style={{ background: "#fff5e6", padding: "80px 30px", borderRadius: "12px", border: "2px solid #f28300", textAlign: "center" }}>
        <div style={{ fontSize: "64px", marginBottom: "20px" }}>📄</div>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#f28300", marginBottom: "10px" }}>Not Available</h2>
        <p style={{ fontSize: "18px", color: "#666" }}>Datesheet information is currently not available. Please check back later.</p>
      </div>
    </div>
  );

  // Students List - Main View
  // Students List - Main View (VIEW)
  const renderStudentsListMain = () => {
    // Group students by course
    const getStudentsByCourse = (courseName) => {
      return studentsData.filter(student => student.class === courseName);
    };

    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ background: "#f28300", padding: "20px 30px", borderRadius: "12px", marginBottom: "16px", display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <h1 style={{ color: "white", fontSize: "28px", fontWeight: "bold", margin: 0 }}>Students List</h1>
            <div className="breadcrumb" style={{color:'rgba(255,255,255,0.9)'}}>
              <a href="#" onClick={(e)=>{e.preventDefault(); setSelectedMenu('profile')}}>Home</a>
              <span>/</span>
              <span>Students</span>
            </div>
          </div>
          <div>
            <button className="btn-orange" onClick={() => { setExpandedStudentCourse(null); window.scrollTo({top:0, behavior:'smooth'}) }} style={{background:'rgba(255,255,255,0.12)'}}>
              Refresh
            </button>
          </div>
        </div>

        {/* Course Accordion with Student Lists */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {courseModules.map(course => {
            const courseStudents = getStudentsByCourse(course.name);
            const isExpanded = expandedStudentCourse === course.id;

            return (
              <div key={course.id} style={{ background: "white", borderRadius: "12px", border: "2px solid #f28300", overflow: "hidden", boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)" }}>
                {/* Course Header - Accordion Trigger */}
                <div 
                  onClick={() => handleStudentCourseToggle(course.id)}
                  style={{
                    background: "#fff5e6",
                    padding: "20px 30px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    borderBottom: isExpanded ? "2px solid #f28300" : "none"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#ffe4cc"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#fff5e6"}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <span style={{ fontSize: "32px" }}>{course.icon}</span>
                    <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "#333", margin: 0 }}>{course.name}</h2>
                    <span style={{ 
                      background: "#f28300", 
                      color: "white", 
                      padding: "4px 12px", 
                      borderRadius: "20px", 
                      fontSize: "14px",
                      fontWeight: "600"
                    }}>
                      {courseStudents.length} Students
                    </span>
                  </div>
                  <span style={{ 
                    fontSize: "24px", 
                    color: "#f28300", 
                    transition: "transform 0.3s", 
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    display: "inline-block"
                  }}>
                    ▼
                  </span>
                </div>

                {/* Student List - Accordion Content */}
                {isExpanded && (
                  <div style={{ padding: "0", maxHeight: "500px", overflowY: "auto", background: "white" }} className="accordion slide-down">
                    {courseStudents.length > 0 ? (
                      courseStudents.map((student, index) => (
                        <div key={student.id} className="ui-card" style={{display:'flex', alignItems:'center', padding:'16px 20px', borderBottom: index < courseStudents.length - 1 ? '1px solid #f0d9b5' : 'none', gap:20}}>
                          {/* Student Avatar Icon */}
                          <div className="avatar-circle" style={{width:50,height:50, background:'linear-gradient(135deg,#f28300 0%,#ff9d4d 100%)', color:'#fff', border:'3px solid #fff5e6'}}>
                            {student.name.charAt(0).toUpperCase()}
                          </div>

                          {/* Student Info - Vertical Layout */}
                          <div style={{ 
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px"
                          }}>
                            {/* Name */}
                            <div style={{ 
                              fontSize: "18px", 
                              fontWeight: "bold", 
                              color: "#333"
                            }}>
                              {student.name}
                            </div>

                            {/* Contact & Email in horizontal layout */}
                            <div style={{
                              display: "flex",
                              gap: "30px",
                              flexWrap: "wrap",
                              alignItems: "center"
                            }}>
                              {/* Contact Number */}
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#666", fontSize: "15px" }}>
                                <span style={{ fontSize: "16px" }}>📞</span>
                                <span>{student.contact}</span>
                              </div>

                              {/* Email */}
                              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#666", fontSize: "15px" }}>
                                <span style={{ fontSize: "16px" }}>✉️</span>
                                <span>{student.email}</span>
                              </div>
                            </div>
                          </div>

                          {/* Roll Number Badge */}
                          <div style={{
                            background: "#fff5e6",
                            color: "#f28300",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            fontWeight: "600",
                            fontSize: "14px",
                            border: "1px solid #f28300"
                          }}>
                            {student.rollNo}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{
                        padding: "40px",
                        textAlign: "center",
                        color: "#999",
                        fontSize: "16px"
                      }}>
                        No students found in this course
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Main Content Router
  const renderContent = () => {
    // Course Modules
    if (selectedMenu === "courses") {
      if (selectedSubmodule) {
        return renderCourseModuleDetail();
      }
      return renderCourseModulesMain();
    }

    // Students List
    if (selectedMenu === "students") {
      return renderStudentsListMain();
    }

    // Other Modules
    switch (selectedMenu) {
      case "profile":
        return renderProfileModule();
      case "schedule":
        return renderLectureSchedule();
      case "attendance":
        return renderAttendance();
      case "datesheet":
        return renderDatesheet();
      default:
        return renderProfileModule();
    }
  };

  return (
    <>
      <style>{`
        .faculty-topbar {
          position: fixed;
          top: 0;
          left: 260px;
          right: 0;
          height: 60px;
          background: linear-gradient(135deg, #f28300 0%, #ff9d4d 100%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          z-index: 999;
        }

        .faculty-user-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .faculty-notification {
          position: relative;
          cursor: pointer;
          color: white;
          font-size: 20px;
          transition: transform 0.2s;
        }

        .faculty-notification:hover {
          transform: scale(1.1);
        }

        .faculty-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: white;
          color: #f28300;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 16px;
        }

        .faculty-logout-btn {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid white;
          padding: 8px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .faculty-logout-btn:hover {
          background: white;
          color: #f28300;
        }

        .faculty-main-content {
          margin-left: 260px;
          margin-top: 60px;
          padding: 30px;
          min-height: calc(100vh - 60px);
          background: #f8f9fa;
        }

        @media (max-width: 768px) {
          .faculty-topbar {
            left: 70px;
          }
          .faculty-main-content {
            margin-left: 70px;
          }
        }
      `}</style>

      <Sidebar 
        activeMenu={selectedMenu}
        onMenuChange={handleMenuClick}
        menuItems={MENU_ITEMS}
        userType="faculty"
      />

      <div className="faculty-topbar">
        <div className="breadcrumb" style={{color:'rgba(255,255,255,0.9)', marginTop:6}}>
          <a href="#" onClick={(e)=>{e.preventDefault(); setSelectedMenu('profile')}}>Home</a>
          <span>/</span>
          <span>{MENU_ITEMS.find(item => item.id === selectedMenu)?.label || 'Profile'}</span>
        </div>
        <div className="faculty-user-section">
          <div className="avatar-circle" style={{width:38,height:38,fontSize:14,marginRight:8}}>
            {profileData?.firstName?.charAt(0)?.toUpperCase() || 'F'}
          </div>
          <div className="faculty-notification" title="Notifications">
            🔔
          </div>
            <div className="faculty-notification" title="Logout" onClick={handleLogout}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H10C11.1 21 12 20.1 12 19V17H10V19H5V5H10V7H12V5C12 3.9 11.1 3 10 3ZM14 8L12.59 9.41L14.17 11H8V13H14.17L12.59 14.59L14 16L18 12L14 8Z"/>
              </svg>
            </div>
        </div>
      </div>

      <div className="faculty-main-content">
        {renderContent()}
      </div>

      <Toaster position="bottom-center" />
    </>
  );
};

export default Home;

