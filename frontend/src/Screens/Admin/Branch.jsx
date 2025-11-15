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
          <div className="bg-white border rounded-lg p-5 shadow-sm">
            <div className="text-sm text-gray-500">Total Departments</div>
            <div className="text-2xl font-semibold text-[#ff7a00] mt-2">{branch?.length ?? 0}</div>
          </div>
          <div className="bg-white border rounded-lg p-5 shadow-sm">
            <div className="text-sm text-gray-500">Total Faculty</div>
            <div className="text-2xl font-semibold text-[#ff7a00] mt-2">{metrics.faculty}</div>
          </div>
          <div className="bg-white border rounded-lg p-5 shadow-sm">
            <div className="text-sm text-gray-500">Total Students</div>
            <div className="text-2xl font-semibold text-[#ff7a00] mt-2">{metrics.students}</div>
          </div>
          <div className="bg-white border rounded-lg p-5 shadow-sm">
            <div className="text-sm text-gray-500">Total Courses</div>
            <div className="text-2xl font-semibold text-[#ff7a00] mt-2">{metrics.courses}</div>
          </div>
        </div>

        {/* Search and Export */}
        <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border bg-white outline-none text-sm w-72"
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
          <div className="bg-white rounded-t-lg border px-4 py-3">
            <div className="font-semibold text-gray-800">Department List</div>
            <div className="text-xs text-gray-500">Manage all departments and their resources</div>
          </div>
          <div className="overflow-x-auto bg-white rounded-b-lg shadow">
            <table className="text-sm min-w-full">
              <thead>
                <tr className="bg-[#ff7a00] text-white">
                  <th className="py-3 px-4 text-left font-semibold">Department</th>
                  <th className="py-3 px-4 text-left font-semibold">Code</th>
                  <th className="py-3 px-4 text-left font-semibold">Created</th>
                  <th className="py-3 px-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBranches && filteredBranches.length > 0 ? (
                  filteredBranches.map((item, index) => (
                      <tr key={item._id || index} className="border-b hover:bg-orange-50">
                        <td className="py-3 px-4">{item.name}</td>
                        <td className="py-3 px-4">{item.branchId}</td>
                        <td className="py-3 px-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-4 text-center">
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
