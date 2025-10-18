/* 
 * NO NEW FILES CREATED - This is an update to the existing Profile.jsx View file
 * Updated to replicate Concordia College CMS Profile Design (Pages 1 & 2)
 * View Layer Only - No Models or Controllers Modified
 */

import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import UpdatePasswordLoggedIn from "../../components/UpdatePasswordLoggedIn";

const Profile = ({ profileData }) => {
  const [showPasswordUpdate, setShowPasswordUpdate] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [expandedSubject, setExpandedSubject] = useState(null);
  
  if (!profileData) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Sample data for demonstration (would come from API in production)
  const sampleSubjects = [
    {
      id: 1,
      name: "Mathematics",
      attendance: "85%",
      resources: 12,
      announcements: 3,
      assignments: [
        { srNo: 1, title: "Assignment 1", totalMarks: 20, obtainedMarks: 18, dueDate: "2025-10-20", submitted: true },
        { srNo: 2, title: "Assignment 2", totalMarks: 20, obtainedMarks: 15, dueDate: "2025-10-25", submitted: false },
      ]
    },
    {
      id: 2,
      name: "Physics",
      attendance: "90%",
      resources: 8,
      announcements: 2,
      assignments: [
        { srNo: 1, title: "Lab Report 1", totalMarks: 30, obtainedMarks: 28, dueDate: "2025-10-22", submitted: true },
      ]
    }
  ];

  const timeTableData = [
    { day: "Monday", subject: "Math", time: "12:00 - 1:30", room: "403", teacher: "Dr. Ahmed" },
    { day: "Monday", subject: "Physics", time: "2:00 - 3:30", room: "201", teacher: "Prof. Khan" },
    { day: "Tuesday", subject: "Chemistry", time: "10:00 - 11:30", room: "305", teacher: "Dr. Ali" },
    { day: "Wednesday", subject: "Math", time: "12:00 - 1:30", room: "403", teacher: "Dr. Ahmed" },
    { day: "Thursday", subject: "Physics Lab", time: "2:00 - 4:00", room: "Lab 1", teacher: "Prof. Khan" },
    { day: "Friday", subject: "Computer Science", time: "9:00 - 10:30", room: "502", teacher: "Ms. Fatima" },
  ];

  const feeVouchers = [
    { srNo: 1, voucherNo: "V2025001", issuedDate: "2025-09-01", dueDate: "2025-09-15", amount: "15,000", status: "Paid" },
    { srNo: 2, voucherNo: "V2025002", issuedDate: "2025-10-01", dueDate: "2025-10-15", amount: "15,000", status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .profile-container * {
          font-family: 'Inter', Arial, sans-serif;
        }
        
        .concordia-header {
          background: linear-gradient(135deg, #007BFF 0%, #0056b3 100%);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .tab-button {
          transition: all 0.3s ease;
          border-bottom: 3px solid transparent;
        }
        
        .tab-button:hover {
          background-color: rgba(0, 123, 255, 0.1);
        }
        
        .tab-button.active {
          border-bottom-color: #007BFF;
          color: #007BFF;
          font-weight: 600;
        }
        
        .card-section {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
          transition: box-shadow 0.3s ease;
        }
        
        .card-section:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }
        
        .info-row {
          display: grid;
          grid-template-columns: 180px 1fr;
          padding: 12px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .info-row:last-child {
          border-bottom: none;
        }
        
        .info-label {
          font-weight: 600;
          color: #374151;
        }
        
        .info-value {
          color: #1f2937;
        }
        
        .table-concordia {
          width: 100%;
          border-collapse: collapse;
          margin-top: 16px;
        }
        
        .table-concordia th {
          background-color: #007BFF;
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: 600;
          border: 1px solid #0056b3;
        }
        
        .table-concordia td {
          padding: 12px;
          border: 1px solid #e5e7eb;
          color: #374151;
        }
        
        .table-concordia tbody tr:nth-child(even) {
          background-color: #f9fafb;
        }
        
        .table-concordia tbody tr:hover {
          background-color: #eff6ff;
        }
        
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .status-paid {
          background-color: #d1fae5;
          color: #065f46;
        }
        
        .status-pending {
          background-color: #fef3c7;
          color: #92400e;
        }
        
        .subject-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          margin-bottom: 16px;
          overflow: hidden;
        }
        
        .subject-header {
          background-color: #f3f4f6;
          padding: 16px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background-color 0.3s ease;
        }
        
        .subject-header:hover {
          background-color: #e5e7eb;
        }
        
        .subject-details {
          padding: 16px;
          background-color: white;
        }
        
        .attendance-indicator {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background-color: #dcfce7;
          color: #166534;
          border-radius: 16px;
          font-weight: 600;
        }
        
        @media (max-width: 768px) {
          .info-row {
            grid-template-columns: 1fr;
            gap: 4px;
          }
          
          .table-concordia {
            font-size: 14px;
          }
          
          .table-concordia th,
          .table-concordia td {
            padding: 8px;
          }
        }
      `}</style>

      <div className="profile-container">
        {/* Concordia Header with Logo */}
        <div className="concordia-header text-white py-6 px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Logo placeholder - update src to actual logo path */}
              <img 
                src="/assets/concordia-logo.png" 
                alt="Concordia College Logo" 
                className="h-16 w-16 bg-white rounded-full p-2"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div>
                <h1 className="text-3xl font-bold">Concordia College</h1>
                <p className="text-sm text-blue-100">College Management System</p>
              </div>
            </div>
            <div className="text-right">
              <CustomButton
                onClick={() => setShowPasswordUpdate(!showPasswordUpdate)}
                variant="primary"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                {showPasswordUpdate ? "Hide" : "Update Password"}
              </CustomButton>
            </div>
          </div>
        </div>

        {showPasswordUpdate && (
          <div className="max-w-7xl mx-auto px-8 pt-4">
            <UpdatePasswordLoggedIn
              onClose={() => setShowPasswordUpdate(false)}
            />
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex gap-1 overflow-x-auto">
              {[
                { id: "profile", label: "Profile" },
                { id: "courses", label: "Courses" },
                { id: "timetable", label: "TimeTable" },
                { id: "datesheet", label: "DateSheet" },
                { id: "calendar", label: "Calendar" },
                { id: "feedback", label: "Feedback" },
                { id: "fee", label: "Fee Voucher" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-button px-6 py-4 text-sm font-medium ${
                    activeTab === tab.id ? 'active' : 'text-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-8 py-8">
          
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              {/* Personal Info Section */}
              <div className="card-section p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-blue-500">
                  Personal Information
                </h2>
                <div className="space-y-2">
                  <div className="info-row">
                    <div className="info-label">Name:</div>
                    <div className="info-value">
                      {profileData.firstName || "Fatima"} {profileData.middleName || ""} {profileData.lastName || ""}
                    </div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Father's Name:</div>
                    <div className="info-value">
                      {profileData.emergencyContact?.name || "Tariq"}
                    </div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Email:</div>
                    <div className="info-value">{profileData.email || "-"}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Phone:</div>
                    <div className="info-value">{profileData.phone || "-"}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Gender:</div>
                    <div className="info-value capitalize">{profileData.gender || "-"}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Blood Group:</div>
                    <div className="info-value">{profileData.bloodGroup || "-"}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Date of Birth:</div>
                    <div className="info-value">{formatDate(profileData.dob)}</div>
                  </div>
                </div>
              </div>

              {/* Academic Information Section */}
              <div className="card-section p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-blue-500">
                  Academic Information
                </h2>
                <div className="space-y-2">
                  <div className="info-row">
                    <div className="info-label">Registration No:</div>
                    <div className="info-value">{profileData.enrollmentNo || "4535"}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Roll No:</div>
                    <div className="info-value">{profileData.rollNo || "53"}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Degree:</div>
                    <div className="info-value">{profileData.branchId?.name || "ICS"}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Semester:</div>
                    <div className="info-value">{profileData.semester ?? "-"}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Batch:</div>
                    <div className="info-value">{profileData.batch || "2025"}</div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="card-section p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-blue-500">
                  Address Information
                </h2>
                <div className="space-y-2">
                  <div className="info-row">
                    <div className="info-label">Address:</div>
                    <div className="info-value">{profileData.address || "-"}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">City:</div>
                    <div className="info-value">{profileData.city || "-"}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">State:</div>
                    <div className="info-value">{profileData.state || "-"}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Pincode:</div>
                    <div className="info-value">{profileData.pincode || "-"}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Country:</div>
                    <div className="info-value">{profileData.country || "-"}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <div className="space-y-6">
              <div className="card-section p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500">
                  My Courses
                </h2>
                
                {sampleSubjects.map((subject) => (
                  <div key={subject.id} className="subject-card">
                    <div 
                      className="subject-header"
                      onClick={() => setExpandedSubject(expandedSubject === subject.id ? null : subject.id)}
                    >
                      <div className="flex items-center gap-4">
                        <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
                        <span className="attendance-indicator">
                          📊 Attendance: {subject.attendance}
                        </span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-sm text-gray-600">📚 Resources: {subject.resources}</span>
                        <span className="text-sm text-gray-600">📢 Announcements: {subject.announcements}</span>
                        <span className="text-2xl text-gray-400">
                          {expandedSubject === subject.id ? "−" : "+"}
                        </span>
                      </div>
                    </div>
                    
                    {expandedSubject === subject.id && (
                      <div className="subject-details">
                        <h4 className="font-semibold text-gray-900 mb-3">Assignments</h4>
                        <table className="table-concordia">
                          <thead>
                            <tr>
                              <th>Sr No</th>
                              <th>Title</th>
                              <th>Total Marks</th>
                              <th>Obtained Marks</th>
                              <th>Due Date</th>
                              <th>Submit File</th>
                            </tr>
                          </thead>
                          <tbody>
                            {subject.assignments.map((assignment) => (
                              <tr key={assignment.srNo}>
                                <td>{assignment.srNo}</td>
                                <td>{assignment.title}</td>
                                <td>{assignment.totalMarks}</td>
                                <td>{assignment.obtainedMarks}</td>
                                <td>{assignment.dueDate}</td>
                                <td>
                                  {assignment.submitted ? (
                                    <span className="status-badge status-paid">✓ Submitted</span>
                                  ) : (
                                    <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                                      Upload
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TimeTable Tab */}
          {activeTab === "timetable" && (
            <div className="card-section p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500">
                Weekly TimeTable
              </h2>
              <table className="table-concordia">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Subject</th>
                    <th>Time</th>
                    <th>Room</th>
                    <th>Teacher</th>
                  </tr>
                </thead>
                <tbody>
                  {timeTableData.map((entry, index) => (
                    <tr key={index}>
                      <td className="font-semibold">{entry.day}</td>
                      <td>{entry.subject}</td>
                      <td>{entry.time}</td>
                      <td>{entry.room}</td>
                      <td>{entry.teacher}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* DateSheet Tab */}
          {activeTab === "datesheet" && (
            <div className="card-section p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500">
                Examination DateSheet
              </h2>
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="text-6xl mb-4">📅</div>
                  <p className="text-xl font-semibold text-gray-600">Not Available</p>
                  <p className="text-sm text-gray-500 mt-2">DateSheet will be published soon</p>
                </div>
              </div>
            </div>
          )}

          {/* Calendar Tab */}
          {activeTab === "calendar" && (
            <div className="card-section p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500">
                Academic Calendar
              </h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">📆</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Current Semester</h3>
                    <p className="text-lg text-gray-700 mt-1">September 2025 - January 2026</p>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="font-medium">Semester Start:</span>
                    <span>Sep 1, 2025</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="font-medium">Mid-Term Exams:</span>
                    <span>Oct 20-25, 2025</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="font-medium">Final Exams:</span>
                    <span>Jan 10-20, 2026</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Semester End:</span>
                    <span>Jan 30, 2026</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Feedback Tab */}
          {activeTab === "feedback" && (
            <div className="card-section p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500">
                Student Feedback
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Your feedback helps us improve the quality of education. Please share your thoughts about courses, faculty, and facilities.
                </p>
                <form className="space-y-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Subject</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                      <option>Select Subject</option>
                      <option>Mathematics</option>
                      <option>Physics</option>
                      <option>Chemistry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button 
                          key={star} 
                          type="button"
                          className="text-3xl hover:scale-110 transition"
                        >
                          ⭐
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Comments</label>
                    <textarea 
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32"
                      placeholder="Share your feedback here..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                  >
                    Submit Feedback
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Fee Voucher Tab */}
          {activeTab === "fee" && (
            <div className="card-section p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500">
                Fee Vouchers
              </h2>
              <table className="table-concordia">
                <thead>
                  <tr>
                    <th>Sr #</th>
                    <th>Voucher #</th>
                    <th>Issued Date</th>
                    <th>Due Date</th>
                    <th>Amount (PKR)</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {feeVouchers.map((voucher) => (
                    <tr key={voucher.srNo}>
                      <td>{voucher.srNo}</td>
                      <td className="font-semibold">{voucher.voucherNo}</td>
                      <td>{voucher.issuedDate}</td>
                      <td>{voucher.dueDate}</td>
                      <td className="font-semibold">{voucher.amount}</td>
                      <td>
                        <span className={`status-badge ${
                          voucher.status === "Paid" ? "status-paid" : "status-pending"
                        }`}>
                          {voucher.status}
                        </span>
                      </td>
                      <td>
                        <button className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm">
                          📄 Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;
