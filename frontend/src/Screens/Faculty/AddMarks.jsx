import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axiosWrapper from "../../utils/AxiosWrapper";
import Heading from "../../components/Heading";
import CustomButton from "../../components/CustomButton";

const AddMarks = () => {
  const [branches, setBranches] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const userToken = localStorage.getItem("userToken");
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [masterMarksData, setMasterMarksData] = useState([]);
  const [marksData, setMarksData] = useState({});
  const [consent, setConsent] = useState(false);
  const [showSearch, setShowSearch] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "branch") {
      const branch = branches.find((b) => b._id === value);
      setSelectedBranch(branch);
    } else if (name === "subject") {
      const subject = subjects.find((s) => s._id === value);
      setSelectedSubject(subject);
    } else if (name === "semester") {
      setSelectedSemester(value);
    } else if (name === "exam") {
      const exam = exams.find((e) => e._id === value);
      setSelectedExam(exam);
    }
  };

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
        toast.error(error.response?.data?.message || "Failed to load branches");
      }
    } finally {
      toast.dismiss();
    }
  };

  const fetchSubjects = async () => {
    try {
      toast.loading("Loading subjects...");
      const response = await axiosWrapper.get(
        `/subject?branch=${selectedBranch?._id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.data.success) {
        setSubjects(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setSubjects([]);
      } else {
        toast.error(error.response?.data?.message || "Failed to load subjects");
      }
    } finally {
      toast.dismiss();
    }
  };

  const fetchExams = async () => {
    try {
      toast.loading("Loading exams...");
      const response = await axiosWrapper.get(
        `/exam?semester=${selectedSemester}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.data.success) {
        setExams(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setExams([]);
      } else {
        toast.error(error.response?.data?.message || "Failed to load exams");
      }
    } finally {
      toast.dismiss();
    }
  };

  const searchStudents = async () => {
    setDataLoading(true);
    toast.loading("Searching students...");
    setStudents([]);
    try {
      const response = await axiosWrapper.get(
        `/marks/students?branch=${selectedBranch?._id}&subject=${selectedSubject?._id}&semester=${selectedSemester}&examId=${selectedExam?._id}`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      toast.dismiss();
      if (response.data.success) {
        if (response.data.data.length === 0) {
          toast.error("No students found!");
          setStudents([]);
          setMasterMarksData([]);
        } else {
          toast.success("Students found!");
          setStudents(response.data.data);
          const initialMarksData = {};
          response.data.data.forEach((student) => {
            initialMarksData[student._id] = student.obtainedMarks || "";
          });
          setMarksData(initialMarksData);
          setMasterMarksData(response.data.data);
          setShowSearch(false);
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

  const getMarks = async (e) => {
    setDataLoading(true);
    toast.loading("Getting marks...");
    setMasterMarksData([]);
    try {
      const response = await axiosWrapper.get(
        `/marks?semester=${selectedSemester}&examId=${selectedExam?._id}`,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      toast.dismiss();
      if (response.data.success) {
        toast.success("Marks found!");
        const combinedData = students.map((student) => {
          const marks = response.data.data.find(
            (mark) => mark.student._id === student._id
          );
          if (marks) {
            return { ...student, obtainedMarks: marks.obtainedMarks };
          } else {
            return { ...student, obtainedMarks: 0 };
          }
        });
        setMasterMarksData(combinedData);
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

  const handleSubmit = async () => {
    if (!consent) {
      toast.error("Please confirm the consent before submitting");
      return;
    }

    const hasEmptyMarks = Object.values(marksData).some((mark) => mark === "");
    if (hasEmptyMarks) {
      toast.error("Please enter marks for all students");
      return;
    }

    setDataLoading(true);
    toast.loading("Submitting marks...");
    try {
      const marksToSubmit = Object.entries(marksData).map(
        ([studentId, marks]) => ({
          studentId,
          obtainedMarks: Number(marks),
        })
      );

      const response = await axiosWrapper.post(
        "/marks/bulk",
        {
          marks: marksToSubmit,
          examId: selectedExam?._id,
          subjectId: selectedSubject?._id,
          semester: selectedSemester,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      if (response.data.success) {
        toast.success("Marks submitted successfully!");
        setMarksData({});
        setConsent(false);
        setShowSearch(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting marks");
      console.error("Submit error:", error);
    } finally {
      setDataLoading(false);
      toast.dismiss();
    }
  };

  const handleBack = () => {
    setShowSearch(true);
    setStudents([]);
    setMasterMarksData([]);
    setMarksData({});
    setConsent(false);
  };

  const handleSearch = async () => {
    await searchStudents();
  };

  useEffect(() => {
    fetchBranches();
  }, [userToken]);

  useEffect(() => {
    if (selectedBranch) {
      fetchSubjects();
    }
  }, [selectedBranch]);

  useEffect(() => {
    if (selectedSemester) {
      fetchExams();
    }
  }, [selectedSemester]);

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <style>{`
        .search-panel { 
          background:linear-gradient(145deg,#fff7ee,#ffe9d1); 
          padding:32px; 
          border-radius:20px; 
          border:1px solid #ffe0c2; 
          box-shadow:0 6px 20px rgba(242,131,0,0.2); 
          margin-bottom:32px; 
        }
        .filter-label { 
          display:block; 
          font-size:13px; 
          font-weight:700; 
          color:#8a5a15; 
          margin-bottom:8px; 
          letter-spacing:.3px; 
        }
        .filter-select { 
          width:100%; 
          padding:12px 16px; 
          border:2px solid #f3e2cc; 
          border-radius:12px; 
          background:linear-gradient(160deg,#ffffff,#fffbf5); 
          color:#2f2f2f; 
          font-weight:500; 
          transition:all .3s; 
          box-shadow:0 2px 8px rgba(0,0,0,0.04); 
        }
        .filter-select:focus { 
          outline:none; 
          border-color:#f28300; 
          box-shadow:0 0 0 4px rgba(242,131,0,0.15); 
        }
        .filter-select:disabled { 
          background:#f5f5f5; 
          cursor:not-allowed; 
          opacity:.6; 
        }
        .hint-text { 
          font-size:11px; 
          color:#8a5a15; 
          margin-top:6px; 
        }
        .info-card { 
          position:relative; 
          background:linear-gradient(160deg,#ffffff,#fffaf3); 
          border:1px solid #f3e2cc; 
          padding:14px 18px; 
          border-radius:14px; 
          box-shadow:0 4px 16px rgba(0,0,0,0.08); 
          overflow:hidden; 
        }
        .info-card:before { 
          content:''; 
          position:absolute; 
          top:-40px; 
          right:-40px; 
          width:100px; 
          height:100px; 
          background:linear-gradient(135deg,rgba(242,131,0,0.2),rgba(255,157,77,0.25)); 
          filter:blur(30px); 
          opacity:.5; 
        }
        .info-label { 
          font-size:12px; 
          color:#8a5a15; 
          font-weight:600; 
          margin-bottom:4px; 
        }
        .info-value { 
          color:#2f2f2f; 
          font-weight:600; 
          font-size:15px; 
        }
        .marks-input-card { 
          display:flex; 
          align-items:center; 
          justify-content:space-between; 
          width:100%; 
          border:2px solid #f3e2cc; 
          border-radius:12px; 
          background:linear-gradient(160deg,#ffffff,#fffbf5); 
          overflow:hidden; 
          transition:all .3s; 
        }
        .marks-input-card:hover { 
          border-color:#f28300; 
          box-shadow:0 4px 16px rgba(242,131,0,0.15); 
        }
        .enrollment-label { 
          font-weight:600; 
          color:#2f2f2f; 
          display:flex; 
          align-items:center; 
          justify-content:center; 
          padding:0 18px; 
          height:100%; 
          min-width:120px; 
          text-align:center; 
          background:linear-gradient(135deg,#fff7ee,#ffe9d1); 
          border-right:2px solid #f3e2cc; 
        }
        .marks-input { 
          padding:12px 16px; 
          border:none; 
          border-radius:0; 
          background:transparent; 
          width:100%; 
          margin:8px 12px; 
          font-weight:500; 
          color:#2f2f2f; 
        }
        .marks-input:focus { 
          outline:none; 
        }
        .consent-section { 
          display:flex; 
          flex-direction:column; 
          align-items:center; 
          gap:20px; 
          background:linear-gradient(145deg,#fff7ee,#ffe9d1); 
          padding:24px; 
          border-radius:16px; 
          border:1px solid #ffe0c2; 
          margin-top:40px; 
        }
        .consent-label { 
          display:flex; 
          align-items:center; 
          gap:10px; 
          font-size:14px; 
          color:#2f2f2f; 
          font-weight:500; 
        }
        .consent-checkbox { 
          width:18px; 
          height:18px; 
          accent-color:#f28300; 
          cursor:pointer; 
        }
      `}</style>
      <div className="flex justify-between items-center w-full">
        <Heading title="Add Marks" />
      </div>

      {showSearch && (
        <div className="w-full search-panel">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-[90%] mx-auto">
            <div>
              <label className="filter-label">
                Semester
              </label>
              <select
                name="semester"
                value={selectedSemester || ""}
                onChange={handleInputChange}
                className="filter-select"
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
              <label className="filter-label">
                Branch
              </label>
              <select
                name="branch"
                value={selectedBranch?._id || ""}
                onChange={handleInputChange}
                className="filter-select"
              >
                <option value="">Select Branch</option>
                {branches?.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="filter-label">
                Subjects
              </label>
              <select
                name="subject"
                value={selectedSubject?._id || ""}
                onChange={handleInputChange}
                disabled={!selectedBranch}
                className="filter-select"
              >
                <option value="">Select Subject</option>
                {subjects?.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                ))}
              </select>
              {!selectedBranch && (
                <p className="hint-text">
                  Please select a branch first
                </p>
              )}
            </div>

            <div>
              <label className="filter-label">
                Exam
              </label>
              <select
                name="exam"
                value={selectedExam?._id || ""}
                onChange={handleInputChange}
                disabled={!selectedSubject}
                className="filter-select"
              >
                <option value="">Select Exam</option>
                {exams?.map((exam) => (
                  <option key={exam._id} value={exam._id}>
                    {exam.name}
                  </option>
                ))}
              </select>
              {!selectedSubject && (
                <p className="hint-text">
                  Please select a subject first
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-center w-[10%] mx-auto">
            <CustomButton
              type="submit"
              disabled={
                dataLoading ||
                !selectedBranch ||
                !selectedSubject ||
                !selectedExam ||
                !selectedSemester
              }
              variant="primary"
              onClick={handleSearch}
            >
              {dataLoading ? "Searching..." : "Search"}
            </CustomButton>
          </div>
        </div>
      )}

      {/* Marks Entry Section */}
      {!showSearch && masterMarksData && masterMarksData.length > 0 && (
        <div className="w-full search-panel">
          <div className="space-y-4 w-full mb-6">
            <div className="flex flex-col gap-4 w-[90%] mx-auto">
              <div className="grid grid-cols-4 gap-4">
                <div className="info-card">
                  <span className="info-label">
                    Branch and Semester:
                  </span>
                  <p className="info-value">
                    {selectedBranch?.branchId} - Semester {selectedSemester}
                  </p>
                </div>

                <div className="info-card">
                  <span className="info-label">Exam:</span>
                  <p className="info-value">
                    {selectedExam?.name || "Not Selected"}
                  </p>
                </div>
                <div className="info-card">
                  <span className="info-label">Exam Type:</span>
                  <p className="info-value">
                    {selectedExam?.examType === "mid" ? "Mid Term" : "End Term"}
                  </p>
                </div>
                <div className="info-card">
                  <span className="info-label">Subject:</span>
                  <p className="info-value">
                    {selectedSubject?.name || "Not Selected"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="info-card">
                  <span className="info-label">Total Marks:</span>
                  <p className="info-value">
                    {selectedExam?.totalMarks || "Not Selected"}
                  </p>
                </div>
                <div className="info-card">
                  <span className="info-label">Date:</span>
                  <p className="info-value">
                    {selectedExam?.date
                      ? new Date(selectedExam.date).toLocaleDateString()
                      : "Not Selected"}
                  </p>
                </div>
                <div className="info-card">
                  <span className="info-label">Time:</span>
                  <p className="info-value">
                    {selectedExam?.time || "Not Selected"}
                  </p>
                </div>
                <div className="info-card">
                  <span className="info-label">Students:</span>
                  <p className="info-value">
                    {masterMarksData.length || "Not Selected"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center mb-4">
            <CustomButton
              variant="secondary"
              onClick={handleBack}
              className="text-sm"
            >
              Back to Search
            </CustomButton>
          </div>

          <div className="grid grid-cols-4 gap-4 w-[100%] mx-auto">
            {masterMarksData.map((student) => (
              <div
                key={student._id}
                className="marks-input-card"
              >
                <p className="enrollment-label">
                  {student.enrollmentNo}
                </p>
                <input
                  type="number"
                  min={0}
                  max={selectedExam?.totalMarks || 100}
                  className="marks-input"
                  value={marksData[student._id] || ""}
                  placeholder="Enter Marks"
                  onChange={(e) =>
                    setMarksData({
                      ...marksData,
                      [student._id]: e.target.value,
                    })
                  }
                />
              </div>
            ))}
          </div>

          <div className="consent-section">
            <div className="consent-label">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="consent-checkbox"
              />
              <label htmlFor="consent">
                I confirm that all marks entered are correct and verified
              </label>
            </div>

            <CustomButton
              type="submit"
              disabled={dataLoading || !consent}
              variant="primary"
              onClick={handleSubmit}
            >
              {dataLoading ? "Submitting..." : "Submit Marks"}
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMarks;
