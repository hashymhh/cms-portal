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
        .orange-header { 
          position:relative; 
          background:linear-gradient(135deg,#f28300 0%,#ff9d4d 100%); 
          color:#fff; 
          padding:28px 40px; 
          border-radius:20px; 
          font-weight:700; 
          font-size:30px; 
          box-shadow:0 6px 28px -6px rgba(242,131,0,0.45), 0 2px 6px rgba(0,0,0,0.08); 
          margin-bottom:28px; 
          overflow:hidden; 
        }
        .orange-header:after { 
          content:''; 
          position:absolute; 
          inset:0; 
          background:radial-gradient(circle at 85% 25%, rgba(255,255,255,0.35), transparent 60%); 
          pointer-events:none; 
        }
        .panel { 
          background:linear-gradient(145deg,#fff7ee 0%,#ffe9d1 100%); 
          padding:32px; 
          border-radius:22px; 
          border:1px solid #ffe0c2; 
          box-shadow:0 4px 20px -6px rgba(242,131,0,0.2); 
        }
        .subjects-grid { 
          display:grid; 
          grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); 
          gap:26px; 
        }
        .subject-tile { 
          position:relative; 
          background:linear-gradient(160deg,#ffffff 0%,#fffaf3 90%); 
          border:1px solid #f3e2cc; 
          border-radius:18px; 
          padding:28px 20px 26px; 
          text-align:center; 
          cursor:pointer; 
          box-shadow:0 6px 22px -8px rgba(0,0,0,.12); 
          transition:transform .35s cubic-bezier(.4,0,.2,1), box-shadow .35s; 
          overflow:hidden; 
        }
        .subject-tile:before { 
          content:''; 
          position:absolute; 
          top:-50px; 
          right:-50px; 
          width:140px; 
          height:140px; 
          background:linear-gradient(135deg,rgba(242,131,0,0.3),rgba(255,157,77,0.35)); 
          filter:blur(35px); 
          opacity:.4; 
        }
        .subject-tile:hover { 
          transform:translateY(-8px) scale(1.02); 
          box-shadow:0 14px 36px -10px rgba(242,131,0,.35), 0 6px 14px rgba(0,0,0,.08); 
        }
        .subject-tile .text-lg { 
          font-size:17px; 
          font-weight:700; 
          color:#2f2f2f; 
          margin-bottom:14px; 
          letter-spacing:.3px; 
          position:relative; 
        }
        .subject-icon { 
          font-size:56px; 
          filter:drop-shadow(0 4px 10px rgba(242,131,0,0.25)); 
          transition:transform .3s; 
        }
        .subject-tile:hover .subject-icon { 
          transform:scale(1.1) rotate(5deg); 
        }
        @media (max-width: 900px){ .subjects-grid { grid-template-columns:repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 540px){ .subjects-grid { grid-template-columns:1fr; } }
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
