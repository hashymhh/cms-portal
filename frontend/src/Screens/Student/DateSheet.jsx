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
        .orange-header { 
          position:relative; 
          background:linear-gradient(135deg,#f28300,#ff9d4d); 
          color:#fff; 
          padding:28px 40px; 
          border-radius:20px; 
          font-weight:700; 
          font-size:30px; 
          box-shadow:0 6px 28px -6px rgba(242,131,0,0.45),0 2px 6px rgba(0,0,0,0.08); 
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
          background:linear-gradient(145deg,#fff7ee,#ffe9d1); 
          padding:32px; 
          border-radius:22px; 
          border:1px solid #ffe0c2; 
          box-shadow:0 4px 20px -6px rgba(242,131,0,0.2); 
        }
        .pill { 
          background:linear-gradient(135deg,#fff2d9,#ffe4cc); 
          color:#d97200; 
          text-align:center; 
          padding:20px; 
          border-radius:16px; 
          font-weight:800; 
          font-size:20px; 
          box-shadow:0 4px 16px rgba(242,131,0,0.2); 
          border:1px solid #ffe0c2; 
        }
        .table { 
          width:100%; 
          border-collapse:collapse; 
          background:linear-gradient(160deg,#ffffff,#fffaf3); 
          border-radius:16px; 
          overflow:hidden; 
          box-shadow:0 6px 22px -8px rgba(0,0,0,.12); 
          border:1px solid #f3e2cc; 
        }
        .table th { 
          background:linear-gradient(135deg,#f28300,#ff9d4d); 
          color:#fff; 
          text-align:left; 
          padding:16px; 
          font-weight:700; 
          letter-spacing:.3px; 
        }
        .table td { 
          padding:14px 16px; 
          border-bottom:1px solid #f0e6d8; 
          color:#374151; 
          font-weight:500; 
        }
        .note { 
          color:#8a5a15; 
          font-size:14px; 
          font-weight:600; 
          text-align:center; 
        }
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
