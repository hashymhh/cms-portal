import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
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

// Line-style SVG icons for Coordinator Panel
const LineIcon = ({ d }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const MENU_ITEMS = [
  { 
    id: "dashboard", 
    label: "Dashboard", 
    component: Profile,
    icon: <LineIcon d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
  },
  { 
    id: "attendance", 
    label: "Attendance", 
    component: Profile,
    icon: <LineIcon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  },
  { 
    id: "marks", 
    label: "Marks Management", 
    component: Exam,
    icon: <LineIcon d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M20 17l-4-4M20 17l-4 4M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  },
  { 
    id: "announcements", 
    label: "Announcements", 
    component: Notice,
    icon: <LineIcon d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM13 8H7M13 12H7" />
  },
  { 
    id: "schedule", 
    label: "Class Schedule", 
    component: Timetable,
    icon: <LineIcon d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 2v4M8 2v4M3 10h18" />
  },
  { 
    id: "feedback", 
    label: "Feedback & Tickets", 
    component: Material,
    icon: <LineIcon d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zM14 2v5h5M10 9H8M16 13H8M16 17H8" />
  },
  { 
    id: "audit", 
    label: "Audit Log", 
    component: Material,
    icon: <LineIcon d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
  },
  { 
    id: "settings", 
    label: "Settings", 
    component: Profile,
    icon: <LineIcon d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  },
];

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const userToken = localStorage.getItem("userToken");

  // Dashboard data model
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 245,
    totalFaculty: 18,
    totalCourses: 12,
    attendanceRate: 87.5,
    weeklyAttendance: [85, 90, 82, 88, 95], // Week 1-5
    weeklyAnnouncements: [3, 5, 2, 4, 7], // Week 1-5
    recentAnnouncements: [
      {
        id: 1,
        title: "Semester Exam Schedule Released",
        description: "The semester exam schedule has been released. Please check the portal for details.",
        author: "Dr. Saqib Kumar",
        date: "2024-10-22",
        status: "active"
      },
      {
        id: 2,
        title: "Library Extended Hours",
        description: "The library will remain open until 10 PM during exam season.",
        author: "Admin",
        date: "2024-10-24",
        status: "active"
      },
      {
        id: 3,
        title: "Campus Maintenance Notice",
        description: "Building A will be under maintenance from Oct 28-30.",
        author: "Facilities",
        date: "2024-10-23",
        status: "inactive"
      }
    ]
  });

  // Attendance Management data model
  const [attendanceData, setAttendanceData] = useState({
    selectedDate: new Date().toISOString().split('T')[0],
    selectedCourse: 'all',
    selectedSection: 'all',
    students: [
      { id: 1, name: "Ahmed Ali", rollNo: "CS-001", course: "Computer Science", status: "present" },
      { id: 2, name: "Fatima Khan", rollNo: "CS-002", course: "Computer Science", status: "present" },
      { id: 3, name: "Hassan Raza", rollNo: "CS-003", course: "Computer Science", status: "present" },
      { id: 4, name: "Ayesha Malik", rollNo: "BUS-001", course: "Business Admin", status: "present" },
      { id: 5, name: "Bilal Ahmed", rollNo: "BUS-002", course: "Business Admin", status: "present" },
      { id: 6, name: "Sara Khan", rollNo: "ENG-001", course: "Engineering", status: "present" },
      { id: 7, name: "Omar Tariq", rollNo: "ENG-002", course: "Engineering", status: "present" },
      { id: 8, name: "Zainab Hussain", rollNo: "CS-004", course: "Computer Science", status: "present" },
      { id: 9, name: "Ali Hassan", rollNo: "CS-005", course: "Computer Science", status: "present" },
      { id: 10, name: "Nida Fatima", rollNo: "BUS-003", course: "Business Admin", status: "present" },
    ]
  });

  const [attendanceStats, setAttendanceStats] = useState({
    total: 10,
    present: 10,
    absent: 0,
    rate: 100
  });

  // Marks Management data model
  const [marksData, setMarksData] = useState({
    selectedStudent: 1,
    students: [
      { id: 1, name: "Ahmed Ali", studentId: "CS-001", totalMarks: 425 },
      { id: 2, name: "Fatima Khan", studentId: "CS-002", totalMarks: 450 },
      { id: 3, name: "Hassan Raza", studentId: "CS-003", totalMarks: 380 },
      { id: 4, name: "Ayesha Malik", studentId: "BUS-001", totalMarks: 410 },
      { id: 5, name: "Bilal Ahmed", studentId: "BUS-002", totalMarks: 395 },
      { id: 6, name: "Sara Khan", studentId: "ENG-001", totalMarks: 465 },
      { id: 7, name: "Omar Tariq", studentId: "ENG-002", totalMarks: 420 },
    ],
    subjects: [
      { id: 1, subject: "Mathematics", midterm: 38, final: 42, assignment: 18, total: 98 },
      { id: 2, subject: "Physics", midterm: 35, final: 40, assignment: 17, total: 92 },
      { id: 3, subject: "Chemistry", midterm: 40, final: 45, assignment: 19, total: 104 },
      { id: 4, subject: "English", midterm: 37, final: 41, assignment: 16, total: 94 },
      { id: 5, subject: "Computer Science", midterm: 42, final: 48, assignment: 20, total: 110 },
    ],
    gradeStats: [
      { grade: "A+", range: "90-100", count: 45 },
      { grade: "A", range: "80-89", count: 38 },
      { grade: "B", range: "70-79", count: 28 },
      { grade: "C", range: "60-69", count: 15 },
      { grade: "D", range: "50-59", count: 8 },
    ]
  });

  // Announcements data model
  const [announcementsData, setAnnouncementsData] = useState({
    announcements: [
      {
        id: 1,
        title: "Mid-Semester Exam Schedule",
        description: "The mid-semester exams will be held from November 5-15. Please check the detailed timetable on the portal.",
        date: "2024-10-25",
        priority: "unknown"
      },
      {
        id: 2,
        title: "Library Hours Extended",
        description: "The library will now remain open until 10 PM on weekdays to support students during exam preparation.",
        date: "2024-10-23",
        priority: "unknown"
      },
      {
        id: 3,
        title: "Sports Day Announcement",
        description: "Annual sports day will be celebrated on November 20. All students are encouraged to participate.",
        date: "2024-10-20",
        priority: "unknown"
      }
    ],
    totalCount: 3,
    highPriorityCount: 0,
    lastUpdated: "2024-10-25"
  });

  // Schedule data model
  const [scheduleData, setScheduleData] = useState({
    selectedDay: "Monday",
    selectedProfessor: "All",
    professors: [
      "All",
      "Dr. Rajesh Kumar",
      "Prof. Meera Singh",
      "Dr. Ankit Sharma",
      "Prof. Priya Patel"
    ],
    schedule: {
      Monday: [
        { id: 1, module: "CS201", time: "08:00 - 09:30", section: "A", professor: "Dr. Rajesh Kumar", room: "Room 101" },
        { id: 2, module: "CS202", time: "10:00 - 11:30", section: "B", professor: "Prof. Meera Singh", room: "Room 203" },
        { id: 3, module: "CS203", time: "12:00 - 13:30", section: "A", professor: "Dr. Ankit Sharma", room: "Room 305" },
        { id: 4, module: "CS204", time: "14:00 - 15:30", section: "C", professor: "Prof. Priya Patel", room: "Room 402" }
      ],
      Tuesday: [
        { id: 5, module: "CS202", time: "08:00 - 09:30", section: "A", professor: "Prof. Meera Singh", room: "Room 203" },
        { id: 6, module: "CS201", time: "10:00 - 11:30", section: "B", professor: "Dr. Rajesh Kumar", room: "Room 101" },
        { id: 7, module: "CS204", time: "12:00 - 13:30", section: "A", professor: "Prof. Priya Patel", room: "Room 402" },
        { id: 8, module: "CS203", time: "14:00 - 15:30", section: "B", professor: "Dr. Ankit Sharma", room: "Room 305" }
      ],
      Wednesday: [
        { id: 9, module: "CS203", time: "08:00 - 09:30", section: "C", professor: "Dr. Ankit Sharma", room: "Room 305" },
        { id: 10, module: "CS204", time: "10:00 - 11:30", section: "B", professor: "Prof. Priya Patel", room: "Room 402" },
        { id: 11, module: "CS201", time: "12:00 - 13:30", section: "A", professor: "Dr. Rajesh Kumar", room: "Room 101" },
        { id: 12, module: "CS202", time: "14:00 - 15:30", section: "C", professor: "Prof. Meera Singh", room: "Room 203" }
      ],
      Thursday: [
        { id: 13, module: "CS204", time: "08:00 - 09:30", section: "A", professor: "Prof. Priya Patel", room: "Room 402" },
        { id: 14, module: "CS203", time: "10:00 - 11:30", section: "B", professor: "Dr. Ankit Sharma", room: "Room 305" },
        { id: 15, module: "CS202", time: "12:00 - 13:30", section: "A", professor: "Prof. Meera Singh", room: "Room 203" },
        { id: 16, module: "CS201", time: "14:00 - 15:30", section: "C", professor: "Dr. Rajesh Kumar", room: "Room 101" }
      ],
      Friday: [
        { id: 17, module: "CS201", time: "08:00 - 09:30", section: "B", professor: "Dr. Rajesh Kumar", room: "Room 101" },
        { id: 18, module: "CS203", time: "10:00 - 11:30", section: "A", professor: "Dr. Ankit Sharma", room: "Room 305" },
        { id: 19, module: "CS204", time: "12:00 - 13:30", section: "B", professor: "Prof. Priya Patel", room: "Room 402" },
        { id: 20, module: "CS202", time: "14:00 - 15:30", section: "A", professor: "Prof. Meera Singh", room: "Room 203" }
      ]
    },
    timeSlots: ["08:00 - 09:30", "10:00 - 11:30", "12:00 - 13:30", "14:00 - 15:30"]
  });

  // Feedback & Tickets data model
  const [feedbackData, setFeedbackData] = useState({
    selectedTab: "feedback", // 'feedback' or 'tickets'
    subjectRatings: [
      { id: 1, subject: "Computer Science", code: "CS201", avgRating: 4.5, totalFeedback: 45, professor: "Dr. Rajesh Kumar" },
      { id: 2, subject: "Data Structures", code: "CS202", avgRating: 4.2, totalFeedback: 38, professor: "Prof. Meera Singh" },
      { id: 3, subject: "Database Systems", code: "CS203", avgRating: 4.7, totalFeedback: 42, professor: "Dr. Ankit Sharma" },
      { id: 4, subject: "Web Development", code: "CS204", avgRating: 4.3, totalFeedback: 40, professor: "Prof. Priya Patel" },
      { id: 5, subject: "Software Engineering", code: "CS301", avgRating: 4.6, totalFeedback: 35, professor: "Dr. Rajesh Kumar" },
      { id: 6, subject: "Operating Systems", code: "CS302", avgRating: 4.1, totalFeedback: 33, professor: "Prof. Meera Singh" }
    ],
    supportTickets: [
      {
        id: 1,
        ticketNumber: "TKT-1001",
        subject: "Attendance Discrepancy",
        description: "Student reports attendance not marked for Oct 20th lecture",
        student: "Rahul Sharma",
        studentId: "STU-2021-001",
        priority: "high",
        status: "open",
        category: "Attendance",
        dateCreated: "2024-10-24",
        lastUpdated: "2024-10-25"
      },
      {
        id: 2,
        ticketNumber: "TKT-1002",
        subject: "Marks Correction Request",
        description: "Request to review midterm exam marks for CS202",
        student: "Priya Menon",
        studentId: "STU-2021-045",
        priority: "medium",
        status: "in-progress",
        category: "Marks",
        dateCreated: "2024-10-23",
        lastUpdated: "2024-10-25"
      },
      {
        id: 3,
        ticketNumber: "TKT-1003",
        subject: "Class Schedule Conflict",
        description: "Two classes scheduled at the same time on Thursday",
        student: "Amit Patel",
        studentId: "STU-2021-089",
        priority: "medium",
        status: "open",
        category: "Schedule",
        dateCreated: "2024-10-22",
        lastUpdated: "2024-10-24"
      },
      {
        id: 4,
        ticketNumber: "TKT-1004",
        subject: "Material Access Issue",
        description: "Unable to download lecture notes for Week 5",
        student: "Sneha Reddy",
        studentId: "STU-2021-112",
        priority: "low",
        status: "resolved",
        category: "Materials",
        dateCreated: "2024-10-21",
        lastUpdated: "2024-10-23"
      },
      {
        id: 5,
        ticketNumber: "TKT-1005",
        subject: "Exam Date Clarification",
        description: "Confusion regarding final exam date for CS203",
        student: "Karthik Kumar",
        studentId: "STU-2021-156",
        priority: "high",
        status: "open",
        category: "Exams",
        dateCreated: "2024-10-20",
        lastUpdated: "2024-10-25"
      }
    ],
    ticketStats: {
      total: 5,
      open: 3,
      inProgress: 1,
      resolved: 1
    }
  });

    // Audit Log data model
    const [auditLogData, setAuditLogData] = useState({
      searchQuery: "",
      selectedActionFilter: "All Actions",
      actionTypes: [
        "All Actions",
        "Attendance Updated",
        "Marks Entered",
        "Announcement Posted",
        "Schedule Modified",
        "Ticket Resolved"
      ],
      activities: [
        {
          id: 1,
          title: "Attendance Updated",
          action: "Attendance Updated",
          user: "Dr. Rajesh Kumar",
          userRole: "Coordinator",
          details: "Marked attendance for CS201 - Section A (25 students present)",
          date: "2024-10-26",
          time: "09:30 AM",
          timestamp: "2024-10-26T09:30:00"
        },
        {
          id: 2,
          title: "Marks Entered",
          action: "Marks Entered",
          user: "Prof. Meera Singh",
          userRole: "Faculty",
          details: "Uploaded midterm marks for CS202 - Section B (30 students)",
          date: "2024-10-26",
          time: "08:15 AM",
          timestamp: "2024-10-26T08:15:00"
        },
        {
          id: 3,
          title: "Announcement Posted",
          action: "Announcement Posted",
          user: "Dr. Rajesh Kumar",
          userRole: "Coordinator",
          details: 'Posted announcement: "Mid-Semester Exam Schedule Released"',
          date: "2024-10-25",
          time: "04:45 PM",
          timestamp: "2024-10-25T16:45:00"
        },
        {
          id: 4,
          title: "Schedule Modified",
          action: "Schedule Modified",
          user: "Dr. Rajesh Kumar",
          userRole: "Coordinator",
          details: "Updated class schedule - CS203 moved to Room 305",
          date: "2024-10-25",
          time: "02:30 PM",
          timestamp: "2024-10-25T14:30:00"
        },
        {
          id: 5,
          title: "Ticket Resolved",
          action: "Ticket Resolved",
          user: "Dr. Rajesh Kumar",
          userRole: "Coordinator",
          details: "Resolved support ticket TKT-1004 - Material Access Issue",
          date: "2024-10-25",
          time: "11:20 AM",
          timestamp: "2024-10-25T11:20:00"
        },
        {
          id: 6,
          title: "Attendance Updated",
          action: "Attendance Updated",
          user: "Prof. Priya Patel",
          userRole: "Faculty",
          details: "Marked attendance for CS204 - Section C (28 students present)",
          date: "2024-10-24",
          time: "03:00 PM",
          timestamp: "2024-10-24T15:00:00"
        },
        {
          id: 7,
          title: "Marks Entered",
          action: "Marks Entered",
          user: "Dr. Ankit Sharma",
          userRole: "Faculty",
          details: "Uploaded assignment marks for CS203 - All sections",
          date: "2024-10-24",
          time: "10:45 AM",
          timestamp: "2024-10-24T10:45:00"
        },
        {
          id: 8,
          title: "Schedule Modified",
          action: "Schedule Modified",
          user: "Dr. Rajesh Kumar",
          userRole: "Coordinator",
          details: "Added new lab session for CS201 on Friday 10:00 AM",
          date: "2024-10-23",
          time: "01:15 PM",
          timestamp: "2024-10-23T13:15:00"
        },
        {
          id: 9,
          title: "Announcement Posted",
          action: "Announcement Posted",
          user: "Dr. Rajesh Kumar",
          userRole: "Coordinator",
          details: 'Posted announcement: "Library Extended Hours"',
          date: "2024-10-23",
          time: "09:00 AM",
          timestamp: "2024-10-23T09:00:00"
        },
        {
          id: 10,
          title: "Attendance Updated",
          action: "Attendance Updated",
          user: "Prof. Meera Singh",
          userRole: "Faculty",
          details: "Marked attendance for CS202 - Section A (32 students present)",
          date: "2024-10-22",
          time: "02:30 PM",
          timestamp: "2024-10-22T14:30:00"
        }
      ],
      stats: {
        totalActivities: 10,
        todayActivities: 2,
        uniqueUsers: 4
      }
    });

  // Settings data model
  const [settingsData, setSettingsData] = useState({
    institution: {
      name: "Concordia College",
      email: "admin@concordia.edu",
      phone: "+1 (555) 012-3456",
      address: "123 College Ave, Township, State, 12345"
    },
    notifications: {
      email: true,
      sms: false,
      attendanceReminders: true,
      marksNotifications: true
    },
    display: {
      language: "English (US)",
      timezone: "GMT+05:30 Asia/Kolkata"
    },
    security: {
      twoFAEnabled: false,
      activeSessions: [
        { id: 1, device: "Windows 11 - Edge", ip: "192.168.1.24", location: "Local", lastActive: "2025-10-26 10:22" },
        { id: 2, device: "Android Phone - Chrome", ip: "10.0.0.5", location: "Local", lastActive: "2025-10-25 21:47" }
      ]
    }
  });

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

  // Render Settings View
  const renderSettings = () => {
    return (
      <div className="space-y-6">
        {/* Page Title */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Configure institution, notifications, display, security, and data preferences</p>
        </div>

        {/* Institution Settings */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#FF6600]">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Institution Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
              <input
                type="text"
                value={settingsData.institution.name}
                onChange={(e) => handleInstitutionChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent"
                placeholder="Enter institution name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={settingsData.institution.email}
                onChange={(e) => handleInstitutionChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent"
                placeholder="Enter contact email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                value={settingsData.institution.phone}
                onChange={(e) => handleInstitutionChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent"
                placeholder="Enter contact phone"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={settingsData.institution.address}
                onChange={(e) => handleInstitutionChange('address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent"
                placeholder="Enter address"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#FF6600]">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={settingsData.notifications.email} onChange={() => handleNotificationToggle('email')} />
              <span className="text-gray-700">Email Notifications</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={settingsData.notifications.sms} onChange={() => handleNotificationToggle('sms')} />
              <span className="text-gray-700">SMS Notifications</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={settingsData.notifications.attendanceReminders} onChange={() => handleNotificationToggle('attendanceReminders')} />
              <span className="text-gray-700">Attendance Reminders</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={settingsData.notifications.marksNotifications} onChange={() => handleNotificationToggle('marksNotifications')} />
              <span className="text-gray-700">Marks Notifications</span>
            </label>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#FF6600]">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Display Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select
                value={settingsData.display.language}
                onChange={(e) => handleDisplayChange('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent bg-white"
              >
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Hindi</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select
                value={settingsData.display.timezone}
                onChange={(e) => handleDisplayChange('timezone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent bg-white"
              >
                <option>GMT+05:30 Asia/Kolkata</option>
                <option>GMT+00:00 UTC</option>
                <option>GMT-05:00 America/New_York</option>
                <option>GMT+01:00 Europe/London</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#FF6600]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Security Settings</h3>
            <div className="flex gap-2">
              <button onClick={handleChangePassword} className="px-4 py-2 bg-[#FF6600] hover:bg-[#ff7a1a] text-white rounded-lg font-medium transition">Change Password</button>
              <button onClick={handleToggle2FA} className="px-4 py-2 bg-gray-800 hover:bg-black text-white rounded-lg font-medium transition">
                {settingsData.security.twoFAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Active Sessions</h4>
            <div className="space-y-3">
              {settingsData.security.activeSessions.map((s) => (
                <div key={s.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-4 text-sm text-gray-700">
                    <span className="font-medium">{s.device}</span>
                    <span className="text-gray-500">IP: {s.ip}</span>
                    <span className="text-gray-500">{s.location}</span>
                    <span className="text-gray-500">Last Active: {s.lastActive}</span>
                  </div>
                  <button onClick={() => handleTerminateSession(s.id)} className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm">Terminate</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#FF6600]">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Management</h3>
          <div className="flex flex-wrap gap-3">
            <button onClick={handleBackupData} className="px-4 py-2 bg-[#FF6600] hover:bg-[#ff7a1a] text-white rounded-lg font-medium transition">Backup Data</button>
            <button onClick={handleExportData} className="px-4 py-2 bg-[#FF6600] hover:bg-[#ff7a1a] text-white rounded-lg font-medium transition">Export Data</button>
            <button onClick={handleClearCache} className="px-4 py-2 bg-gray-800 hover:bg-black text-white rounded-lg font-medium transition">Clear Cache</button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button onClick={handleSaveSettings} className="px-6 py-3 bg-[#FF6600] hover:bg-[#ff7a1a] text-white rounded-lg font-semibold transition">Save Settings</button>
        </div>
      </div>
    );
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
    const pathMenuId = urlParams.get("page") || "dashboard";
    const validMenu = MENU_ITEMS.find((item) => item.id === pathMenuId);
    setSelectedMenu(validMenu ? validMenu.id : "dashboard");
  }, [location.search]);

  // Quick Actions handlers
  const handleMarkAttendance = () => {
    toast.success("Navigating to Mark Attendance");
    setSelectedMenu("attendance");
    navigate("/coordinator?page=attendance");
  };

  const handleUploadMarks = () => {
    toast.success("Navigating to Upload Marks");
    setSelectedMenu("marks");
    navigate("/coordinator?page=marks");
  };

  const handlePostAnnouncement = () => {
    toast.success("Navigating to Post Announcement");
    setSelectedMenu("announcements");
    navigate("/coordinator?page=announcements");
  };

  const handleViewReports = () => {
    toast.info("Reports feature coming soon");
  };

  // Attendance Management handlers
  const handleDateChange = (e) => {
    setAttendanceData({ ...attendanceData, selectedDate: e.target.value });
  };

  const handleCourseChange = (e) => {
    setAttendanceData({ ...attendanceData, selectedCourse: e.target.value });
    updateAttendanceStats();
  };

  const handleSectionChange = (e) => {
    setAttendanceData({ ...attendanceData, selectedSection: e.target.value });
  };

  const toggleAttendance = (studentId) => {
    setAttendanceData({
      ...attendanceData,
      students: attendanceData.students.map(s => 
        s.id === studentId 
          ? { ...s, status: s.status === 'present' ? 'absent' : 'present' }
          : s
      )
    });
    // Recalculate stats
    setTimeout(updateAttendanceStats, 0);
  };

  const updateAttendanceStats = () => {
    const filtered = attendanceData.students.filter(s => 
      (attendanceData.selectedCourse === 'all' || s.course === attendanceData.selectedCourse)
    );
    const present = filtered.filter(s => s.status === 'present').length;
    const total = filtered.length;
    const absent = total - present;
    const rate = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
    
    setAttendanceStats({ total, present, absent, rate: parseFloat(rate) });
  };

  const handleSaveAttendance = async () => {
    try {
      toast.loading("Saving attendance...");
      // API call would go here
      // await axiosWrapper.post('/coordinator/attendance', attendanceData);
      setTimeout(() => {
        toast.dismiss();
        toast.success("Attendance saved successfully!");
      }, 1000);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to save attendance");
    }
  };

  const handleExportCSV = () => {
    toast.success("Exporting CSV...");
    // CSV export logic
  };

  const handleSummaryReport = () => {
    toast.info("Generating summary report...");
    // Summary report logic
  };

  // Marks Management handlers
  const handleSelectStudent = (studentId) => {
    setMarksData({ ...marksData, selectedStudent: studentId });
  };

  const handleEditMarks = (subjectId) => {
    toast.info(`Editing marks for subject ID: ${subjectId}`);
    // Edit marks logic
  };

  const handleExportMarks = () => {
    toast.success("Exporting marks data...");
    // Export CSV logic
  };

  // Announcements handlers
  const handleNewAnnouncement = () => {
    toast.info("Opening new announcement form...");
    // Open modal or navigate to form
  };

  const handleEditAnnouncement = (announcementId) => {
    toast.info(`Editing announcement ID: ${announcementId}`);
    // Edit announcement logic
  };

  const handleDeleteAnnouncement = (announcementId) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncementsData({
        ...announcementsData,
        announcements: announcementsData.announcements.filter(a => a.id !== announcementId),
        totalCount: announcementsData.totalCount - 1
      });
      toast.success("Announcement deleted successfully");
    }
  };

  // Schedule handlers
  const handleDayChange = (day) => {
    setScheduleData({
      ...scheduleData,
      selectedDay: day
    });
  };

  const handleProfessorFilter = (professor) => {
    setScheduleData({
      ...scheduleData,
      selectedProfessor: professor
    });
  };

  const handleEditSchedule = (scheduleId) => {
    toast.info(`Editing schedule ID: ${scheduleId}`);
    // Edit schedule logic - would open a modal with form
  };

  const handleDeleteSchedule = (scheduleId, day) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      setScheduleData({
        ...scheduleData,
        schedule: {
          ...scheduleData.schedule,
          [day]: scheduleData.schedule[day].filter(s => s.id !== scheduleId)
        }
      });
      toast.success("Class deleted successfully");
    }
  };

  const getFilteredSchedule = (day) => {
    const daySchedule = scheduleData.schedule[day] || [];
    if (scheduleData.selectedProfessor === "All") {
      return daySchedule;
    }
    return daySchedule.filter(s => s.professor === scheduleData.selectedProfessor);
  };

  // Feedback & Tickets handlers
  const handleTabChange = (tab) => {
    setFeedbackData({
      ...feedbackData,
      selectedTab: tab
    });
  };

  const handleViewFeedbackDetails = (subjectId) => {
    toast.info(`Viewing detailed feedback for subject ID: ${subjectId}`);
    // Would open modal with detailed feedback
  };

  const handleUpdateTicketStatus = (ticketId, newStatus) => {
    setFeedbackData({
      ...feedbackData,
      supportTickets: feedbackData.supportTickets.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
          : ticket
      )
    });
    toast.success(`Ticket status updated to ${newStatus}`);
  };

  const handleViewTicketDetails = (ticketId) => {
    toast.info(`Viewing ticket details for ID: ${ticketId}`);
    // Would open modal with full ticket details
  };

  const handleResolveTicket = (ticketId) => {
    handleUpdateTicketStatus(ticketId, 'resolved');
  };

  const handleDeleteTicket = (ticketId) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      setFeedbackData({
        ...feedbackData,
        supportTickets: feedbackData.supportTickets.filter(t => t.id !== ticketId),
        ticketStats: {
          ...feedbackData.ticketStats,
          total: feedbackData.ticketStats.total - 1
        }
      });
      toast.success("Ticket deleted successfully");
    }
  };

  // Settings handlers
  const handleInstitutionChange = (field, value) => {
    setSettingsData((prev) => ({
      ...prev,
      institution: { ...prev.institution, [field]: value },
    }));
  };

  const handleNotificationToggle = (key) => {
    setSettingsData((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [key]: !prev.notifications[key] },
    }));
  };

  const handleDisplayChange = (field, value) => {
    setSettingsData((prev) => ({
      ...prev,
      display: { ...prev.display, [field]: value },
    }));
  };

  const handleChangePassword = () => {
    toast.info("Opening change password dialog...");
    // Would open change password modal
  };

  const handleToggle2FA = () => {
    setSettingsData((prev) => ({
      ...prev,
      security: { ...prev.security, twoFAEnabled: !prev.security.twoFAEnabled },
    }));
    toast.success("Two-Factor Authentication setting updated");
  };

  const handleTerminateSession = (sessionId) => {
    setSettingsData((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        activeSessions: prev.security.activeSessions.filter((s) => s.id !== sessionId),
      },
    }));
    toast.success("Session terminated");
  };

  const handleBackupData = () => {
    try {
      const blob = new Blob([JSON.stringify(settingsData, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `settings-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Backup downloaded");
    } catch (e) {
      toast.error("Backup failed");
    }
  };

  const handleExportData = () => {
    try {
      const headers = ["Section","Key","Value"];
      const rows = [
        ["Institution","Name", settingsData.institution.name],
        ["Institution","Email", settingsData.institution.email],
        ["Institution","Phone", settingsData.institution.phone],
        ["Institution","Address", settingsData.institution.address],
        ["Notifications","Email", String(settingsData.notifications.email)],
        ["Notifications","SMS", String(settingsData.notifications.sms)],
        ["Notifications","Attendance Reminders", String(settingsData.notifications.attendanceReminders)],
        ["Notifications","Marks Notifications", String(settingsData.notifications.marksNotifications)],
        ["Display","Language", settingsData.display.language],
        ["Display","Timezone", settingsData.display.timezone],
        ["Security","TwoFA Enabled", String(settingsData.security.twoFAEnabled)],
      ];
      const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(','))].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `settings-export-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Data exported");
    } catch (e) {
      toast.error("Export failed");
    }
  };

  const handleClearCache = () => {
    try {
      // Do not clear auth tokens here; simulate cache clear
      toast.success("Cache cleared");
    } catch (e) {
      toast.error("Failed to clear cache");
    }
  };

  const handleSaveSettings = async () => {
    try {
      toast.loading("Saving settings...");
      // Example API call: await axiosWrapper.post('/coordinator/settings', settingsData);
      setTimeout(() => {
        toast.dismiss();
        toast.success("Settings saved successfully");
      }, 800);
    } catch (e) {
      toast.dismiss();
      toast.error("Failed to save settings");
    }
  };

    // Audit Log handlers
    const handleAuditSearchChange = (e) => {
      setAuditLogData({
        ...auditLogData,
        searchQuery: e.target.value
      });
    };

    const handleAuditActionFilter = (actionType) => {
      setAuditLogData({
        ...auditLogData,
        selectedActionFilter: actionType
      });
    };

    const getFilteredAuditLogs = () => {
      let filtered = auditLogData.activities;

      // Filter by action type
      if (auditLogData.selectedActionFilter !== "All Actions") {
        filtered = filtered.filter(
          activity => activity.action === auditLogData.selectedActionFilter
        );
      }

      // Filter by search query
      if (auditLogData.searchQuery.trim() !== "") {
        const query = auditLogData.searchQuery.toLowerCase();
        filtered = filtered.filter(
          activity =>
            activity.title.toLowerCase().includes(query) ||
            activity.user.toLowerCase().includes(query) ||
            activity.details.toLowerCase().includes(query) ||
            activity.action.toLowerCase().includes(query)
        );
      }

      return filtered;
    };

    const handleExportAuditLog = () => {
      try {
        toast.loading("Exporting audit log...");
        // Simulate export - in real app would generate CSV/PDF
        const filtered = getFilteredAuditLogs();
        const csvContent = [
          ["Date", "Time", "Action", "User", "Details"].join(","),
          ...filtered.map(activity =>
            [
              activity.date,
              activity.time,
              activity.action,
              activity.user,
              `"${activity.details}"`
            ].join(",")
          )
        ].join("\n");
      
        // Create download
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `audit-log-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      
        setTimeout(() => {
          toast.dismiss();
          toast.success("Audit log exported successfully!");
        }, 1000);
      } catch (error) {
        toast.dismiss();
        toast.error("Failed to export audit log");
      }
    };

  useEffect(() => {
    updateAttendanceStats();
  }, [attendanceData.students, attendanceData.selectedCourse]);

  // Render Dashboard View
  const renderDashboard = () => {
    const maxAttendance = Math.max(...dashboardData.weeklyAttendance);
    const maxAnnouncements = Math.max(...dashboardData.weeklyAnnouncements);
    
    // Calculate line chart points for attendance
    const attendancePoints = dashboardData.weeklyAttendance
      .map((val, idx) => {
        const x = (idx / (dashboardData.weeklyAttendance.length - 1)) * 100;
        const y = 100 - ((val / 100) * 100);
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <div className="space-y-6">
        {/* Dashboard Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Here's your overview.</p>
        </div>

        {/* Metrics Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Students */}
          <div className="bg-white rounded-lg shadow p-5 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Total Students</div>
              <div className="text-3xl font-bold text-gray-800">{dashboardData.totalStudents}</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>

          {/* Total Faculty */}
          <div className="bg-white rounded-lg shadow p-5 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Total Faculty</div>
              <div className="text-3xl font-bold text-gray-800">{dashboardData.totalFaculty}</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>

          {/* Total Courses */}
          <div className="bg-white rounded-lg shadow p-5 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Total Courses</div>
              <div className="text-3xl font-bold text-gray-800">{dashboardData.totalCourses}</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>

          {/* Attendance Rate */}
          <div className="bg-white rounded-lg shadow p-5 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Attendance Rate</div>
              <div className="text-3xl font-bold text-gray-800">{dashboardData.attendanceRate}%</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Charts and Quick Actions Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts Section - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Attendance Trend Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Attendance Trend</h3>
              <div className="h-48 relative">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                  <polyline
                    fill="none"
                    stroke="#FF6B35"
                    strokeWidth="2"
                    points={attendancePoints}
                  />
                  {dashboardData.weeklyAttendance.map((val, idx) => {
                    const x = (idx / (dashboardData.weeklyAttendance.length - 1)) * 100;
                    const y = 100 - ((val / 100) * 100);
                    return (
                      <circle
                        key={idx}
                        cx={x}
                        cy={y}
                        r="2"
                        fill="#FF6B35"
                      />
                    );
                  })}
                </svg>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span>Week 4</span>
                  <span>Week 5</span>
                </div>
              </div>
            </div>

            {/* Announcements Per Week Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Announcements Per Week</h3>
              <div className="h-48 flex items-end justify-around gap-2">
                {dashboardData.weeklyAnnouncements.map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-teal-500 rounded-t transition-all hover:bg-teal-600"
                      style={{ height: `${(val / maxAnnouncements) * 100}%`, minHeight: '10px' }}
                      title={`Week ${idx + 1}: ${val} announcements`}
                    />
                    <div className="text-xs text-gray-500 mt-2">Week {idx + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions Panel - Takes 1 column */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={handleMarkAttendance}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2"
              >
                <span>📝</span>
                Mark Attendance
              </button>
              <button
                onClick={handleUploadMarks}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2"
              >
                <span>📊</span>
                Upload Marks
              </button>
              <button
                onClick={handlePostAnnouncement}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2"
              >
                <span>📢</span>
                Post Announcement
              </button>
              <button
                onClick={handleViewReports}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium border border-gray-300 transition flex items-center justify-center gap-2"
              >
                <span>📈</span>
                View Reports
              </button>
            </div>
          </div>
        </div>

        {/* Recent Announcements Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Announcements</h3>
            <button
              onClick={() => handleMenuClick('announcements')}
              className="text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center gap-1"
            >
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {dashboardData.recentAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{announcement.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{announcement.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{announcement.author}</span>
                      <span>•</span>
                      <span>{announcement.date}</span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-4 ${
                      announcement.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {announcement.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render Attendance Management View
  const renderAttendance = () => {
    const filteredStudents = attendanceData.students.filter(s => 
      (attendanceData.selectedCourse === 'all' || s.course === attendanceData.selectedCourse)
    );

    // Calculate pie chart percentages
    const presentPercent = attendanceStats.total > 0 
      ? (attendanceStats.present / attendanceStats.total) * 100 
      : 0;
    const absentPercent = 100 - presentPercent;

    // Generate pie chart paths
    const generatePiePath = (percent, startPercent) => {
      const start = (startPercent / 100) * 2 * Math.PI - Math.PI / 2;
      const end = ((startPercent + percent) / 100) * 2 * Math.PI - Math.PI / 2;
      const r = 40, cx = 50, cy = 50;
      const x1 = cx + r * Math.cos(start);
      const y1 = cy + r * Math.sin(start);
      const x2 = cx + r * Math.cos(end);
      const y2 = cy + r * Math.sin(end);
      const largeArc = percent > 50 ? 1 : 0;
      return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    };

    return (
      <div className="space-y-6">
        {/* Header with Export Buttons */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Attendance Management</h1>
            <p className="text-sm text-gray-500 mt-1">Mark and track student attendance</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExportCSV}
              className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 font-medium transition flex items-center gap-2"
            >
              <span>📄</span>
              Export CSV
            </button>
            <button
              onClick={handleSummaryReport}
              className="bg-[#FF6900] hover:bg-[#ff7a1a] text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2"
            >
              <span>📊</span>
              Summary Report
            </button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={attendanceData.selectedDate}
                onChange={handleDateChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
              <select
                value={attendanceData.selectedCourse}
                onChange={handleCourseChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Courses</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Business Admin">Business Admin</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
              <select
                value={attendanceData.selectedSection}
                onChange={handleSectionChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Sections</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-5">
            <div className="text-sm text-gray-600 mb-1">Total Students</div>
            <div className="text-3xl font-bold text-gray-800">{attendanceStats.total}</div>
          </div>
          <div className="bg-[#DFF5E1] rounded-lg shadow p-5">
            <div className="text-sm text-gray-600 mb-1">Present</div>
            <div className="text-3xl font-bold text-green-600">{attendanceStats.present}</div>
          </div>
          <div className="bg-[#FFE5E5] rounded-lg shadow p-5">
            <div className="text-sm text-gray-600 mb-1">Absent</div>
            <div className="text-3xl font-bold text-red-600">{attendanceStats.absent}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-5">
            <div className="text-sm text-gray-600 mb-1">Attendance Rate</div>
            <div className="text-3xl font-bold text-red-600">{attendanceStats.rate}%</div>
          </div>
        </div>

        {/* Pie Chart and Table Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Pie Chart - 1 column */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Attendance Distribution</h3>
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 100 100" className="w-48 h-48">
                {/* Present slice */}
                <path d={generatePiePath(presentPercent, 0)} fill="#10b981" />
                {/* Absent slice */}
                <path d={generatePiePath(absentPercent, presentPercent)} fill="#ef4444" />
                {/* Center white circle for donut effect */}
                <circle cx="50" cy="50" r="24" fill="white" />
              </svg>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-sm"></span>
                  <span>Present: {attendanceStats.present}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded-sm"></span>
                  <span>Absent: {attendanceStats.absent}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Table - 3 columns */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Mark Attendance</h3>
              <button
                onClick={handleSaveAttendance}
                className="bg-[#FF6900] hover:bg-[#ff7a1a] text-white px-6 py-2 rounded-lg font-medium transition"
              >
                Save Attendance
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Roll No</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {student.rollNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {student.course}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          student.status === 'present' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {student.status === 'present' ? 'Present' : 'Absent'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => toggleAttendance(student.id)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                            student.status === 'present'
                              ? 'bg-green-100 text-green-600 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                          title={student.status === 'present' ? 'Mark Absent' : 'Mark Present'}
                        >
                          {student.status === 'present' ? '✓' : '○'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Marks Management View
  const renderMarksManagement = () => {
    const selectedStudentData = marksData.students.find(s => s.id === marksData.selectedStudent);
    const maxMarks = Math.max(...marksData.students.map(s => s.totalMarks));

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Marks Management</h1>
            <p className="text-sm text-gray-500 mt-1">View and manage student marks</p>
          </div>
        </div>

        {/* Student Performance Overview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Performance Overview</h3>
          <div className="overflow-x-auto">
            <div className="flex gap-6 pb-4" style={{ minWidth: 'max-content' }}>
              {marksData.students.map((student) => (
                <div key={student.id} className="flex flex-col items-center gap-2" style={{ minWidth: '80px' }}>
                  <div className="text-xs text-gray-600 text-center">{student.name.split(' ')[0]}</div>
                  <div className="relative w-16 bg-gray-100 rounded" style={{ height: '200px' }}>
                    <div
                      className="absolute bottom-0 w-full bg-gray-800 rounded transition-all"
                      style={{ height: `${(student.totalMarks / 500) * 100}%` }}
                      title={`${student.totalMarks} marks`}
                    />
                  </div>
                  <div className="text-xs font-semibold text-gray-700">{student.totalMarks}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Students List and Marks Table Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Students List - Left Panel */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Students</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {marksData.students.map((student) => (
                <button
                  key={student.id}
                  onClick={() => handleSelectStudent(student.id)}
                  className={`w-full text-left px-4 py-3 rounded-full transition ${
                    marksData.selectedStudent === student.id
                      ? 'bg-[#FF6600] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-medium text-sm">{student.name}</div>
                  <div className="text-xs opacity-80">{student.studentId}</div>
                </button>
              ))}
            </div>
          </div>

          {/* All Marks Table - Right Panel */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">All Marks</h3>
              <button
                onClick={handleExportMarks}
                className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 font-medium transition flex items-center gap-2"
              >
                <span>📄</span>
                Export
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Midterm</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Final</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Assignment</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {marksData.subjects.map((subject) => {
                    const isBelowStandard = subject.total < 60;
                    return (
                      <tr key={subject.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {subject.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {subject.midterm}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {subject.final}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {subject.assignment}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                            isBelowStandard
                              ? 'bg-red-100 text-red-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {subject.total}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleEditMarks(subject.id)}
                            className="text-[#FF6600] hover:text-[#ff7a1a] transition"
                            title="Edit marks"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Grade Statistics */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Grade Statistics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {marksData.gradeStats.map((stat) => (
              <div
                key={stat.grade}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-orange-300 transition"
              >
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.grade}</div>
                <div className="text-xs text-gray-500 mb-2">{stat.range}</div>
                <div className="text-xl font-semibold text-[#FF6600]">{stat.count}</div>
                <div className="text-xs text-gray-500">students</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render Announcements View
  const renderAnnouncements = () => {
    return (
      <div className="space-y-6">
        {/* Header with New Announcement Button */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Announcements</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and post announcements</p>
          </div>
          <button
            onClick={handleNewAnnouncement}
            className="bg-[#FF6600] hover:bg-[#ff7a1a] text-white px-6 py-2 rounded-lg font-medium transition flex items-center gap-2"
          >
            <span>+</span>
            New Announcement
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Total Announcements */}
          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-[#FF6600]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Announcements</div>
                <div className="text-3xl font-bold text-gray-800">{announcementsData.totalCount}</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
            </div>
          </div>

          {/* High Priority */}
          <div className="bg-red-50 rounded-lg shadow p-5 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">High Priority</div>
                <div className="text-3xl font-bold text-red-600">{announcementsData.highPriorityCount}</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="bg-white rounded-lg shadow p-5 border-l-4 border-gray-400">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Last Updated</div>
                <div className="text-lg font-bold text-gray-800">{announcementsData.lastUpdated}</div>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcementsData.announcements.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="text-gray-400 mb-2">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-gray-600">No announcements yet. Click "New Announcement" to create one.</p>
            </div>
          ) : (
            announcementsData.announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {announcement.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {announcement.description}
                    </p>
                    <div className="flex items-center gap-4 flex-wrap">
                      {/* Date */}
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{announcement.date}</span>
                      </div>
                      
                      {/* Priority Badge */}
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        {announcement.priority === "high" ? "High Priority" : 
                         announcement.priority === "medium" ? "Medium Priority" : 
                         "Unknown Priority"}
                      </span>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEditAnnouncement(announcement.id)}
                      className="w-10 h-10 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#FF6600] flex items-center justify-center transition"
                      title="Edit announcement"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                      className="w-10 h-10 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition"
                      title="Delete announcement"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // Render Schedule View
  const renderSchedule = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const currentDaySchedule = getFilteredSchedule(scheduleData.selectedDay);

    return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Class Schedule & Timetable</h2>
          <p className="text-sm text-gray-500 mt-1">Manage and view weekly class schedules</p>
        </div>

        {/* Professor Filters */}
        <div className="flex flex-wrap gap-2">
          {scheduleData.professors.map((professor) => (
            <button
              key={professor}
              onClick={() => handleProfessorFilter(professor)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                scheduleData.selectedProfessor === professor
                  ? "bg-[#FF6600] text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {professor}
            </button>
          ))}
        </div>

        {/* Day Tabs */}
        <div className="flex gap-2 border-b border-gray-200">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => handleDayChange(day)}
              className={`px-6 py-3 font-medium transition border-b-2 ${
                scheduleData.selectedDay === day
                  ? "border-[#d84315] text-[#d84315] bg-[#fff3e0]"
                  : "border-transparent text-gray-600 hover:bg-gray-50"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Daily Schedule Cards */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {scheduleData.selectedDay} Schedule
          </h3>
          
          {currentDaySchedule.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600">No classes scheduled for this day with the selected filter.</p>
            </div>
          ) : (
            currentDaySchedule.map((classItem) => (
              <div
                key={classItem.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition p-4 border-l-4 border-[#d84315] flex items-center justify-between"
              >
                {/* Left Content */}
                <div className="flex items-center gap-6 flex-1">
                  {/* Module Code */}
                  <div className="bg-[#d84315] text-white px-4 py-2 rounded-lg font-bold text-lg min-w-[100px] text-center">
                    {classItem.module}
                  </div>

                  {/* Time */}
                  <div className="text-gray-700 font-medium min-w-[140px]">
                    {classItem.time}
                  </div>

                  {/* Section Tag */}
                  <span className="px-3 py-1 bg-orange-100 text-[#d84315] rounded-full text-sm font-semibold">
                    Section {classItem.section}
                  </span>

                  {/* Professor */}
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">{classItem.professor}</span>
                  </div>

                  {/* Room */}
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="font-medium">{classItem.room}</span>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEditSchedule(classItem.id)}
                    className="px-4 py-2 bg-[#FF6600] hover:bg-[#ff7a1a] text-white rounded-lg font-medium transition"
                  >
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteSchedule(classItem.id, scheduleData.selectedDay)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Full Week Overview Table */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Full Week Overview</h3>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 bg-gray-50 min-w-[140px]">
                    Time
                  </th>
                  {days.map((day) => (
                    <th
                      key={day}
                      className="px-4 py-3 text-center font-semibold text-gray-700 bg-gray-50 min-w-[160px]"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scheduleData.timeSlots.map((timeSlot, index) => (
                  <tr key={timeSlot} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 font-medium text-gray-700 border-r border-gray-200">
                      {timeSlot}
                    </td>
                    {days.map((day) => {
                      const classInSlot = scheduleData.schedule[day]?.find(
                        (c) => c.time === timeSlot
                      );
                      return (
                        <td
                          key={`${day}-${timeSlot}`}
                          className="px-4 py-3 text-center border-r border-gray-200"
                        >
                          {classInSlot ? (
                            <div className="bg-[#ffe0cc] border-l-4 border-[#d84315] rounded p-2">
                              <div className="font-bold text-[#d84315] text-sm">
                                {classInSlot.module}
                              </div>
                              <div className="text-xs text-gray-600 mt-1">
                                {classInSlot.room}
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-400">—</span>
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
      </div>
    );
  };

  // Render Feedback & Tickets View
  const renderFeedbackTickets = () => {
    // Star rating component
    const StarRating = ({ rating, maxRating = 5 }) => {
      return (
        <div className="flex items-center gap-1">
          {[...Array(maxRating)].map((_, index) => {
            const fillPercentage = Math.max(0, Math.min(100, (rating - index) * 100));
            return (
              <div key={index} className="relative w-5 h-5">
                {/* Empty star */}
                <svg className="w-5 h-5 text-gray-300 absolute" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {/* Filled star */}
                {fillPercentage > 0 && (
                  <div style={{ width: `${fillPercentage}%`, overflow: 'hidden' }} className="absolute top-0 left-0">
                    <svg className="w-5 h-5 text-[#FF6600]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
          <span className="ml-2 text-sm font-semibold text-gray-700">{rating.toFixed(1)}</span>
        </div>
      );
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Feedback & Tickets</h2>
          <p className="text-sm text-gray-500 mt-1">Manage student feedback and support tickets</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-gray-200">
          <button
            onClick={() => handleTabChange('feedback')}
            className={`px-6 py-3 font-medium transition border-b-2 ${
              feedbackData.selectedTab === 'feedback'
                ? 'border-[#FF6600] text-[#FF6600] bg-orange-50'
                : 'border-transparent text-gray-600 hover:bg-gray-50'
            }`}
          >
            Feedback
          </button>
          <button
            onClick={() => handleTabChange('tickets')}
            className={`px-6 py-3 font-medium transition border-b-2 ${
              feedbackData.selectedTab === 'tickets'
                ? 'border-[#FF6600] text-[#FF6600] bg-orange-50'
                : 'border-transparent text-gray-600 hover:bg-gray-50'
            }`}
          >
            Support Tickets
          </button>
        </div>

        {/* Feedback Tab Content */}
        {feedbackData.selectedTab === 'feedback' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Average Ratings by Subject</h3>
              <div className="text-sm text-gray-500">
                Total Subjects: {feedbackData.subjectRatings.length}
              </div>
            </div>

            {/* Subject Ratings List */}
            <div className="space-y-4">
              {feedbackData.subjectRatings.map((subject) => (
                <div
                  key={subject.id}
                  className="bg-white rounded-lg shadow hover:shadow-md transition p-5 border-l-4 border-[#FF6600]"
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Left Content */}
                    <div className="flex items-center gap-6 flex-1">
                      {/* Subject Code Badge */}
                      <div className="bg-[#FF6600] text-white px-4 py-2 rounded-lg font-bold text-base min-w-[80px] text-center">
                        {subject.code}
                      </div>

                      {/* Subject Details */}
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-800 mb-1">
                          {subject.subject}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>{subject.professor}</span>
                        </div>
                      </div>

                      {/* Rating Display */}
                      <div className="flex flex-col items-center gap-2 min-w-[200px]">
                        <StarRating rating={subject.avgRating} />
                        <div className="text-xs text-gray-500">
                          Based on {subject.totalFeedback} responses
                        </div>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => handleViewFeedbackDetails(subject.id)}
                      className="px-4 py-2 bg-[#FF6600] hover:bg-[#ff7a1a] text-white rounded-lg font-medium transition whitespace-nowrap"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Overall Summary Card */}
            <div className="bg-gradient-to-r from-orange-50 to-white rounded-lg shadow p-6 border border-orange-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Overall Summary</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#FF6600]">
                    {(feedbackData.subjectRatings.reduce((acc, s) => acc + s.avgRating, 0) / feedbackData.subjectRatings.length).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#FF6600]">
                    {feedbackData.subjectRatings.reduce((acc, s) => acc + s.totalFeedback, 0)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Total Feedback</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#FF6600]">
                    {feedbackData.subjectRatings.length}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Subjects</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Support Tickets Tab Content */}
        {feedbackData.selectedTab === 'tickets' && (
          <div className="space-y-4">
            {/* Ticket Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
                <div className="text-2xl font-bold text-gray-800">{feedbackData.ticketStats.total}</div>
                <div className="text-sm text-gray-600">Total Tickets</div>
              </div>
              <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
                <div className="text-2xl font-bold text-red-600">{feedbackData.ticketStats.open}</div>
                <div className="text-sm text-gray-600">Open</div>
              </div>
              <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
                <div className="text-2xl font-bold text-yellow-600">{feedbackData.ticketStats.inProgress}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
                <div className="text-2xl font-bold text-green-600">{feedbackData.ticketStats.resolved}</div>
                <div className="text-sm text-gray-600">Resolved</div>
              </div>
            </div>

            {/* Tickets List */}
            <div className="space-y-4">
              {feedbackData.supportTickets.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <div className="text-gray-400 mb-2">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">No support tickets found.</p>
                </div>
              ) : (
                feedbackData.supportTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-white rounded-lg shadow hover:shadow-md transition p-5 border-l-4 border-[#FF6600]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Left Content */}
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          {/* Ticket Number Badge */}
                          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-mono font-semibold">
                            {ticket.ticketNumber}
                          </span>
                          
                          {/* Priority Badge */}
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            ticket.priority === 'high' ? 'bg-red-100 text-red-700' :
                            ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {ticket.priority.toUpperCase()}
                          </span>

                          {/* Status Badge */}
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            ticket.status === 'open' ? 'bg-red-100 text-red-700' :
                            ticket.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {ticket.status === 'in-progress' ? 'IN PROGRESS' : ticket.status.toUpperCase()}
                          </span>

                          {/* Category Badge */}
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                            {ticket.category}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold text-gray-800 mb-2">
                          {ticket.subject}
                        </h4>
                        
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                          {ticket.description}
                        </p>

                        <div className="flex items-center gap-6 flex-wrap text-sm text-gray-500">
                          {/* Student Info */}
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="font-medium">{ticket.student}</span>
                            <span className="text-gray-400">({ticket.studentId})</span>
                          </div>

                          {/* Created Date */}
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Created: {ticket.dateCreated}</span>
                          </div>

                          {/* Last Updated */}
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Updated: {ticket.lastUpdated}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Actions */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleViewTicketDetails(ticket.id)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition whitespace-nowrap text-sm"
                        >
                          View Details
                        </button>
                        
                        {ticket.status !== 'resolved' && (
                          <button
                            onClick={() => handleResolveTicket(ticket.id)}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition whitespace-nowrap text-sm"
                          >
                            Mark Resolved
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteTicket(ticket.id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition whitespace-nowrap text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

    // Render Audit Log View
    const renderAuditLog = () => {
      const filteredActivities = getFilteredAuditLogs();

      // Helper function to get action color
      const getActionColor = (action) => {
        switch (action) {
          case "Attendance Updated":
            return { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-500" };
          case "Marks Entered":
            return { bg: "bg-green-100", text: "text-green-700", border: "border-green-500" };
          case "Announcement Posted":
            return { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-500" };
          case "Schedule Modified":
            return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-500" };
          case "Ticket Resolved":
            return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-500" };
          default:
            return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-500" };
        }
      };

      return (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Audit Log</h2>
              <p className="text-sm text-gray-500 mt-1">Track all system activities and changes</p>
            </div>
            <button
              onClick={handleExportAuditLog}
              className="bg-[#FF6600] hover:bg-[#ff7a1a] text-white px-6 py-2 rounded-lg font-medium transition flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Log
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex gap-4 items-center">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by action, user, or details..."
                value={auditLogData.searchQuery}
                onChange={handleAuditSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent"
              />
            </div>

            {/* Action Filter Dropdown */}
            <div className="relative">
              <select
                value={auditLogData.selectedActionFilter}
                onChange={(e) => handleAuditActionFilter(e.target.value)}
                className="px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6600] focus:border-transparent bg-white appearance-none cursor-pointer min-w-[200px]"
              >
                {auditLogData.actionTypes.map((actionType) => (
                  <option key={actionType} value={actionType}>
                    {actionType}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Total Activities */}
            <div className="bg-white rounded-lg shadow p-5 border-l-4 border-[#FF6600]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Total Activities</div>
                  <div className="text-3xl font-bold text-gray-800">{auditLogData.stats.totalActivities}</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Today's Activities */}
            <div className="bg-white rounded-lg shadow p-5 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Today's Activities</div>
                  <div className="text-3xl font-bold text-blue-600">{auditLogData.stats.todayActivities}</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Unique Users */}
            <div className="bg-white rounded-lg shadow p-5 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Unique Users</div>
                  <div className="text-3xl font-bold text-green-600">{auditLogData.stats.uniqueUsers}</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Activity Timeline</h3>
          
            {filteredActivities.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-600">No activities found matching your search criteria.</p>
              </div>
            ) : (
              <div className="relative">
                {/* Vertical Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                {/* Timeline Items */}
                <div className="space-y-6">
                  {filteredActivities.map((activity, index) => {
                    const colors = getActionColor(activity.action);
                    return (
                      <div key={activity.id} className="relative pl-20">
                        {/* Timeline Dot */}
                        <div className={`absolute left-6 w-5 h-5 rounded-full ${colors.bg} ${colors.border} border-2 -ml-2.5`}></div>

                        {/* Activity Card */}
                        <div className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition">
                          <div className="flex items-start justify-between gap-4">
                            {/* Left Content */}
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-base font-bold text-gray-800">
                                  {activity.title}
                                </h4>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
                                  {activity.action}
                                </span>
                              </div>
                            
                              <p className="text-sm text-gray-600 mb-3">
                                {activity.details}
                              </p>

                              <div className="flex items-center gap-4 flex-wrap text-sm text-gray-500">
                                {/* User */}
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                  <span>By: <span className="font-medium text-gray-700">{activity.user}</span></span>
                                </div>

                                {/* Date */}
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  <span>{activity.date}</span>
                                </div>

                                {/* Time */}
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span>{activity.time}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
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
    if (selectedMenu === "dashboard") {
      return renderDashboard();
    }
    if (selectedMenu === "attendance") {
      return renderAttendance();
    }
    if (selectedMenu === "marks") {
      return renderMarksManagement();
    }
    if (selectedMenu === "announcements") {
      return renderAnnouncements();
    }
    if (selectedMenu === "schedule") {
      return renderSchedule();
    }
    if (selectedMenu === "feedback") {
      return renderFeedbackTickets();
    }
    if (selectedMenu === "audit") {
      return renderAuditLog();
    }
    if (selectedMenu === "settings") {
      return renderSettings();
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
    navigate(`/coordinator?page=${menuId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <>
      <style>{`
        .coordinator-topbar {
          position: fixed;
          top: 0;
          left: 260px;
          right: 0;
          height: 60px;
          background: linear-gradient(135deg, #FF4500 0%, #ff6347 100%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          z-index: 999;
        }
        .coordinator-topbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .coordinator-topbar-icon {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .coordinator-topbar-icon:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }
        .coordinator-topbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        @media (max-width: 768px) {
          .coordinator-topbar { left: 70px; }
        }
      `}</style>

      <Sidebar 
        activeMenu={selectedMenu}
        onMenuChange={handleMenuClick}
        menuItems={MENU_ITEMS}
        userType="coordinator"
      />

      {/* Black Topbar */}
      <div className="coordinator-topbar">
        <div className="coordinator-topbar-left">
          {/* Empty left side */}
        </div>
        <div className="coordinator-topbar-right">
          <div className="coordinator-topbar-icon" title="Messages">
            ✉️
          </div>
          <div className="coordinator-topbar-icon" title="Notifications">
            🔔
          </div>
          <div className="coordinator-topbar-icon" onClick={handleLogout} title="Profile">
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