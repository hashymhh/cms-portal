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
        .card { background:#fff; border-radius:16px; box-shadow:0 1px 2px rgba(0,0,0,0.06); padding:18px; }
        .title { color:#FF6B35; font-weight:800; font-size:28px; text-align:center; }
        .subtitle { color:#6b7280; text-align:center; }
        .calendar { width:100%; border-collapse:separate; border-spacing:0; margin-top:12px; }
        .calendar th { background:#FF6B35; color:#fff; padding:10px; text-align:center; font-weight:800; }
        .calendar td { width:14.285%; height:64px; border:1px solid #FFE0C8; background:#fff; vertical-align:top; }
        .date { color:#FF6B35; font-weight:800; padding:6px 8px; font-size:14px; }
        .note { color:#6b7280; font-size:14px; margin-top:12px; text-align:center; }
        @media (max-width:640px){ .calendar td { height:48px; } .title{ font-size:22px; } }
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
