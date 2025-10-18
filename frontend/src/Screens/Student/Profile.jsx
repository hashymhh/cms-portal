/* 
 * Profile (MVP) — Concordia College CMS
 * Simple orange-themed profile matching PDF page 1 design
 * Displays Personal Info and Academic Information cards only
 */

import React from "react";

const Profile = ({ profileData }) => {
  if (!profileData) return null;

  return (
    <div className="space-y-4">
      <style>{`
        .orange-header { background:#FF8B2D; color:#fff; padding:18px 24px; border-radius:16px; font-weight:700; font-size:28px; }
        .panel { background:#FFA752; padding:18px; border-radius:18px; display:grid; grid-template-columns: 1fr 1fr; gap:18px; }
        .info-card { background:#fff; border-radius:14px; padding:16px; box-shadow:0 1px 2px rgba(0,0,0,0.06); }
        .avatar { width:80px; height:80px; border-radius:50%; background:#E91E63; display:flex; align-items:center; justify-content:center; margin:0 auto 12px; }
        .section-title { text-align:center; font-weight:800; padding-bottom:8px; border-bottom:2px solid #333; margin-bottom:12px; }
        .info-row { display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #f0f0f0; }
        .info-row:last-child { border-bottom:none; }
        .label { font-weight:700; color:#333; }
        .value { color:#555; }
        @media (max-width:900px){ .panel { grid-template-columns: 1fr; } }
      `}</style>

      <div className="orange-header">Profile</div>

      <div className="panel">
        {/* Personal Info Card */}
        <div className="info-card">
          <div className="avatar">
            <span style={{fontSize:40}}>👤</span>
          </div>
          <div className="section-title">Personal Info</div>
          <div className="info-row">
            <span className="label">Name</span>
            <span className="value">{profileData?.firstName || profileData?.name || "Fatima"}</span>
          </div>
          <div className="info-row">
            <span className="label">Father's Name</span>
            <span className="value">{profileData?.fatherName || profileData?.fatherMiddleName || "Tariq"}</span>
          </div>
        </div>

        {/* Academic Information Card */}
        <div className="info-card">
          <div className="section-title">Academic Information</div>
          <div className="info-row">
            <span className="label">Registration No.</span>
            <span className="value">{profileData?.registrationNumber || "4535"}</span>
          </div>
          <div className="info-row">
            <span className="label">Roll no.</span>
            <span className="value">{profileData?.rollNo || profileData?.rollno || "53"}</span>
          </div>
          <div className="info-row">
            <span className="label">Degree</span>
            <span className="value">{profileData?.course || profileData?.degree || "ICS"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
