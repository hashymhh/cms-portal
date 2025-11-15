/* 
 * Course Component for Concordia College CMS
 * Displays student courses with subjects, attendance, and assignments
 */

import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SubjectDashboard from "./SubjectDashboard";

const Course = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Sample data (would come from API in production)
  const sampleSubjects = [
    { id: 1, name: "Subject 1", icon: "📐" },
    { id: 2, name: "Subject 2", icon: "⚛️" },
    { id: 3, name: "Subject 3", icon: "🧪" },
    { id: 4, name: "Subject 4", icon: "🧬" },
  ];

  // Read URL params for subjectId and tab
  const { subjectFromUrl, tabFromUrl } = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const sid = params.get("subjectId");
    const tab = params.get("tab") || "menu";
    return { subjectFromUrl: sid ? Number(sid) : null, tabFromUrl: tab };
  }, [location.search]);

  const selectedSubject = sampleSubjects.find(s => s.id === subjectFromUrl) || null;

  const handleOpenSubject = (subjectId) => {
    const params = new URLSearchParams(location.search);
    params.set("subjectId", String(subjectId));
    params.delete("tab");
    navigate(`/student?${params.toString()}`);
  };

  const handleBackToCourses = () => {
    const params = new URLSearchParams(location.search);
    params.delete("subjectId");
    params.delete("tab");
    navigate(`/student?${params.toString()}`);
  };

  const handleTabChange = (tabId) => {
    const params = new URLSearchParams(location.search);
    params.set("tab", tabId);
    navigate(`/student?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <style>{`
        .orange-header { background:#FF8B2D; color:#fff; padding:18px 24px; border-radius:16px; font-weight:700; font-size:28px; }
        .panel { background:#FFA752; padding:18px; border-radius:18px; }
        .subjects-grid { display:grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap:20px; }
        .subject-tile { background:#fff; border-radius:14px; padding:16px; text-align:center; cursor:pointer; box-shadow:0 1px 2px rgba(0,0,0,0.06); }
        .subject-tile:hover { transform: translateY(-1px); box-shadow: 0 4px 10px rgba(0,0,0,0.08); }
        .subject-icon { font-size: 44px; }
        @media (max-width: 900px){ .subjects-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 540px){ .subjects-grid { grid-template-columns: repeat(1, minmax(0, 1fr)); } }
      `}</style>

      {!selectedSubject ? (
        <div className="space-y-4">
          <div className="orange-header">Course</div>
          <div className="panel">
            <div className="subjects-grid">
              {sampleSubjects.map((s) => (
                <div key={s.id} className="subject-tile" onClick={() => handleOpenSubject(s.id)}>
                  <div className="text-lg font-semibold mb-2">{s.name}</div>
                  <div className="subject-icon">{s.icon}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <SubjectDashboard
          subject={{ id: selectedSubject.id, name: selectedSubject.name }}
          initialTab={tabFromUrl}
          onBack={handleBackToCourses}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
};

export default Course;
