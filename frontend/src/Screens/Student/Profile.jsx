/* 
 * Profile — Concordia College CMS Student Portal
 * Complete student profile with Personal Info, Academic Info, and Contact Details
 */

import React from "react";

const Profile = ({ profileData }) => {
  if (!profileData) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <style>{`
        .profile-container { max-width: 1200px; margin: 0 auto; }
        .profile-header {
          position: relative;
          background: linear-gradient(135deg, #f28300 0%, #ff9d4d 100%);
          color: white;
          padding: 28px 40px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 30px;
          box-shadow: 0 6px 28px -6px rgba(242,131,0,0.45), 0 2px 6px rgba(0,0,0,0.08);
          margin-bottom: 32px;
          overflow: hidden;
        }
        .profile-header:after {
          content: '';
          position: absolute;
            inset: 0;
          background: radial-gradient(circle at 85% 25%, rgba(255,255,255,0.35), transparent 60%);
          pointer-events: none;
        }
        .profile-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
          gap: 20px;
          margin-bottom: 8px;
        }
        .stat-card {
          background: linear-gradient(145deg,#fff,#fff5e6);
          border: 1px solid #ffe4cc;
          border-radius: 16px;
          padding: 18px 20px 16px;
          position: relative;
          box-shadow: 0 4px 14px -4px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.06);
          transition: transform .35s cubic-bezier(.4,0,.2,1), box-shadow .35s;
        }
        .stat-card:hover { transform: translateY(-6px); box-shadow: 0 10px 28px -6px rgba(242,131,0,0.35),0 4px 10px rgba(0,0,0,0.08); }
        .stat-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .5px; color:#d97200; }
        .stat-value { font-size: 20px; font-weight: 700; color:#333; margin-top:2px; }
        .profile-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:28px; margin-top:24px; }
        .profile-card { background: linear-gradient(160deg,#ffffff 0%,#fffaf3 90%); border-radius: 20px; padding: 28px 30px 30px; box-shadow: 0 6px 24px -8px rgba(0,0,0,.12); border:1px solid #f3e2cc; position:relative; overflow:hidden; transition:transform .35s, box-shadow .35s; }
        .profile-card:before { content:''; position:absolute; top:-60px; right:-60px; width:160px; height:160px; background:linear-gradient(135deg,rgba(242,131,0,0.35),rgba(255,157,77,0.4)); filter:blur(40px); opacity:.35; }
        .profile-card:hover { transform:translateY(-6px); box-shadow:0 14px 36px -10px rgba(242,131,0,.35),0 6px 14px rgba(0,0,0,.08); }
        .profile-card-full { grid-column:1 / -1; }
        .avatar-section { display:flex; flex-direction:column; align-items:center; padding-bottom:22px; border-bottom:2px solid #f5f0e6; margin-bottom:22px; }
        .avatar-circle { width:110px; height:110px; border-radius:50%; background:linear-gradient(145deg,#ff9d4d,#f28300); display:flex; align-items:center; justify-content:center; font-size:50px; font-weight:700; color:#fff; margin-bottom:18px; box-shadow:0 10px 28px -6px rgba(242,131,0,.55),0 2px 6px rgba(0,0,0,.12), inset 0 0 0 4px rgba(255,255,255,.5); position:relative; }
        .avatar-circle:after { content:''; position:absolute; inset:0; border-radius:inherit; background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.35),transparent 70%); }
        .student-name { font-size:24px; font-weight:700; color:#222; letter-spacing:.3px; }
        .student-id { font-size:13px; color:#8a5a15; background:#fff2d9; padding:5px 14px; border-radius:24px; font-weight:600; box-shadow:0 2px 6px rgba(242,131,0,.18); }
        .section-title { font-size:18px; font-weight:700; color:#d97200; padding-bottom:12px; border-bottom:2px solid #ffe4cc; margin-bottom:20px; display:flex; align-items:center; gap:8px; }
        .section-title:before { content:''; width:10px; height:10px; border-radius:3px; background:#f28300; box-shadow:0 0 0 4px rgba(242,131,0,.25); }
        .info-row { display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid #f1e9dc; }
        .info-row:last-child { border-bottom:none; }
        .info-label { font-weight:600; color:#6b5c4a; font-size:13px; letter-spacing:.3px; }
        .info-value { color:#2f2f2f; font-weight:500; font-size:13px; text-align:right; }
        @media (max-width: 900px){ .profile-card-full{ grid-column:1; } }
      `}</style>

      <div className="profile-container">
        <div className="profile-header">Student Profile</div>

        {/* Quick Stats */}
        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-label">Semester</div>
            <div className="stat-value">{profileData?.semester || profileData?.currentSemester || '—'}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Section</div>
            <div className="stat-value">{profileData?.section || '—'}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Batch</div>
            <div className="stat-value">{profileData?.batch || profileData?.year || '—'}</div>
          </div>
        </div>

        <div className="profile-grid">
          {/* Personal Information Card */}
          <div className="profile-card">
            <div className="avatar-section">
              <div className="avatar-circle">
                {(profileData?.firstName?.charAt(0) || profileData?.name?.charAt(0) || 'S').toUpperCase()}
              </div>
              <div className="student-name">
                {profileData?.firstName || profileData?.name || "Student"}
              </div>
              <div className="student-id">
                ID: {profileData?.registrationNumber || profileData?.studentId || "N/A"}
              </div>
            </div>
            
            <div className="section-title">Personal Information</div>
            <div className="info-row">
              <span className="info-label">Full Name</span>
              <span className="info-value">{profileData?.firstName || profileData?.name || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Father's Name</span>
              <span className="info-value">{profileData?.fatherName || profileData?.fatherMiddleName || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Date of Birth</span>
              <span className="info-value">{profileData?.dob || profileData?.dateOfBirth || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Gender</span>
              <span className="info-value">{profileData?.gender || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">CNIC</span>
              <span className="info-value">{profileData?.cnic || "N/A"}</span>
            </div>
          </div>

          {/* Academic Information Card */}
          <div className="profile-card">
            <div className="section-title">Academic Information</div>
            <div className="info-row">
              <span className="info-label">Registration No.</span>
              <span className="info-value">{profileData?.registrationNumber || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Roll Number</span>
              <span className="info-value">{profileData?.rollNo || profileData?.rollno || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Department</span>
              <span className="info-value">{profileData?.department || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Program/Degree</span>
              <span className="info-value">{profileData?.course || profileData?.degree || profileData?.program || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Section</span>
              <span className="info-value">{profileData?.section || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Batch</span>
              <span className="info-value">{profileData?.batch || profileData?.year || "N/A"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Semester</span>
              <span className="info-value">{profileData?.semester || profileData?.currentSemester || "N/A"}</span>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="profile-card profile-card-full">
            <div className="section-title">Contact Information</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 40px' }}>
              <div className="info-row">
                <span className="info-label">Email</span>
                <span className="info-value">{profileData?.email || "N/A"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Phone Number</span>
                <span className="info-value">{profileData?.phoneNumber || profileData?.contactNo || "N/A"}</span>
              </div>
              <div className="info-row" style={{ gridColumn: '1 / -1' }}>
                <span className="info-label">Address</span>
                <span className="info-value">{profileData?.address || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
