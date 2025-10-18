/* SubjectAttendance.jsx - Attendance tab for a subject (sample data) */
import React from "react";

const SubjectAttendance = ({ records = [], percent = 85 }) => {
  const rows = records.length
    ? records
    : [
        { date: "2025-09-01", status: "Present" },
        { date: "2025-09-02", status: "Absent" },
        { date: "2025-09-03", status: "Present" },
      ];
  const gridCells = Array.from({ length: 49 });
  const conic = `conic-gradient(#6C3C00 ${percent * 3.6}deg, #FFE9C7 0)`;

  return (
    <div>
      <style>{`
        .table-att { width:100%; border-collapse: collapse; }
        .table-att th { background:#007BFF; color:#fff; padding:10px; text-align:left; }
        .table-att td { border:1px solid #e5e7eb; padding:10px; }
        .badge { padding:3px 10px; border-radius:999px; font-weight:600; font-size:12px; }
        .present { background:#d1fae5; color:#065f46; }
        .absent { background:#fee2e2; color:#991b1b; }
      `}</style>
      <div>
        <style>{`
          .attn-wrap { display:flex; gap:24px; align-items:center; justify-content:flex-start; }
          .mini-grid { display:grid; grid-template-columns: repeat(7, 16px); grid-auto-rows: 16px; gap:4px; background:#fff; padding:10px; border-radius:8px; }
          .cell { width:16px; height:16px; background:#fff; border:1px solid #E6D0B3; }
          .donut { width:120px; height:120px; border-radius:50%; background:var(--donut); display:grid; place-items:center; }
          .donut-inner { width:84px; height:84px; border-radius:50%; background:#fff; display:grid; place-items:center; color:#6C3C00; font-weight:800; }
        `}</style>
        <div className="attn-wrap">
          <div className="mini-grid">
            {gridCells.map((_, idx) => (
              <div key={idx} className="cell" />
            ))}
          </div>
          <div className="donut" style={{ ['--donut']: conic }}>
            <div className="donut-inner">{percent}%</div>
          </div>
        </div>
      </div>
      <table className="table-att">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.date}</td>
              <td>
                <span className={`badge ${r.status === 'Present' ? 'present' : 'absent'}`}>{r.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectAttendance;
