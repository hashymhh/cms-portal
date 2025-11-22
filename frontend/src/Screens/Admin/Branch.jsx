import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineDelete, MdEdit } from "react-icons/md";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { FiSearch, FiDownload } from "react-icons/fi";
import axiosWrapper from "../../utils/AxiosWrapper";
import Heading from "../../components/Heading";
import DeleteConfirm from "../../components/DeleteConfirm";
import CustomButton from "../../components/CustomButton";
import Loading from "../../components/Loading";

const Branch = () => {
  const [data, setData] = useState({
    name: "",
    branchId: "",
  });
  const [branch, setBranch] = useState();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [processLoading, setProcessLoading] = useState(false);
  const [metrics, setMetrics] = useState({ faculty: 0, students: 0, courses: 0 });

  useEffect(() => {
    getBranchHandler();
  }, []);

  const getBranchHandler = async () => {
    setDataLoading(true);
    try {
      const response = await axiosWrapper.get(`/branch`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      if (response.data.success) {
        setBranch(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setBranch([]);
        return;
      }
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching branches");
    } finally {
      setDataLoading(false);
    }
  };

  const addBranchHandler = async () => {
    if (!data.name || !data.branchId) {
      toast.dismiss();
      toast.error("Please fill all the fields");
      return;
    }
    try {
      toast.loading(isEditing ? "Updating Branch" : "Adding Branch");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      };
      let response;
      if (isEditing) {
        response = await axiosWrapper.patch(
          `/branch/${selectedBranchId}`,
          data,
          {
            headers: headers,
          }
        );
      } else {
        response = await axiosWrapper.post(`/branch`, data, {
          headers: headers,
        });
      }
      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        setData({ name: "", branchId: "" });
        setShowAddForm(false);
        setIsEditing(false);
        setSelectedBranchId(null);
        getBranchHandler();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
    }
  };

  const deleteBranchHandler = async (id) => {
    setIsDeleteConfirmOpen(true);
    setSelectedBranchId(id);
  };

  const editBranchHandler = (branch) => {
    setData({
      name: branch.name,
      branchId: branch.branchId,
    });
    setSelectedBranchId(branch._id);
    setIsEditing(true);
    setShowAddForm(true);
  };

  const confirmDelete = async () => {
    try {
      toast.loading("Deleting Branch");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      };
      const response = await axiosWrapper.delete(
        `/branch/${selectedBranchId}`,
        {
          headers: headers,
        }
      );
      toast.dismiss();
      if (response.data.success) {
        toast.success("Branch has been deleted successfully");
        setIsDeleteConfirmOpen(false);
        getBranchHandler();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
    }
  };

  const filteredBranches = (branch || []).filter((item) => {
    if (!searchTerm) return true;
    const s = searchTerm.toLowerCase();
    return (
      (item?.name || "").toLowerCase().includes(s) ||
      (item?.branchId || "").toLowerCase().includes(s)
    );
  });

  const exportCsv = () => {
    const rows = filteredBranches.map((b) => ({
      Department: b?.name || "",
      Code: b?.branchId || "",
      Created: b?.createdAt ? new Date(b.createdAt).toLocaleDateString() : "",
    }));
    const header = Object.keys(rows[0] || { Department: "Department", Code: "Code", Created: "Created" });
    const csv = [
      header.join(","),
      ...rows.map((r) => header.map((h) => `"${String(r[h] ?? "").replace(/"/g, '""')}"`).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "departments.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10 relative">
      <div className="w-full">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Departments &amp; Branches</h2>
            <p className="text-sm text-gray-500 mt-1">Manage academic departments and their resources</p>
          </div>
          <CustomButton
            onClick={() => {
              setShowAddForm(!showAddForm);
              if (!showAddForm) {
                setData({ name: "", branchId: "" });
                setIsEditing(false);
                setSelectedBranchId(null);
              }
            }}
            className="!rounded-lg !px-4 !py-2 flex items-center gap-2"
          >
            <IoMdAdd className="text-xl" />
            <span className="hidden sm:inline">Add Department</span>
          </CustomButton>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          <style>{`
            .metric-card { 
              position:relative; 
              background:linear-gradient(160deg,#ffffff,#fffaf3); 
              border:1px solid #f3e2cc; 
              border-radius:14px; 
              padding:20px; 
              box-shadow:0 4px 16px rgba(0,0,0,0.08); 
              overflow:hidden; 
              transition:all .3s; 
            }
            .metric-card:before { 
              content:''; 
              position:absolute; 
              top:-30px; 
              right:-30px; 
              width:80px; 
              height:80px; 
              background:linear-gradient(135deg,rgba(242,131,0,0.2),rgba(255,157,77,0.25)); 
              filter:blur(25px); 
              opacity:.5; 
            }
            .metric-card:hover { 
              transform:translateY(-4px); 
              box-shadow:0 8px 24px rgba(242,131,0,0.2); 
            }
            .metric-label { 
              font-size:13px; 
              color:#8a5a15; 
              font-weight:600; 
              position:relative; 
            }
            .metric-value { 
              font-size:28px; 
              font-weight:700; 
              color:#f28300; 
              margin-top:8px; 
              position:relative; 
            }
            .search-input { 
              padding-left:40px; 
              padding-top:8px; 
              padding-bottom:8px; 
              padding-right:16px; 
              border-radius:12px; 
              border:2px solid #f3e2cc; 
              background:linear-gradient(160deg,#ffffff,#fffbf5); 
              outline:none; 
              font-size:14px; 
              width:288px; 
              transition:all .3s; 
            }
            .search-input:focus { 
              border-color:#f28300; 
              box-shadow:0 0 0 4px rgba(242,131,0,0.15); 
            }
            .search-icon { 
              position:absolute; 
              left:12px; 
              top:50%; 
              transform:translateY(-50%); 
              color:#8a5a15; 
            }
            .departments-table { 
              width:100%; 
            }
            .table-header { 
              background:linear-gradient(145deg,#fff7ee,#ffe9d1); 
              border:1px solid #ffe0c2; 
              padding:16px; 
              border-radius-top:12px; 
            }
            .table-title { 
              font-weight:700; 
              color:#2f2f2f; 
              font-size:16px; 
            }
            .table-subtitle { 
              font-size:12px; 
              color:#8a5a15; 
              margin-top:2px; 
            }
            .table-wrapper { 
              background:#fff; 
              border-radius-bottom:12px; 
              box-shadow:0 6px 20px rgba(0,0,0,0.08); 
              overflow:hidden; 
            }
            .departments-table thead tr { 
              background:linear-gradient(135deg,#f28300,#ff9d4d); 
            }
            .departments-table th { 
              padding:14px 16px; 
              text-align:left; 
              font-weight:700; 
              color:#fff; 
              letter-spacing:.3px; 
              font-size:14px; 
            }
            .departments-table tbody tr { 
              transition:all .3s; 
            }
            .departments-table tbody tr:hover { 
              background:linear-gradient(145deg,#fff5e6,#ffe4cc); 
              transform:scale(1.002); 
            }
            .departments-table td { 
              padding:14px 16px; 
              border-bottom:1px solid #f0e6d8; 
              color:#374151; 
              font-weight:500; 
              font-size:14px; 
            }
          `}</style>
          <div className="metric-card">
            <div className="metric-label">Total Departments</div>
            <div className="metric-value">{branch?.length ?? 0}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Total Faculty</div>
            <div className="metric-value">{metrics.faculty}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Total Students</div>
            <div className="metric-value">{metrics.students}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Total Courses</div>
            <div className="metric-value">{metrics.courses}</div>
          </div>
        </div>

        {/* Search and Export */}
        <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
          <div className="relative">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <CustomButton onClick={exportCsv} className="!px-4 !py-2 flex items-center gap-2">
            <FiDownload />
            <span>Export</span>
          </CustomButton>
        </div>
      </div>

      {dataLoading && <Loading />}

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-[500px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">{isEditing ? "Edit Department" : "Add New Department"}</h2>
              <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700">
                <IoMdClose className="text-3xl" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addBranchHandler();
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Department Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7a00]"
                />
              </div>

              <div>
                <label htmlFor="branchId" className="block text-sm font-medium text-gray-700 mb-2">
                  Department Code
                </label>
                <input
                  type="text"
                  id="branchId"
                  value={data.branchId}
                  onChange={(e) => setData({ ...data, branchId: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7a00]"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t">
                <CustomButton variant="secondary" onClick={() => setShowAddForm(false)}>
                  Cancel
                </CustomButton>
                <CustomButton variant="primary" onClick={addBranchHandler}>
                  {isEditing ? "Update" : "Add"}
                </CustomButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {!dataLoading && (
        <div className="mt-6 w-full">
          <div className="table-header">
            <div className="table-title">Department List</div>
            <div className="table-subtitle">Manage all departments and their resources</div>
          </div>
          <div className="table-wrapper">
            <table className="text-sm departments-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Code</th>
                  <th>Created</th>
                  <th style={{textAlign:'center'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBranches && filteredBranches.length > 0 ? (
                  filteredBranches.map((item, index) => (
                      <tr key={item._id || index}>
                        <td>{item.name}</td>
                        <td>{item.branchId}</td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td style={{textAlign:'center'}}>
                          <div className="inline-flex items-center gap-2">
                            <CustomButton variant="secondary" className="!p-2" onClick={() => editBranchHandler(item)}>
                              <MdEdit />
                            </CustomButton>
                            <CustomButton variant="danger" className="!p-2" onClick={() => deleteBranchHandler(item._id)}>
                              <MdOutlineDelete />
                            </CustomButton>
                          </div>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-base py-8">
                      No departments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <DeleteConfirm
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this branch?"
      />
    </div>
  );
};

export default Branch;
