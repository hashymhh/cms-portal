import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Heading from "../../components/Heading";
import axiosWrapper from "../../utils/AxiosWrapper";
import CustomButton from "../../components/CustomButton";
import NoData from "../../components/NoData";

const StudentFinder = () => {
  const [searchParams, setSearchParams] = useState({
    enrollmentNo: "",
    name: "",
    semester: "",
    branch: "",
  });
  const [students, setStudents] = useState([]);
  const [branches, setBranches] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const userToken = localStorage.getItem("userToken");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        toast.loading("Loading branches...");
        const response = await axiosWrapper.get("/branch", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        if (response.data.success) {
          setBranches(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setBranches([]);
        } else {
          toast.error(
            error.response?.data?.message || "Failed to load branches"
          );
        }
      } finally {
        toast.dismiss();
      }
    };
    fetchBranches();
  }, [userToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const searchStudents = async (e) => {
    e.preventDefault();
    setDataLoading(true);
    setHasSearched(true);
    toast.loading("Searching students...");
    setStudents([]);
    try {
      const response = await axiosWrapper.post(
        `/student/search`,
        searchParams,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      toast.dismiss();
      if (response.data.success) {
        if (response.data.data.length === 0) {
          toast.error("No students found!");
          setStudents([]);
        } else {
          toast.success("Students found!");
          setStudents(response.data.data);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error searching students");
      console.error("Search error:", error);
    } finally {
      setDataLoading(false);
    }
  };

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <style>{`
        .search-form-panel { 
          background:linear-gradient(145deg,#fff7ee,#ffe9d1); 
          padding:24px; 
          border-radius:18px; 
          border:1px solid #ffe0c2; 
          box-shadow:0 4px 18px rgba(242,131,0,0.15); 
          margin:24px auto; 
        }
        .search-filter-label { 
          display:block; 
          font-size:13px; 
          font-weight:700; 
          color:#8a5a15; 
          margin-bottom:8px; 
          letter-spacing:.3px; 
        }
        .search-filter-input { 
          width:100%; 
          padding:12px 16px; 
          border:2px solid #f3e2cc; 
          border-radius:12px; 
          background:linear-gradient(160deg,#ffffff,#fffbf5); 
          color:#2f2f2f; 
          font-weight:500; 
          transition:all .3s; 
        }
        .search-filter-input:focus { 
          outline:none; 
          border-color:#f28300; 
          box-shadow:0 0 0 4px rgba(242,131,0,0.15); 
        }
        .results-table { 
          width:100%; 
          background:linear-gradient(160deg,#ffffff,#fffaf3); 
          border-radius:16px; 
          overflow:hidden; 
          box-shadow:0 6px 22px -8px rgba(0,0,0,.12); 
          border:1px solid #f3e2cc; 
        }
        .results-table thead tr { 
          background:linear-gradient(135deg,#f28300,#ff9d4d); 
          color:#fff; 
        }
        .results-table th { 
          padding:14px 20px; 
          text-align:left; 
          font-weight:700; 
          letter-spacing:.3px; 
        }
        .results-table td { 
          padding:12px 20px; 
          border-bottom:1px solid #f0e6d8; 
          color:#374151; 
          font-weight:500; 
        }
        .results-table tbody tr { 
          transition:all .3s; 
          cursor:pointer; 
        }
        .results-table tbody tr:hover { 
          background:linear-gradient(145deg,#fff5e6,#ffe4cc); 
          transform:scale(1.002); 
        }
        .profile-img { 
          width:48px; 
          height:48px; 
          object-fit:cover; 
          border-radius:50%; 
          border:2px solid #f3e2cc; 
        }
        .empty-state { 
          text-align:center; 
          padding:40px 24px; 
          background:linear-gradient(145deg,#fff7ee,#ffe9d1); 
          border-radius:16px; 
          margin-top:32px; 
        }
        .empty-state-img { 
          width:256px; 
          height:256px; 
          margin:0 auto 16px; 
        }
        .empty-state-text { 
          color:#8a5a15; 
          font-weight:600; 
          font-size:15px; 
        }
        .modal-overlay { 
          position:fixed; 
          inset:0; 
          background:rgba(0,0,0,0.5); 
          display:flex; 
          align-items:center; 
          justify-center; 
          padding:16px; 
          z-index:50; 
        }
        .modal-content { 
          background:linear-gradient(160deg,#ffffff,#fffaf3); 
          border-radius:20px; 
          padding:32px; 
          max-width:1024px; 
          width:100%; 
          max-height:90vh; 
          overflow-y:auto; 
          box-shadow:0 20px 60px rgba(0,0,0,0.3); 
        }
        .modal-title { 
          font-size:28px; 
          font-weight:700; 
          color:#d97200; 
          margin-bottom:24px; 
        }
        .modal-section { 
          background:linear-gradient(145deg,#fff7ee,#ffe9d1); 
          padding:24px; 
          border-radius:14px; 
          border:1px solid #f3e2cc; 
        }
        .modal-section-title { 
          font-size:18px; 
          font-weight:700; 
          color:#8a5a15; 
          margin-bottom:16px; 
        }
        .modal-field { 
          margin-bottom:10px; 
        }
        .modal-field-label { 
          font-weight:600; 
          color:#8a5a15; 
          font-size:13px; 
        }
        .modal-field-value { 
          color:#2f2f2f; 
          font-weight:500; 
        }
      `}</style>
      <div className="flex justify-between items-center w-full">
        <Heading title="Student Finder" />
      </div>

      <div className="my-6 mx-auto w-full">
        <form onSubmit={searchStudents} className="flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-[90%] mx-auto search-form-panel">
            <div>
              <label className="search-filter-label">
                Enrollment Number
              </label>
              <input
                type="text"
                name="enrollmentNo"
                value={searchParams.enrollmentNo}
                onChange={handleInputChange}
                className="search-filter-input"
                placeholder="Enter enrollment number"
              />
            </div>

            <div>
              <label className="search-filter-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={searchParams.name}
                onChange={handleInputChange}
                className="search-filter-input"
                placeholder="Enter student name"
              />
            </div>

            <div>
              <label className="search-filter-label">
                Semester
              </label>
              <select
                name="semester"
                value={searchParams.semester}
                onChange={handleInputChange}
                className="search-filter-input"
              >
                <option value="">Select Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>
                    Semester {sem}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="search-filter-label">
                Branch
              </label>
              <select
                name="branch"
                value={searchParams.branch}
                onChange={handleInputChange}
                className="search-filter-input"
              >
                <option value="">Select Branch</option>
                {branches?.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-center w-[10%] mx-auto">
            <CustomButton
              type="submit"
              disabled={dataLoading}
              variant="primary"
            >
              {dataLoading ? "Searching..." : "Search"}
            </CustomButton>
          </div>
        </form>

        {!hasSearched && (
          <div className="empty-state mx-auto w-[40%]">
            <img
              src="/assets/filter.svg"
              alt="Select filters"
              className="empty-state-img"
            />
            <p className="empty-state-text">Please select at least one filter to search students</p>
          </div>
        )}

        {hasSearched && students.length === 0 && (
          <NoData title="No students found" />
        )}

        {students.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4" style={{color:'#d97200'}}>Search Results</h2>
            <div className="overflow-x-auto">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Profile</th>
                    <th>Name</th>
                    <th>Enrollment No</th>
                    <th>Semester</th>
                    <th>Branch</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student._id}
                      onClick={() => handleRowClick(student)}
                    >
                      <td>
                        <img
                          src={`${process.env.REACT_APP_MEDIA_LINK}/${student.profile}`}
                          alt={`${student.firstName}'s profile`}
                          className="profile-img"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1744315900478-fa44dc6a4e89?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                          }}
                        />
                      </td>
                      <td>
                        {student.firstName} {student.middleName}{" "}
                        {student.lastName}
                      </td>
                      <td>
                        {student.enrollmentNo}
                      </td>
                      <td>{student.semester}</td>
                      <td>
                        {student.branchId?.name}
                      </td>
                      <td>{student.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showModal && selectedStudent && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="flex justify-between items-start mb-6">
                <h2 className="modal-title">Student Details</h2>
                <CustomButton
                  onClick={() => setShowModal(false)}
                  variant="secondary"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </CustomButton>
              </div>

              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="w-full md:w-1/3">
                  <img
                    src={`${process.env.REACT_APP_MEDIA_LINK}/${selectedStudent.profile}`}
                    alt={`${selectedStudent.firstName}'s profile`}
                    className="w-full h-auto object-cover rounded-lg"
                    style={{border:'2px solid #f3e2cc',boxShadow:'0 6px 20px rgba(242,131,0,0.2)'}}
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1744315900478-fa44dc6a4e89?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                    }}
                  />
                </div>

                <div className="w-full md:w-2/3">
                  <h3 className="modal-section-title">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="modal-field">
                      <span className="modal-field-label">Full Name:</span>{" "}
                      <span className="modal-field-value">{selectedStudent.firstName} {selectedStudent.middleName}{" "}
                      {selectedStudent.lastName}</span>
                    </p>
                    <p className="modal-field">
                      <span className="modal-field-label">Gender:</span>{" "}
                      <span className="modal-field-value">{selectedStudent.gender}</span>
                    </p>
                    <p className="modal-field">
                      <span className="modal-field-label">Date of Birth:</span>{" "}
                      <span className="modal-field-value">{new Date(selectedStudent.dob).toLocaleDateString()}</span>
                    </p>
                    <p className="modal-field">
                      <span className="modal-field-label">Blood Group:</span>{" "}
                      <span className="modal-field-value">{selectedStudent.bloodGroup}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="modal-section">
                  <h3 className="modal-section-title">
                    Academic Information
                  </h3>
                  <div className="space-y-2">
                    <p className="modal-field">
                      <span className="modal-field-label">Enrollment No:</span>{" "}
                      <span className="modal-field-value">{selectedStudent.enrollmentNo}</span>
                    </p>
                    <p className="modal-field">
                      <span className="modal-field-label">Branch:</span>{" "}
                      <span className="modal-field-value">{selectedStudent.branchId?.name}</span>
                    </p>
                    <p className="modal-field">
                      <span className="modal-field-label">Semester:</span>{" "}
                      <span className="modal-field-value">{selectedStudent.semester}</span>
                    </p>
                  </div>
                </div>

                <div className="modal-section">
                  <h3 className="modal-section-title">
                    Contact Information
                  </h3>
                  <div className="space-y-2">
                    <p className="modal-field">
                      <span className="modal-field-label">Email:</span>{" "}
                      <span className="modal-field-value">{selectedStudent.email}</span>
                    </p>
                    <p className="modal-field">
                      <span className="modal-field-label">Phone:</span>{" "}
                      <span className="modal-field-value">{selectedStudent.phone}</span>
                    </p>
                    <p className="modal-field">
                      <span className="modal-field-label">Address:</span>{" "}
                      <span className="modal-field-value">{selectedStudent.address}</span>
                    </p>
                  </div>
                </div>

                <div className="modal-section">
                  <h3 className="modal-section-title">
                    Location Details
                  </h3>
                  <div className="space-y-2">
                    <p className="modal-field">
                      <span className="modal-field-label">City:</span>{" "}
                      <span className="modal-field-value">{selectedStudent.city}</span>
                    </p>
                    <p className="modal-field">
                      <span className="modal-field-label">State:</span>{" "}
                      <span className="modal-field-value">{selectedStudent.state}</span>
                    </p>
                    <p className="modal-field">
                      <span className="modal-field-label">Pincode:</span>{" "}
                      <span className="modal-field-value">{selectedStudent.pincode}</span>
                    </p>
                    <p className="modal-field">
                      <span className="modal-field-label">Country:</span>{" "}
                      <span className="modal-field-value">{selectedStudent.country}</span>
                    </p>
                  </div>
                </div>

                <div className="modal-section">
                  <h3 className="modal-section-title">
                    Emergency Contact
                  </h3>
                  <div className="space-y-2">
                    <p className="modal-field">
                      <span className="modal-field-label">Name:</span>{" "}
                      <span className="modal-field-value">{selectedStudent.emergencyContact?.name}</span>
                    </p>
                    <p className="modal-field">
                      <span className="modal-field-label">Relationship:</span>{" "}
                      <span className="modal-field-value">{selectedStudent.emergencyContact?.relationship}</span>
                    </p>
                    <p className="modal-field">
                      <span className="modal-field-label">Phone:</span>{" "}
                      <span className="modal-field-value">{selectedStudent.emergencyContact?.phone}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentFinder;
