/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FiUpload, FiEdit2, FiTrash2 } from "react-icons/fi";
import Heading from "../../components/Heading";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import axiosWrapper from "../../utils/AxiosWrapper";
import DeleteConfirm from "../../components/DeleteConfirm";
import CustomButton from "../../components/CustomButton";
import { MdLink } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
const Material = () => {
  const [materials, setMaterials] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [branches, setBranches] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    semester: "",
    branch: "",
    type: "notes",
  });
  const [file, setFile] = useState(null);
  const [filters, setFilters] = useState({
    subject: "",
    semester: "",
    branch: "",
    type: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubjects();
    fetchBranches();
    fetchMaterials();
  }, []);

  useEffect(() => {
    fetchMaterials();
  }, [filters]);

  const fetchSubjects = async () => {
    try {
      toast.loading("Loading subjects...");
      const response = await axiosWrapper.get("/subject", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      if (response.data.success) {
        setSubjects(response.data.data);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setSubjects([]);
      } else {
        toast.error(
          error?.response?.data?.message || "Failed to load subjects"
        );
      }
    } finally {
      toast.dismiss();
    }
  };

  const fetchBranches = async () => {
    try {
      toast.loading("Loading branches...");
      const response = await axiosWrapper.get("/branch", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      if (response.data.success) {
        setBranches(response.data.data);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setBranches([]);
      } else {
        toast.error(
          error?.response?.data?.message || "Failed to load branches"
        );
      }
    } finally {
      toast.dismiss();
    }
  };

  const fetchMaterials = async () => {
    try {
      toast.loading("Loading materials...");
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

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
      if (error.response?.status === 404) {
        setMaterials([]);
      } else {
        toast.error(
          error?.response?.data?.message || "Failed to load materials"
        );
      }
    } finally {
      toast.dismiss();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subject: "",
      semester: "",
      branch: "",
      type: "notes",
    });
    setFile(null);
    setEditingMaterial(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDataLoading(true);
    toast.loading(
      editingMaterial ? "Updating material..." : "Adding material..."
    );

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      if (file) {
        formDataToSend.append("file", file);
      }

      if (editingMaterial) {
        await axiosWrapper.put(
          `/material/${editingMaterial._id}`,
          formDataToSend
        );
        toast.success("Material updated successfully");
      } else {
        await axiosWrapper.post("/material", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        toast.success("Material added successfully");
      }

      setShowModal(false);
      resetForm();
      fetchMaterials();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Operation failed");
    } finally {
      setDataLoading(false);
      toast.dismiss();
    }
  };

  const handleEdit = (material) => {
    setEditingMaterial(material);
    setFormData({
      title: material.title,
      subject: material.subject._id,
      semester: material.semester,
      branch: material.branch._id,
      type: material.type,
    });
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axiosWrapper.delete(`/material/${selectedMaterialId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      toast.success("Material deleted successfully");
      setIsDeleteConfirmOpen(false);
      fetchMaterials();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete material"
      );
    }
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
          margin-top:16px;
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
          padding:32px 24px; 
          color:#8a5a15; 
          font-weight:600; 
          font-size:16px; 
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
          padding:24px; 
          max-width:768px; 
          width:100%; 
          box-shadow:0 20px 60px rgba(0,0,0,0.3); 
        }
        .modal-header { 
          display:flex; 
          justify-content:space-between; 
          align-items:center; 
          margin-bottom:16px; 
        }
        .modal-title { 
          font-size:22px; 
          font-weight:700; 
          color:#d97200; 
        }
        .form-field { 
          margin-bottom:16px; 
        }
        .form-label { 
          display:block; 
          font-size:13px; 
          font-weight:700; 
          color:#8a5a15; 
          margin-bottom:8px; 
          letter-spacing:.3px; 
        }
        .form-input { 
          width:100%; 
          padding:12px 16px; 
          border:2px solid #f3e2cc; 
          border-radius:12px; 
          background:linear-gradient(160deg,#ffffff,#fffbf5); 
          color:#2f2f2f; 
          font-weight:500; 
          transition:all .3s; 
        }
        .form-input:focus { 
          outline:none; 
          border-color:#f28300; 
          box-shadow:0 0 0 4px rgba(242,131,0,0.15); 
        }
        .file-upload-label { 
          flex:1; 
          padding:12px 16px; 
          border:2px solid #f3e2cc; 
          border-radius:12px; 
          cursor:pointer; 
          background:linear-gradient(145deg,#fff7ee,#ffe9d1); 
          transition:all .3s; 
          display:flex; 
          align-items:center; 
          justify-content:center; 
          font-weight:500; 
          color:#8a5a15; 
        }
        .file-upload-label:hover { 
          background:linear-gradient(135deg,#ffe9d1,#ffd9b8); 
          border-color:#f28300; 
        }
        .form-actions { 
          display:flex; 
          justify-content:flex-end; 
          gap:16px; 
          margin-top:24px; 
        }
      `}</style>
      <div className="flex justify-between items-center w-full">
        <Heading title="Material Management" />
        <CustomButton onClick={() => setShowModal(true)}>
          <IoMdAdd className="text-2xl" />
        </CustomButton>
      </div>

      {/* Filters */}
      <div className="w-full material-filters">
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
              Filter by Branch
            </label>
            <select
              name="branch"
              value={filters.branch}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Branches</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="filter-label">
              Filter by Semester
            </label>
            <select
              name="semester"
              value={filters.semester}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
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

      {/* Materials Table */}
      <div className="w-full mt-8 overflow-x-auto">
        {materials.length === 0 ? (
          <div className="empty-state">
            No materials found
          </div>
        ) : (
          <table className="text-sm materials-table">
            <thead>
              <tr>
                <th>File</th>
                <th>Title</th>
                <th>Subject</th>
                <th>Semester</th>
                <th>Branch</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
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
                  <td>{material.semester}</td>
                  <td>{material.branch.name}</td>
                  <td className="capitalize">{material.type}</td>
                  <td>
                    <div className="flex gap-4">
                      <CustomButton
                        variant="secondary"
                        onClick={() => handleEdit(material)}
                      >
                        <FiEdit2 />
                      </CustomButton>
                      <CustomButton
                        variant="danger"
                        onClick={() => {
                          setSelectedMaterialId(material._id);
                          setIsDeleteConfirmOpen(true);
                        }}
                      >
                        <FiTrash2 />
                      </CustomButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Material Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                {editingMaterial ? "Edit Material" : "Add New Material"}
              </h2>
              <CustomButton
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                variant="secondary"
              >
                <AiOutlineClose size={24} />
              </CustomButton>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-field">
                <label className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-field">
                  <label className="form-label">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject._id} value={subject._id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label className="form-label">
                    Branch
                  </label>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select Branch</option>
                    {branches.map((branch) => (
                      <option key={branch._id} value={branch._id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label className="form-label">
                    Semester
                  </label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option key={sem} value={sem}>
                        Semester {sem}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <label className="form-label">
                    Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="notes">Notes</option>
                    <option value="assignment">Assignment</option>
                    <option value="syllabus">Syllabus</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">
                  Material File
                </label>
                <div className="flex items-center space-x-4">
                  <label className="file-upload-label">
                    <span className="flex items-center justify-center">
                      <FiUpload className="mr-2" />
                      {file ? file.name : "Choose File"}
                    </span>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      required={!editingMaterial}
                    />
                  </label>
                  {file && (
                    <CustomButton
                      onClick={() => setFile(null)}
                      variant="danger"
                      className="!p-2"
                    >
                      <AiOutlineClose size={20} />
                    </CustomButton>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <CustomButton
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  variant="secondary"
                >
                  Cancel
                </CustomButton>
                <CustomButton type="submit" disabled={dataLoading}>
                  {dataLoading
                    ? "Processing..."
                    : editingMaterial
                    ? "Update Material"
                    : "Add Material"}
                </CustomButton>
              </div>
            </form>
          </div>
        </div>
      )}
      <DeleteConfirm
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this material? This action cannot be undone."
      />
    </div>
  );
};

export default Material;
