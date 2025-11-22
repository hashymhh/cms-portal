import React, { useEffect, useState } from "react";
import { MdLink } from "react-icons/md";
import Heading from "../../components/Heading";
import { useSelector } from "react-redux";
import axiosWrapper from "../../utils/AxiosWrapper";
import toast from "react-hot-toast";
import CustomButton from "../../components/CustomButton";
import Loading from "../../components/Loading";

const Material = () => {
  const [materials, setMaterials] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const userData = useSelector((state) => state.userData);
  const [filters, setFilters] = useState({
    subject: "",
    type: "",
  });

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    fetchMaterials();
  }, [filters]);

  const fetchSubjects = async () => {
    try {
      setDataLoading(true);
      const response = await axiosWrapper.get(
        `/subject?semester=${userData.semester}&branch=${userData.branchId._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      if (response.data.success) {
        setSubjects(response.data.data);
      }
    } catch (error) {
      if (error && error.response && error.response.status === 404) {
        setSubjects([]);
        return;
      }
      toast.error(error?.response?.data?.message || "Failed to load subjects");
    } finally {
      setDataLoading(false);
    }
  };

  const fetchMaterials = async () => {
    try {
      setDataLoading(true);
      const queryParams = new URLSearchParams({
        semester: userData.semester,
        branch: userData.branchId._id,
      });

      if (filters.subject) queryParams.append("subject", filters.subject);
      if (filters.type) queryParams.append("type", filters.type);

      const response = await axiosWrapper.get(`/material?${queryParams}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      if (response.data.success) {
        setMaterials(response.data.data);
      }
    } catch (error) {
      if (error && error.response && error.response.status === 404) {
        setMaterials([]);
        return;
      }
      toast.error(error?.response?.data?.message || "Failed to load materials");
    } finally {
      setDataLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <style>{`
        .material-filters { 
          background:linear-gradient(145deg,#fff7ee,#ffe9d1); 
          padding:24px; 
          border-radius:18px; 
          border:1px solid #ffe0c2; 
          box-shadow:0 4px 18px rgba(242,131,0,0.15); 
          margin-bottom:24px; 
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
        .materials-table { 
          width:100%; 
          background:linear-gradient(160deg,#ffffff,#fffaf3); 
          border-radius:16px; 
          overflow:hidden; 
          box-shadow:0 6px 22px -8px rgba(0,0,0,.12); 
          border:1px solid #f3e2cc; 
        }
        .materials-table thead tr { 
          background:linear-gradient(135deg,#f28300,#ff9d4d); 
          color:#fff; 
        }
        .materials-table th { 
          padding:16px 24px; 
          text-align:left; 
          font-weight:700; 
          letter-spacing:.3px; 
        }
        .materials-table td { 
          padding:14px 24px; 
          border-bottom:1px solid #f0e6d8; 
          color:#374151; 
          font-weight:500; 
        }
        .materials-table tbody tr { 
          transition:all .3s; 
        }
        .materials-table tbody tr:hover { 
          background:linear-gradient(145deg,#fff5e6,#ffe4cc); 
          transform:scale(1.005); 
        }
        .empty-state { 
          text-align:center; 
          padding:48px 24px; 
          color:#8a5a15; 
          font-weight:600; 
          font-size:16px; 
        }
      `}</style>
      <Heading title="Study Materials" />

      {!dataLoading && (
        <div className="w-full mt-4 material-filters">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="filter-label">
                Filter by Subject
              </label>
              <select
                name="subject"
                value={filters.subject}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="filter-label">
                Filter by Type
              </label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">All Types</option>
                <option value="notes">Notes</option>
                <option value="assignment">Assignment</option>
                <option value="syllabus">Syllabus</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {dataLoading && <Loading />}

      {!dataLoading && (
        <div className="w-full mt-8 overflow-x-auto">
          <table className="materials-table">
            <thead>
              <tr>
                <th>File</th>
                <th>Title</th>
                <th>Subject</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {materials && materials.length > 0 ? (
                materials.map((material) => (
                  <tr key={material._id}>
                    <td>
                      <CustomButton
                        variant="primary"
                        onClick={() => {
                          window.open(
                            `${process.env.REACT_APP_MEDIA_LINK}/${material.file}`
                          );
                        }}
                      >
                        <MdLink className="text-xl" />
                      </CustomButton>
                    </td>
                    <td>{material.title}</td>
                    <td>{material.subject.name}</td>
                    <td className="capitalize">{material.type}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="empty-state">
                    No materials found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Material;
