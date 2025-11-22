/*
 * Academic Calendar (MVP) — Concordia College CMS
 * Static React render with inline styles and orange/white theme.
 * Future: Fill events inside the grid from backend; for now, no events/highlights.
 */

import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const Calender = () => {
  const userData = useSelector((state) => state.userData);
  const rollNo = userData?.rollNo || userData?.rollno || userData?.roll || "";

  // Build a static calendar for September 2025
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const totalDays = 30; // Sept 2025 has 30 days
  const startIndex = 1; // Sept 1, 2025 is Monday (index 1 when starting from Sunday)

  const cells = useMemo(() => {
    const arr = Array(35).fill(null); // 5 rows x 7 cols fits September 2025
    for (let i = 0; i < totalDays; i++) {
      arr[startIndex + i] = i + 1;
    }
    return arr;
  }, []);

  return (
    <div className="space-y-4">
      <style>{`
        .card { 
          position:relative; 
          background:linear-gradient(160deg,#ffffff,#fffaf3 92%); 
          border-radius:22px; 
          box-shadow:0 6px 24px -8px rgba(0,0,0,.12); 
          padding:32px; 
          border:1px solid #f3e2cc; 
          overflow:hidden; 
        }
        .card:before { 
          content:''; 
          position:absolute; 
          top:-60px; 
          right:-60px; 
          width:160px; 
          height:160px; 
          background:linear-gradient(135deg,rgba(242,131,0,0.3),rgba(255,157,77,0.35)); 
          filter:blur(40px); 
          opacity:.4; 
        }
        .title { 
          color:#d97200; 
          font-weight:800; 
          font-size:30px; 
          text-align:center; 
          letter-spacing:.5px; 
          position:relative; 
        }
        .subtitle { 
          color:#8a5a15; 
          text-align:center; 
          font-weight:600; 
        }
        .calendar { 
          width:100%; 
          border-collapse:separate; 
          border-spacing:0; 
          margin-top:24px; 
          border-radius:16px; 
          overflow:hidden; 
          box-shadow:0 4px 18px rgba(242,131,0,0.15); 
        }
        .calendar th { 
          background:linear-gradient(135deg,#f28300,#ff9d4d); 
          color:#fff; 
          padding:14px; 
          text-align:center; 
          font-weight:800; 
          letter-spacing:.5px; 
        }
        .calendar td { 
          width:14.285%; 
          height:70px; 
          border:1px solid #f0e6d8; 
          background:linear-gradient(160deg,#ffffff,#fffbf5); 
          vertical-align:top; 
          transition:all .3s; 
          position:relative; 
        }
        .calendar td:hover { 
          background:linear-gradient(145deg,#fff5e6,#ffe4cc); 
          transform:scale(1.05); 
          box-shadow:0 4px 14px rgba(242,131,0,0.25); 
          z-index:10; 
        }
        .date { 
          color:#f28300; 
          font-weight:800; 
          padding:8px 10px; 
          font-size:15px; 
        }
        .note { 
          color:#8a5a15; 
          font-size:14px; 
          margin-top:20px; 
          text-align:center; 
          font-weight:600; 
        }
        @media (max-width:640px){ 
          .calendar td { height:52px; } 
          .title{ font-size:24px; } 
        }
      `}</style>

      <div className="card">
        <div className="title">Academic Calendar: Sep 2025 {rollNo ? `— Roll No. ${rollNo}` : ""}</div>
        <table className="calendar" aria-label="September 2025 calendar">
          <thead>
            <tr>
              {daysOfWeek.map((d) => (
                <th key={d} scope="col">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {Array.from({ length: 7 }).map((__, colIdx) => {
                  const idx = rowIdx * 7 + colIdx;
                  const day = cells[idx];
                  return (
                    <td key={colIdx} aria-label={day ? `September ${day}, 2025` : "Empty"}>
                      {day ? <div className="date">{day}</div> : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="note">Key dates and events will be updated soon.</div>
      </div>
    </div>
  );
};

export default Calender;
