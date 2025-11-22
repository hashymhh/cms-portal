import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { toast, Toaster } from "react-hot-toast";
// Notice (student) is intentionally not used for Admin Announcements; we render inline below
import Student from "./Student";
import Faculty from "./Faculty";
import Subjects from "./Subject";
import Admin from "./Admin";
import Branch from "./Branch";
import Timetable from "./Timetable";
import Reports from "./Reports";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/actions";
import axiosWrapper from "../../utils/AxiosWrapper";
import Profile from "./Profile";
import Exam from "../Exam";
import { useNavigate, useLocation } from "react-router-dom";
import AdminIcons from "../../components/AdminIcons";

// Admin panel modules with professional SVG icons
const MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: <AdminIcons.Dashboard />, component: Profile },
  { id: "departments", label: "Departments", icon: <AdminIcons.Departments />, component: Branch },
  { id: "users", label: "User Management", icon: <AdminIcons.Users />, component: Admin },
  { id: "timetable", label: "Timetable", icon: <AdminIcons.Timetable />, component: Timetable },
  { id: "reports", label: "Reports & Analytics", icon: <AdminIcons.Reports />, component: Reports },
  { id: "finance", label: "Finance", icon: <AdminIcons.Finance />, component: null },
  { id: "announcements", label: "Announcements", icon: <AdminIcons.Announcements />, component: null },
  { id: "settings", label: "Settings", icon: <AdminIcons.Settings />, component: null },
];

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [profileData, setProfileData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  // Settings state
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settings, setSettings] = useState({
    instituteName: "Concordia Colleges Wapda Town",
    sessionYear: "2024-2025",
    contactEmail: "admin@concordia.edu.pk",
    contactPhone: "+92-300-1234567",
    darkMode: false,
  });
  const [systemLogs, setSystemLogs] = useState([
    { id: 1, text: "User login: admin@concordia.edu.pk", time: "2024-10-01 09:30 AM" },
    { id: 2, text: "Department created: Computer Science", time: "2024-09-30 02:15 PM" },
    { id: 3, text: "User role updated: Faculty", time: "2024-09-29 11:45 AM" },
    { id: 4, text: "System backup completed", time: "2024-09-28 03:00 AM" },
  ]);
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

  // Load settings/logs when entering Settings page
  useEffect(() => {
    if (selectedMenu !== "settings") return;
    const lsDark = localStorage.getItem("adminDarkMode");
    if (lsDark !== null) {
      const enabled = lsDark === "true";
      setSettings((s) => ({ ...s, darkMode: enabled }));
      document.documentElement.classList.toggle("dark", enabled);
    }

    const load = async () => {
      try {
        setSettingsLoading(true);
        // Try to fetch settings (if backend endpoint exists)
        const res = await axiosWrapper.get("/admin/settings");
        if (res?.data?.success && res.data.data) {
          setSettings((s) => ({ ...s, ...res.data.data }));
        }
      } catch (e) {
        // Silent fallback to defaults
      } finally {
        setSettingsLoading(false);
      }
      // Try to fetch system logs
      try {
        const logsRes = await axiosWrapper.get("/admin/system-logs");
        if (logsRes?.data?.success && Array.isArray(logsRes.data.data)) {
          setSystemLogs(logsRes.data.data);
        }
      } catch (e) {
        // keep defaults
      }
    };
    load();
  }, [selectedMenu]);

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
  
  // --- Inline Finance & Fee Management (MVP, no new files) ---
  const financeMetrics = {
    collected: { amount: 'PKR 1.8L', sub: 'From 5 students' },
    pending: { amount: 'PKR 0.7L', sub: 'Outstanding balance' },
    rate: { amount: '73.8%', sub: 'Overall collection' }
  };
  const financeMonths = ['Jan','Feb','Mar','Apr','May','Jun'];
  const collectedSeries = [110000, 140000, 130000, 160000, 150000, 180000];
  const pendingSeries =   [30000,  25000,  28000,  15000,  17000,  10000];
  const maxY = Math.max(...collectedSeries, ...pendingSeries) * 1.2;

  const pieDist = [
    { label: 'Paid: 65%', percent: 65, color: '#10b981' },
    { label: 'Partial: 20%', percent: 20, color: '#f59e0b' },
    { label: 'Pending: 15%', percent: 15, color: '#ef4444' },
  ];

  const renderFinancePie = () => {
    let cum = 0;
    return pieDist.map((s, i) => {
      const start = (cum / 100) * 2 * Math.PI; cum += s.percent; const end = (cum / 100) * 2 * Math.PI;
      const r = 40, cx = 50, cy = 50;
      const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
      const x2 = cx + r * Math.cos(end),   y2 = cy + r * Math.sin(end);
      const largeArc = s.percent > 50 ? 1 : 0;
      return (
        <path key={i} d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`} fill={s.color} />
      );
    });
  };

  const renderFinance = () => (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Finance &amp; Fee Management</h2>
          <p className="text-sm text-gray-500 mt-1">Track student fees and financial records</p>
        </div>
        <button className="btn-orange">
          + Add Record
        </button>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="ui-card" style={{transition:'all 0.28s ease'}}>
          <div className="text-sm text-gray-500">Total Collected</div>
          <div className="text-2xl font-extrabold text-gray-800 mt-2">{financeMetrics.collected.amount}</div>
          <div className="text-xs text-gray-400 mt-2">{financeMetrics.collected.sub}</div>
        </div>
        <div className="ui-card" style={{transition:'all 0.28s ease'}}>
          <div className="text-sm text-gray-500">Total Pending</div>
          <div className="text-2xl font-extrabold text-red-600 mt-2">{financeMetrics.pending.amount}</div>
          <div className="text-xs text-gray-400 mt-2">{financeMetrics.pending.sub}</div>
        </div>
        <div className="ui-card" style={{transition:'all 0.28s ease'}}>
          <div className="text-sm text-gray-500">Collection Rate</div>
          <div className="text-2xl font-extrabold text-orange-600 mt-2">{financeMetrics.rate.amount}</div>
          <div className="text-xs text-gray-400 mt-2">{financeMetrics.rate.sub}</div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Collection Trend - grouped bars */}
        <div className="ui-card chart-svg" style={{height: 'fit-content'}}>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Collection Trend</h3>
          <div className="h-48 flex items-end gap-4 px-2 mb-3">
            {financeMonths.map((m, idx) => (
              <div key={m} className="flex flex-col items-center flex-1 min-w-[40px]">
                <div className="w-7 bg-green-500 rounded-t hover:bg-green-600 transition-all" style={{height: `${(collectedSeries[idx]/maxY)*100}%`}} title={`Collected: ${collectedSeries[idx]}`} />
                <div className="w-7 bg-red-500 rounded-t mt-1 hover:bg-red-600 transition-all" style={{height: `${(pendingSeries[idx]/maxY)*100}%`}} title={`Pending: ${pendingSeries[idx]}`} />
                <div className="text-xs text-gray-600 mt-2">{m}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-6 justify-center text-xs pb-2">
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-green-500 rounded-sm" />Collected</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-red-500 rounded-sm" />Pending</div>
          </div>
        </div>

        {/* Payment Status Distribution - pie */}
        <div className="ui-card chart-svg" style={{height: 'fit-content'}}>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Status Distribution</h3>
          <div className="flex items-center justify-center py-4">
            <svg viewBox="0 0 100 100" className="w-48 h-48">
              {renderFinancePie()}
              <circle cx="50" cy="50" r="24" fill="white" />
            </svg>
          </div>
          <div className="flex items-center justify-center gap-4 text-xs flex-wrap pb-2">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{background:'#10b981'}}></span>Paid: 65%</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{background:'#f59e0b'}}></span>Partial: 20%</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{background:'#ef4444'}}></span>Pending: 15%</div>
          </div>
        </div>
      </div>

      {/* Student Fee Records */}
      <div className="ui-card">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Student Fee Records</h3>
        <p className="text-sm text-gray-500 mb-4">Manage and track student fee payments</p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm table-hover">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left font-semibold text-gray-700 sortable">Student Name</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700 sortable">Roll Number</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Total Fee</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Paid</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Pending</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name:'Ali Ahmed', roll:'CS-001', total:'PKR 50,000', paid:'PKR 50,000', pending:'PKR 0', status:'Paid' },
                { name:'Fatima Khan', roll:'CS-002', total:'PKR 50,000', paid:'PKR 30,000', pending:'PKR 20,000', status:'Partial' },
                { name:'Hassan Malik', roll:'BUS-001', total:'PKR 45,000', paid:'PKR 0', pending:'PKR 45,000', status:'Pending' },
                { name:'Ayesha Siddiqui', roll:'ENG-001', total:'PKR 55,000', paid:'PKR 55,000', pending:'PKR 0', status:'Paid' },
                { name:'Muhammad Raza', roll:'SCI-001', total:'PKR 48,000', paid:'PKR 48,000', pending:'PKR 0', status:'Paid' },
              ].map((row, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-3 px-4 text-[#2563eb] cursor-pointer hover:text-[#f28300] transition-colors">{row.name}</td>
                  <td className="py-3 px-4">{row.roll}</td>
                  <td className="py-3 px-4">{row.total}</td>
                  <td className="py-3 px-4 text-green-600">{row.paid}</td>
                  <td className="py-3 px-4 text-red-600">{row.pending}</td>
                  <td className="py-3 px-4">
                    {row.status === 'Paid' && (
                      <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">Paid</span>
                    )}
                    {row.status === 'Partial' && (
                      <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">Partial</span>
                    )}
                    {row.status === 'Pending' && (
                      <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-700">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // --- Inline Announcements & Communication (Admin) ---
  const announcementData = [
    {
      id: 1,
      title: "Mid-Semester Exams Schedule",
      status: "Published",
      description:
        "Mid-semester exams will be held from October 15-25, 2024. Please check the timetable for your schedule.",
      target: "All Students",
      date: "10/1/2024",
    },
    {
      id: 2,
      title: "Campus Maintenance Notice",
      status: "Published",
      description:
        "The campus will undergo maintenance on October 8-9. Limited services will be available during this period.",
      target: "All Users",
      date: "9/25/2024",
    },
    {
      id: 3,
      title: "New Library Hours",
      status: "Draft",
      description:
        "Starting October 1, the library will be open from 7:00 AM to 10:00 PM on weekdays.",
      target: "All Students",
      date: "9/20/2024",
    },
  ];

  const stats = {
    total: announcementData.length,
    published: announcementData.filter((a) => a.status === "Published").length,
    drafts: announcementData.filter((a) => a.status === "Draft").length,
  };

  const StatusPill = ({ status }) => (
    <span
      className={
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium " +
        (status === "Published"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700")
      }
    >
      {status}
    </span>
  );

  const Thumb = ({ img }) => (
    <div
      className="w-14 h-14 rounded-md overflow-hidden flex items-center justify-center"
      style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}
      aria-hidden
    >
      {img ? (
        <img src={img} alt="Announcement" className="w-full h-full object-cover" />
      ) : (
        <span className="text-2xl" role="img">📢</span>
      )}
    </div>
  );

  const renderAnnouncements = () => (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Announcements &amp; Communication</h2>
          <p className="text-sm text-gray-500 mt-1">Create and manage system-wide announcements</p>
        </div>
        <button className="btn-orange">
          + New Announcement
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="ui-card" style={{transition:'all 0.28s ease'}}>
          <div className="text-sm text-gray-500">Total Announcements</div>
          <div className="text-3xl font-extrabold text-gray-800 mt-2">{stats.total}</div>
        </div>
        <div className="ui-card" style={{transition:'all 0.28s ease'}}>
          <div className="text-sm text-gray-500">Published</div>
          <div className="text-3xl font-extrabold text-gray-800 mt-2">{stats.published}</div>
        </div>
        <div className="ui-card" style={{transition:'all 0.28s ease'}}>
          <div className="text-sm text-gray-500">Drafts</div>
          <div className="text-3xl font-extrabold text-gray-800 mt-2">{stats.drafts}</div>
        </div>
      </div>

      {/* List (vertical scroll with line-wise images) */}
      <div className="space-y-4 max-h-[68vh] overflow-y-auto pr-1">
        {announcementData.map((a) => (
          <div key={a.id} className="ui-card hover:shadow-lg transition-all flex items-start gap-4" style={{cursor:'pointer'}}>
            {/* Left-aligned thumbnail to satisfy line-wise image alignment */}
            <Thumb img={a.img} />

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-lg font-semibold text-gray-800">{a.title}</h3>
                  <StatusPill status={a.status} />
                </div>
                <div className="flex items-center gap-3 text-orange-600">
                  <button className="hover:text-orange-700 transition-colors" title="Edit" aria-label={`Edit ${a.title}`}>✏️</button>
                  <button className="hover:text-orange-700 transition-colors" title="Delete" aria-label={`Delete ${a.title}`}>🗑️</button>
                </div>
              </div>
              <p className="text-gray-600 mt-2 leading-relaxed">{a.description}</p>
              <div className="text-sm text-gray-500 mt-3 flex items-center gap-6 flex-wrap">
                <span><span className="font-medium text-gray-600">Target:</span> {a.target}</span>
                <span><span className="font-medium text-gray-600">Date:</span> {a.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- Inline Settings (Admin System Settings) ---
  const validateSettings = () => {
    const errors = [];
    if (!settings.instituteName || settings.instituteName.trim().length < 3) {
      errors.push("Institute Name must be at least 3 characters");
    }
    if (!/^\d{4}-\d{4}$/.test(settings.sessionYear)) {
      errors.push("Session Year must be in format YYYY-YYYY");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(settings.contactEmail)) {
      errors.push("Invalid Contact Email");
    }
    if (!/^[0-9+\-()\s]{7,}$/.test(settings.contactPhone)) {
      errors.push("Invalid Contact Phone");
    }
    return errors;
  };

  const handleSaveSettings = async () => {
    const errs = validateSettings();
    if (errs.length) {
      errs.forEach((m) => toast.error(m));
      return;
    }
    try {
      setSettingsLoading(true);
      toast.loading("Saving settings...");
      const res = await axiosWrapper.put("/admin/settings", settings);
      if (res?.data?.success) toast.success("Settings saved");
      else toast.success("Settings updated locally");
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to save settings");
    } finally {
      setSettingsLoading(false);
      toast.dismiss();
    }
  };

  const handleToggleDark = (value) => {
    setSettings((s) => ({ ...s, darkMode: value }));
    document.documentElement.classList.toggle("dark", value);
    localStorage.setItem("adminDarkMode", String(value));
  };

  const handleBackup = async () => {
    try {
      toast.loading("Starting backup...");
      const res = await axiosWrapper.post("/admin/backup");
      toast.dismiss();
      if (res?.data?.success) toast.success("Backup completed");
      else toast.success("Backup triggered");
      setSystemLogs((logs) => [
        { id: Date.now(), text: "System backup completed", time: new Date().toLocaleString() },
        ...logs,
      ]);
    } catch (e) {
      toast.dismiss();
      toast.error(e?.response?.data?.message || "Backup failed");
    }
  };

  const handleRestore = async () => {
    try {
      toast.loading("Restoring data...");
      const res = await axiosWrapper.post("/admin/restore");
      toast.dismiss();
      if (res?.data?.success) toast.success("Restore completed");
      else toast.success("Restore triggered");
      setSystemLogs((logs) => [
        { id: Date.now(), text: "System restore executed", time: new Date().toLocaleString() },
        ...logs,
      ]);
    } catch (e) {
      toast.dismiss();
      toast.error(e?.response?.data?.message || "Restore failed");
    }
  };

  const renderSettings = () => (
    <div className="space-y-6 fade-in">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">System Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Manage system configuration and preferences</p>
        </div>
        <button
          onClick={handleSaveSettings}
          disabled={settingsLoading}
          className="btn-orange"
        >
          💾 Save Settings
        </button>
      </div>

      {/* Institute Information */}
      <section className="ui-card">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Institute Information</h3>
          <p className="text-sm text-gray-500">Update your institution details</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Institute Name</label>
            <input
              type="text"
              value={settings.instituteName}
              onChange={(e) => setSettings({ ...settings, instituteName: e.target.value })}
              className="input-focus w-full border rounded-lg px-3 py-2"
              placeholder="Enter institute name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Session Year</label>
            <input
              type="text"
              value={settings.sessionYear}
              onChange={(e) => setSettings({ ...settings, sessionYear: e.target.value })}
              className="input-focus w-full border rounded-lg px-3 py-2"
              placeholder="2024-2025"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Contact Email</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="input-focus w-full border rounded-lg px-3 py-2"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Contact Phone</label>
            <input
              type="tel"
              value={settings.contactPhone}
              onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
              className="input-focus w-full border rounded-lg px-3 py-2"
              placeholder="+92-300-1234567"
            />
          </div>
        </div>
      </section>

      {/* Display Settings */}
      <section className="ui-card">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Display Settings</h3>
          <p className="text-sm text-gray-500">Customize your interface preferences</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <div className="text-sm font-medium text-gray-800">Dark Mode</div>
            <div className="text-sm text-gray-500">Toggle dark mode for the admin panel</div>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={settings.darkMode}
              onChange={(e) => handleToggleDark(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-orange-500 relative transition">
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-5" />
            </div>
          </label>
        </div>
      </section>

      {/* Data Management */}
      <section className="ui-card">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Data Management</h3>
          <p className="text-sm text-gray-500">Backup and restore system data</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <button onClick={handleBackup} className="btn-outline-orange">
            💾 Backup Data
          </button>
          <button onClick={handleRestore} className="btn-outline-orange">
            ♻️ Restore Data
          </button>
        </div>
      </section>

      {/* System Logs */}
      <section className="ui-card">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">System Logs</h3>
          <p className="text-sm text-gray-500">View recent system activities</p>
        </div>
        <ul className="divide-y mt-4">
          {systemLogs.map((l) => (
            <li key={l.id} className="py-3 flex items-center justify-between hover:bg-gray-50 px-2 rounded transition-colors">
              <span className="text-gray-700 text-sm">{l.text}</span>
              <span className="text-gray-400 text-xs">{l.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );

  const renderDashboard = () => {
    const maxEnroll = Math.max(...enrollmentSample);
    const points = enrollmentSample.map((v, i) => `${(i / (enrollmentSample.length - 1)) * 100},${100 - (v / maxEnroll) * 100}`).join(' ');

    return (
      <div className="space-y-6 fade-in">
        {/* Overview cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="ui-card" style={{transition:'all 0.28s ease', cursor:'pointer'}} onMouseEnter={(e) => e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform='translateY(0)'}>
            <div className="text-sm font-semibold text-gray-500">Total Students</div>
            <div className="text-2xl font-bold text-gray-800 mt-2">1,248</div>
            <div className="text-xs text-gray-400 mt-1">↑ 12% from last month</div>
          </div>
          <div className="ui-card" style={{transition:'all 0.28s ease', cursor:'pointer'}} onMouseEnter={(e) => e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform='translateY(0)'}>
            <div className="text-sm font-semibold text-gray-500">Active Courses</div>
            <div className="text-2xl font-bold text-gray-800 mt-2">24</div>
            <div className="text-xs text-gray-400 mt-1">3 branches</div>
          </div>
          <div className="ui-card" style={{transition:'all 0.28s ease', cursor:'pointer'}} onMouseEnter={(e) => e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform='translateY(0)'}>
            <div className="text-sm font-semibold text-gray-500">Faculty Members</div>
            <div className="text-2xl font-bold text-gray-800 mt-2">18</div>
            <div className="text-xs text-gray-400 mt-1">All departments</div>
          </div>
          <div className="ui-card" style={{transition:'all 0.28s ease', cursor:'pointer'}} onMouseEnter={(e) => e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform='translateY(0)'}>
            <div className="text-sm font-semibold text-gray-500">Total Revenue</div>
            <div className="text-2xl font-bold text-gray-800 mt-2">PKR 2,450,000</div>
            <div className="text-xs text-gray-400 mt-1">↑ 8% increase</div>
          </div>
        </div>

        {/* Enrollment trend + Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 ui-card chart-svg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Enrollment Trend</h3>
              <div className="text-sm text-gray-500">Last 11 months</div>
            </div>
            <div style={{height:160}} className="w-full flex items-center">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                <polyline fill="none" stroke="#f28300" strokeWidth="2" points={points} style={{transition:'stroke-width 0.2s'}} />
              </svg>
            </div>
          </div>

          <div className="ui-card">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">System Alerts</h3>
            <ul className="space-y-3">
              {alerts.map(a => (
                <li key={a.id} className="flex items-start gap-3 hover:bg-gray-50 p-2 rounded transition-colors cursor-pointer">
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
        <div className="ui-card chart-svg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Class Performance</h3>
            <div className="text-sm text-gray-500">Average Scores</div>
          </div>
          <div className="flex items-end gap-4 h-40">
            {performanceSample.map((v, idx) => (
              <div key={idx} className="flex-1 h-full">
                <div className="w-full bg-orange-100 rounded-t-md hover:bg-orange-200 transition-all" style={{height:`${v}%`}} title={`${v}%`} />
                <div className="text-center text-sm mt-2 text-gray-600">Class {idx+1}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="ui-card">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</h3>
          <ul className="space-y-3">
            {recentActivity.map(a => (
              <li key={a.id} className="flex items-start justify-between hover:bg-gray-50 p-2 rounded transition-colors">
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
    // Show Finance module inline when selected
    if (selectedMenu === "finance") {
      return renderFinance();
    }
    // Show Settings module inline when selected
    if (selectedMenu === "settings") {
      return renderSettings();
    }
    // Show Announcements module inline when selected
    if (selectedMenu === "announcements") {
      return renderAnnouncements();
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
            position: relative;
        }
        .topbar-icon:hover {
          background: rgba(255,255,255,0.3);
          transform: scale(1.05);
        }
          .topbar-icon::after {
            content: attr(data-tooltip);
            position: absolute;
            bottom: -35px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.9);
            color: white;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s ease;
            z-index: 1000;
          }
          .topbar-icon:hover::after {
            opacity: 1;
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
        userType="admin"
      />

      {/* Orange Topbar */}
      <div className="topbar">
        <div className="topbar-left">
          <div className="breadcrumb" style={{color:'rgba(255,255,255,0.95)'}}>
            <a href="#" onClick={(e)=>{e.preventDefault(); setSelectedMenu('dashboard')}}>Admin</a>
            <span>/</span>
            <span>{MENU_ITEMS.find(item => item.id === selectedMenu)?.label || 'Dashboard'}</span>
          </div>
        </div>
        <div className="topbar-right">
          <div className="avatar-circle" style={{width:38,height:38,fontSize:14,marginRight:4}}>
            {profileData?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
            <div className="topbar-icon" data-tooltip="Notifications">
            🔔
          </div>
            <div className="topbar-icon" data-tooltip="Logout" onClick={handleLogout}>
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

