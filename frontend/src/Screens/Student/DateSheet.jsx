/*
 * DateSheet Component (MVP) — Concordia College CMS
 * Static render using React with inline styles; integrates with existing Sidebar/Navbar via Home wrapper.
 * Future: Populate the table body from backend API when dates are available.
 */

import React from "react";
import { useSelector } from "react-redux";

const DateSheet = () => {
  const userData = useSelector((state) => state.userData);
  const rollNo = userData?.rollNo || userData?.rollno || userData?.roll || "";

  return (
    <div className="space-y-4">
      <style>{`
        .orange-header { background:#FF6B35; color:#fff; padding:18px 24px; border-radius:16px; font-weight:700; font-size:28px; }
        .panel { background:#FFA752; padding:18px; border-radius:18px; }
        .pill { background:#FFE9C7; color:#FF6B35; text-align:center; padding:16px; border-radius:14px; font-weight:800; font-size:20px; }
        .table { width:100%; border-collapse: collapse; background:#fff; border-radius:12px; overflow:hidden; }
        .table th { background:#FF6B35; color:#fff; text-align:left; padding:12px; font-weight:700; }
        .table td { padding:12px; border-bottom:1px solid #f0f0f0; color:#374151; }
        .note { color:#6b7280; font-size:14px; }
      `}</style>

      <div className="orange-header">
        Date Sheet {rollNo ? `— Roll No. ${rollNo}` : ""}
      </div>

      <div className="panel space-y-4">
        <div className="pill">Not Available</div>

        <div className="bg-white rounded-lg shadow-sm">
          <table className="table" aria-label="Date sheet table">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Subject</th>
                <th>Exam Date</th>
                <th>Time</th>
                <th>Room</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty body by design for MVP */}
            </tbody>
          </table>
        </div>

        <p className="note">Exam schedule will be updated soon.</p>
      </div>
    </div>
  );
};

export default DateSheet;
