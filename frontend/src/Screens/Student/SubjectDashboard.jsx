/* SubjectDashboard.jsx - Subject-specific dashboard with tabs (Assignments, Resources, Attendance, Announcements) */
import React, { useEffect, useMemo, useState } from "react";
import SubjectAssignments from "./SubjectAssignments";
import SubjectResources from "./SubjectResources";
import SubjectAttendance from "./SubjectAttendance";
import SubjectAnnouncements from "./SubjectAnnouncements";

const SubjectDashboard = ({ subject, initialTab = "menu", onBack, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Sample per-subject data
  const data = useMemo(() => {
    const defaults = {
      assignments: [
        { srNo: 1, title: "Assignment No. 1", totalMarks: 20, obtainedMarks: 18, dueDate: "2025-10-20" },
        { srNo: 2, title: "Assignment No. 2", totalMarks: 20, obtainedMarks: null, dueDate: "2025-10-27" },
      ],
      resources: [],
      attendance: [],
      announcements: [],
    };

    const bySubject = {
      1: {
        assignments: defaults.assignments,
        resources: [],
        attendance: [
          { date: "2025-09-01", status: "Present" },
          { date: "2025-09-02", status: "Absent" },
        ],
        announcements: [
          { title: "Test Announcement 1", date: "2025-09-05", description: "Welcome to Subject 1" },
        ],
      },
      2: {
        assignments: [
          { srNo: 1, title: "Lab Report 1", totalMarks: 30, obtainedMarks: 28, dueDate: "2025-10-22" },
        ],
        resources: [{ title: "Syllabus PDF", type: "PDF", url: "#" }],
        attendance: [
          { date: "2025-09-01", status: "Present" },
          { date: "2025-09-03", status: "Present" },
        ],
        announcements: [
          { title: "Lab Safety", date: "2025-09-03", description: "Bring lab coat" },
          { title: "Midterm Info", date: "2025-09-12", description: "Scope updated" },
        ],
      },
      3: {
        assignments: [
          { srNo: 1, title: "Practical Work", totalMarks: 25, obtainedMarks: 22, dueDate: "2025-10-18" },
          { srNo: 2, title: "Theory Assignment", totalMarks: 15, obtainedMarks: null, dueDate: "2025-10-28" },
        ],
        resources: [],
        attendance: [
          { date: "2025-09-05", status: "Present" },
          { date: "2025-09-06", status: "Absent" },
        ],
        announcements: [],
      },
      4: {
        assignments: [
          { srNo: 1, title: "Project Proposal", totalMarks: 40, obtainedMarks: 35, dueDate: "2025-10-30" },
        ],
        resources: [{ title: "Reference Link", type: "Link", url: "#" }],
        attendance: [],
        announcements: [
          { title: "Group Formation", date: "2025-09-08", description: "Teams of 3" },
          { title: "Consultation Hours", date: "2025-09-10", description: "Wed 2-4pm" },
        ],
      },
    };

    return bySubject[subject?.id] || defaults;
  }, [subject]);

  const tabs = [
    { id: "assignments", label: "Assignment", icon: "📝" },
    { id: "resources", label: "Resources", icon: "📖" },
    { id: "attendance", label: "Attendance", icon: "📅" },
    { id: "announcements", label: "Announcement", icon: "📣" },
  ];

  return (
    <div>
      <style>{`
        .orange-header { background:#FF8B2D; color:#fff; padding:18px 24px; border-radius:16px; font-weight:700; font-size:28px; }
        .panel { background:#FFA752; padding:18px; border-radius:18px; }
        .tile-grid { display:grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap:20px; }
        .tile { background:#fff; border-radius:14px; padding:18px; text-align:center; cursor:pointer; box-shadow:0 1px 2px rgba(0,0,0,0.06); }
        .tile:hover { transform: translateY(-1px); box-shadow: 0 4px 10px rgba(0,0,0,0.08); }
        .subheader { background:#FFD9A8; color:#FF8B2D; font-weight:700; text-align:center; padding:10px; border-radius:10px; }
        .content { background:#FFA752; padding:16px; border-radius:14px; }
        .back-btn { color:#6b7280; }
        @media (max-width: 900px){ .tile-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 540px){ .tile-grid { grid-template-columns: repeat(1, minmax(0, 1fr)); } }
      `}</style>

      <div className="flex items-center justify-between mb-4">
        <div className="orange-header">{subject?.name || 'Subject'}</div>
        <button type="button" onClick={() => (onBack ? onBack() : null)} className="back-btn hover:underline">
          ← Back
        </button>
      </div>

      {activeTab === 'menu' && (
        <div className="panel">
          <div className="tile-grid">
            {tabs.map((t) => (
              <div key={t.id} className="tile" onClick={() => { setActiveTab(t.id); if (onTabChange) onTabChange(t.id); }}>
                <div className="text-lg font-semibold mb-2">{t.label}</div>
                <div style={{fontSize: 40}}>{t.icon}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab !== 'menu' && (
        <div className="space-y-3">
          <div className="subheader">{tabs.find(x => x.id === activeTab)?.label || ''}</div>
          <div className="content">
            {activeTab === "assignments" && <SubjectAssignments assignments={data.assignments} />}
            {activeTab === "resources" && <SubjectResources resources={data.resources} />}
            {activeTab === "attendance" && <SubjectAttendance records={data.attendance} />}
            {activeTab === "announcements" && <SubjectAnnouncements announcements={data.announcements} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectDashboard;
