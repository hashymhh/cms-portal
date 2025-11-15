import React, { useState } from "react";

const Profile = ({ profileData }) => {
  // ==================== MODEL ====================
  // Employee data structure
  const employeeData = profileData ? {
    employeeNo: profileData.employeeId || "N/A",
    name: `${profileData.firstName || ""} ${profileData.lastName || ""}`.trim() || "N/A",
    fatherName: profileData.fatherName || "N/A",
    department: profileData.department?.name || "N/A",
    designation: profileData.designation || "N/A",
    profilePicture: profileData.profile 
      ? `${process.env.REACT_APP_MEDIA_LINK}/${profileData.profile}`
      : null,
  } : {
    employeeNo: "N/A",
    name: "N/A",
    fatherName: "N/A",
    department: "N/A",
    designation: "N/A",
    profilePicture: null,
  };

  // ==================== CONTROLLER ====================
  // No additional controllers needed for static profile display

  // ==================== VIEW ====================
  const renderProfileHeader = () => (
    <div style={{
      background: "#F28C28",
      padding: "20px 30px",
      borderRadius: "12px 12px 0 0",
      marginBottom: "0",
    }}>
      <h1 style={{
        color: "white",
        fontSize: "28px",
        fontWeight: "bold",
        margin: 0,
      }}>
        Profile
      </h1>
    </div>
  );

  const renderPersonalInfoPanel = () => (
    <div style={{
      background: "white",
      border: "2px solid #F28C28",
      borderRadius: "12px",
      padding: "30px",
      flex: 1,
      minWidth: "300px",
    }}>
      <h2 style={{
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333",
        marginBottom: "25px",
        paddingBottom: "10px",
        borderBottom: "2px solid #F28C28",
      }}>
        Personal Info
      </h2>
      
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "25px",
      }}>
        {/* Profile Picture */}
        <div style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background: employeeData.profilePicture 
            ? `url(${employeeData.profilePicture}) center/cover no-repeat`
            : "linear-gradient(135deg, #F28C28 0%, #ff9d4d 100%)",
          border: "4px solid #F28C28",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "48px",
          fontWeight: "bold",
        }}>
          {!employeeData.profilePicture && (employeeData.name?.charAt(0)?.toUpperCase() || "F")}
        </div>

        {/* Name Field */}
        <div style={{ width: "100%", textAlign: "center" }}>
          <label style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "600",
            color: "#666",
            marginBottom: "8px",
          }}>
            Name
          </label>
          <p style={{
            fontSize: "18px",
            fontWeight: "500",
            color: "#333",
            margin: 0,
          }}>
            {employeeData.name}
          </p>
        </div>

        {/* Father's Name Field */}
        <div style={{ width: "100%", textAlign: "center" }}>
          <label style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "600",
            color: "#666",
            marginBottom: "8px",
          }}>
            Father's Name
          </label>
          <p style={{
            fontSize: "18px",
            fontWeight: "500",
            color: "#333",
            margin: 0,
          }}>
            {employeeData.fatherName}
          </p>
        </div>
      </div>
    </div>
  );

  const renderEmployeeInfoPanel = () => (
    <div style={{
      background: "white",
      border: "2px solid #F28C28",
      borderRadius: "12px",
      padding: "30px",
      flex: 1,
      minWidth: "300px",
    }}>
      <h2 style={{
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333",
        marginBottom: "25px",
        paddingBottom: "10px",
        borderBottom: "2px solid #F28C28",
      }}>
        Employee Information
      </h2>
      
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}>
        {/* Employee No. */}
        <div>
          <label style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "600",
            color: "#666",
            marginBottom: "8px",
          }}>
            Employee No.
          </label>
          <p style={{
            fontSize: "16px",
            fontWeight: "normal",
            color: "#333",
            margin: 0,
            padding: "10px 15px",
            background: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
          }}>
            {employeeData.employeeNo}
          </p>
        </div>

        {/* Department */}
        <div>
          <label style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "600",
            color: "#666",
            marginBottom: "8px",
          }}>
            Department
          </label>
          <p style={{
            fontSize: "16px",
            fontWeight: "normal",
            color: "#333",
            margin: 0,
            padding: "10px 15px",
            background: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
          }}>
            {employeeData.department}
          </p>
        </div>

        {/* Designation */}
        <div>
          <label style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "600",
            color: "#666",
            marginBottom: "8px",
          }}>
            Designation
          </label>
          <p style={{
            fontSize: "16px",
            fontWeight: "normal",
            color: "#333",
            margin: 0,
            padding: "10px 15px",
            background: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
          }}>
            {employeeData.designation}
          </p>
        </div>
      </div>
    </div>
  );

  if (!profileData) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "400px",
        color: "#666",
        fontSize: "18px",
      }}>
        Loading profile data...
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
    }}>
      {/* Profile Header */}
      <div style={{
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        marginBottom: "30px",
      }}>
        {renderProfileHeader()}
      </div>

      {/* Info Panels Container */}
      <div style={{
        display: "flex",
        gap: "30px",
        flexWrap: "wrap",
      }}>
        {renderPersonalInfoPanel()}
        {renderEmployeeInfoPanel()}
      </div>
    </div>
  );
};

export default Profile;
