import React, { useState } from "react";
import UpdatePasswordLoggedIn from "../../components/UpdatePasswordLoggedIn";
import CustomButton from "../../components/CustomButton";

const Profile = ({ profileData }) => {
  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);
  
  if (!profileData) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCoordinatorTypeColor = (type) => {
    const colors = {
      academic: "bg-blue-100 text-blue-800",
      placement: "bg-green-100 text-green-800",
      event: "bg-purple-100 text-purple-800",
      exam: "bg-red-100 text-red-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const getPermissionIcon = (hasPermission) => {
    return hasPermission ? (
      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-8 mb-12 border-b pb-8">
        <div className="flex items-center gap-8">
          <img
            src={`${process.env.REACT_APP_MEDIA_LINK}/${profileData.profile}`}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover ring-4 ring-green-500 ring-offset-4"
          />
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {`${profileData.firstName} ${profileData.lastName}`}
            </h1>
            <p className="text-lg text-gray-600 mb-1">
              Employee ID: {profileData.employeeId}
            </p>
            <p className="text-lg text-green-600 font-medium mb-2">
              {profileData.designation}
            </p>
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getCoordinatorTypeColor(profileData.coordinatorType)}`}>
              {profileData.coordinatorType?.charAt(0).toUpperCase() + profileData.coordinatorType?.slice(1)} Coordinator
            </span>
          </div>
        </div>
        <CustomButton onClick={() => setShowUpdatePasswordModal(true)}>
          Update Password
        </CustomButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Personal Information
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="font-medium text-gray-700">Email:</span>
              <span className="text-gray-900">{profileData.email}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="font-medium text-gray-700">Phone:</span>
              <span className="text-gray-900">{profileData.phone}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="font-medium text-gray-700">Gender:</span>
              <span className="text-gray-900 capitalize">{profileData.gender}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="font-medium text-gray-700">Date of Birth:</span>
              <span className="text-gray-900">{formatDate(profileData.dob)}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="font-medium text-gray-700">Blood Group:</span>
              <span className="text-gray-900">{profileData.bloodGroup}</span>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
            Professional Information
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="font-medium text-gray-700">Branch:</span>
              <span className="text-gray-900">{profileData.branchId?.name || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="font-medium text-gray-700">Joining Date:</span>
              <span className="text-gray-900">{formatDate(profileData.joiningDate)}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="font-medium text-gray-700">Salary:</span>
              <span className="text-gray-900">₹{profileData.salary?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="font-medium text-gray-700">Status:</span>
              <span className={`capitalize px-2 py-1 rounded ${profileData.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {profileData.status}
              </span>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Address
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="font-medium text-gray-700">Address:</span>
              <span className="text-gray-900 text-right">{profileData.address}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="font-medium text-gray-700">City:</span>
              <span className="text-gray-900">{profileData.city}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="font-medium text-gray-700">State:</span>
              <span className="text-gray-900">{profileData.state}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="font-medium text-gray-700">Pincode:</span>
              <span className="text-gray-900">{profileData.pincode}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="font-medium text-gray-700">Country:</span>
              <span className="text-gray-900">{profileData.country}</span>
            </div>
          </div>
        </div>

        {/* Permissions */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Permissions
          </h2>
          <div className="space-y-4">
            {profileData.permissions && Object.entries(profileData.permissions).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                </span>
                <div className="flex items-center gap-2">
                  {getPermissionIcon(value)}
                  <span className={`font-medium ${value ? 'text-green-600' : 'text-red-600'}`}>
                    {value ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        {profileData.emergencyContact && (
          <div className="bg-white rounded-xl shadow-lg p-8 lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Emergency Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="font-medium text-gray-700">Name:</span>
                <span className="text-gray-900">{profileData.emergencyContact.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="font-medium text-gray-700">Relationship:</span>
                <span className="text-gray-900">{profileData.emergencyContact.relationship}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="font-medium text-gray-700">Phone:</span>
                <span className="text-gray-900">{profileData.emergencyContact.phone}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Update Password Modal */}
      {showUpdatePasswordModal && (
        <UpdatePasswordLoggedIn
          onClose={() => setShowUpdatePasswordModal(false)}
          userType="coordinator"
        />
      )}
    </div>
  );
};

export default Profile;