import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineDelete, MdEdit } from "react-icons/md";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { FiSearch, FiDownload, FiCheckCircle, FiXCircle } from "react-icons/fi";
import axiosWrapper from "../../utils/AxiosWrapper";
import Heading from "../../components/Heading";
import DeleteConfirm from "../../components/DeleteConfirm";
import CustomButton from "../../components/CustomButton";
import Loading from "../../components/Loading";
const Admin = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    gender: "",
    dob: "",
    designation: "",
    joiningDate: "",
    salary: "",
    status: "active",
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
    },
    bloodGroup: "",
  });
  const [admins, setAdmins] = useState([]);
  // User Management UI state (sample data driven)
  const [users, setUsers] = useState([
    { id: "u1", name: "Dr. Ahmed Khan", email: "ahmed.khan@concordia.edu", role: "Faculty", department: "Computer Science", status: "Active", joinDate: "2022-01-15" },
    { id: "u2", name: "Fatima Ali", email: "fatima.ali@concordia.edu", role: "Student", department: "Engineering", status: "Active", joinDate: "2023-09-01" },
    { id: "u3", name: "Hassan Malik", email: "hassan.malik@concordia.edu", role: "Coordinator", department: "Administration", status: "Active", joinDate: "2021-06-10" },
    { id: "u4", name: "Ayesha Siddiqui", email: "ayesha.siddiqui@concordia.edu", role: "Faculty", department: "Business", status: "Active", joinDate: "2022-03-20" },
    { id: "u5", name: "Muhammad Hassan", email: "hassan.m@concordia.edu", role: "Student", department: "Computer Science", status: "Inactive", joinDate: "2023-09-01" },
    { id: "u6", name: "Zainab Ahmed", email: "zainab.ahmed@concordia.edu", role: "Faculty", department: "Mathematics", status: "Active", joinDate: "2021-08-15" },
    { id: "u7", name: "Ali Raza", email: "ali.raza@concordia.edu", role: "Student", department: "Engineering", status: "Active", joinDate: "2023-09-01" },
  ]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const userToken = localStorage.getItem("userToken");
  const [file, setFile] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    getAdminsHandler();
  }, []);

  const getAdminsHandler = async () => {
    try {
      setDataLoading(true);
      const response = await axiosWrapper.get(`/admin`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.data.success) {
        setAdmins(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setAdmins([]);
        return;
      }
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching admins");
    } finally {
      setDataLoading(false);
    }
  };

  // Derived list for User Management table
  const filteredUsers = users.filter((u) => {
    const s = search.trim().toLowerCase();
    const matchesSearch = !s || u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s);
    const matchesRole = roleFilter === "All Roles" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const exportCsv = () => {
    const header = ["Name", "Email", "Role", "Department", "Status", "Join Date"];
    const rows = filteredUsers.map((u) => [u.name, u.email, u.role, u.department, u.status, u.joinDate]);
    const csv = [header.join(","), ...rows.map((r) => r.map((x) => `"${String(x).replace(/"/g,'""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newUser = {
      id: `u_${Date.now()}`,
      name: form.get("name") || "",
      email: form.get("email") || "",
      role: form.get("role") || "Student",
      department: form.get("department") || "",
      status: form.get("status") || "Active",
      joinDate: form.get("joinDate") || new Date().toISOString().slice(0, 10),
    };
    setUsers((prev) => [newUser, ...prev]);
    setShowAddForm(false);
    toast.success("User added (local)");
  };

  const requestDeleteUser = (id) => {
    setIsDeleteConfirmOpen(true);
    setSelectedUserId(id);
  };

  const confirmDeleteUser = () => {
    setUsers((prev) => prev.filter((u) => u.id !== selectedUserId));
    setIsDeleteConfirmOpen(false);
    toast.success("User deleted (local)");
  };

  const addAdminHandler = async () => {
    try {
      toast.loading(isEditing ? "Updating Admin" : "Adding Admin");
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userToken}`,
      };

      const formData = new FormData();
      for (const key in data) {
        if (key === "emergencyContact") {
          for (const subKey in data.emergencyContact) {
            formData.append(
              `emergencyContact[${subKey}]`,
              data.emergencyContact[subKey]
            );
          }
        } else {
          formData.append(key, data[key]);
        }
      }

      if (file) {
        formData.append("file", file);
      }

      let response;
      if (isEditing) {
        response = await axiosWrapper.patch(
          `/admin/${selectedAdminId}`,
          formData,
          {
            headers,
          }
        );
      } else {
        response = await axiosWrapper.post(`/admin/register`, formData, {
          headers,
        });
      }

      toast.dismiss();
      if (response.data.success) {
        if (!isEditing) {
          toast.success(
            `Admin created successfully! Default password: admin123`
          );
        } else {
          toast.success(response.data.message);
        }
        resetForm();
        getAdminsHandler();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const deleteAdminHandler = async (id) => {
    setIsDeleteConfirmOpen(true);
    setSelectedAdminId(id);
  };

  const editAdminHandler = (admin) => {
    setData({
      firstName: admin.firstName || "",
      lastName: admin.lastName || "",
      email: admin.email || "",
      phone: admin.phone || "",
      profile: admin.profile || "",
      address: admin.address || "",
      city: admin.city || "",
      state: admin.state || "",
      pincode: admin.pincode || "",
      country: admin.country || "",
      gender: admin.gender || "",
      dob: admin.dob?.split("T")[0] || "",
      designation: admin.designation || "",
      joiningDate: admin.joiningDate?.split("T")[0] || "",
      salary: admin.salary || "",
      status: admin.status || "active",
      emergencyContact: {
        name: admin.emergencyContact?.name || "",
        relationship: admin.emergencyContact?.relationship || "",
        phone: admin.emergencyContact?.phone || "",
      },
      bloodGroup: admin.bloodGroup || "",
    });
    setSelectedAdminId(admin._id);
    setIsEditing(true);
    setShowAddForm(true);
  };

  const confirmDelete = async () => {
    try {
      toast.loading("Deleting Admin");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      };
      const response = await axiosWrapper.delete(`/admin/${selectedAdminId}`, {
        headers,
      });
      toast.dismiss();
      if (response.data.success) {
        toast.success("Admin has been deleted successfully");
        setIsDeleteConfirmOpen(false);
        getAdminsHandler();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const resetForm = () => {
    setData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      profile: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      gender: "",
      dob: "",
      designation: "",
      joiningDate: "",
      salary: "",
      status: "active",
      emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
      },
      bloodGroup: "",
    });
    setShowAddForm(false);
    setIsEditing(false);
    setSelectedAdminId(null);
  };

  const handleInputChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleEmergencyContactChange = (field, value) => {
    setData({
      ...data,
      emergencyContact: { ...data.emergencyContact, [field]: value },
    });
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10 relative">
      {/* Header */}
      <div className="w-full flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">User Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage faculty, students, and coordinators</p>
        </div>
        <CustomButton onClick={() => setShowAddForm(true)} className="!rounded-lg !px-4 !py-2 flex items-center gap-2">
          <IoMdAdd className="text-xl" />
          <span className="hidden sm:inline">Add User</span>
        </CustomButton>
      </div>

      {/* Controls */}
      <div className="w-full mt-4 flex items-center gap-3 flex-wrap">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg border bg-white outline-none text-sm w-80"
          />
        </div>
        <select
          className="px-3 py-2 rounded-lg border bg-white text-sm"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option>All Roles</option>
          <option>Student</option>
          <option>Faculty</option>
          <option>Coordinator</option>
          <option>Admin</option>
        </select>
        <div className="ml-auto">
          <CustomButton onClick={exportCsv} className="!px-4 !py-2 flex items-center gap-2">
            <FiDownload />
            <span>Export</span>
          </CustomButton>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 w-full">
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="text-sm min-w-full">
            <thead>
              <tr className="bg-[#ff7a00] text-white">
                <th className="py-3 px-4 text-left font-semibold">Name</th>
                <th className="py-3 px-4 text-left font-semibold">Email</th>
                <th className="py-3 px-4 text-left font-semibold">Role</th>
                <th className="py-3 px-4 text-left font-semibold">Department</th>
                <th className="py-3 px-4 text-left font-semibold">Status</th>
                <th className="py-3 px-4 text-left font-semibold">Join Date</th>
                <th className="py-3 px-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="border-b hover:bg-orange-50">
                    <td className="py-3 px-4">{u.name}</td>
                    <td className="py-3 px-4 text-[#2563eb]">{u.email}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-700">{u.role}</span>
                    </td>
                    <td className="py-3 px-4">{u.department}</td>
                    <td className="py-3 px-4">
                      {u.status === "Active" ? (
                        <span className="inline-flex items-center gap-1 text-green-600">
                          <FiCheckCircle /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-600">
                          <FiXCircle /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">{u.joinDate}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-2">
                        <CustomButton variant="secondary" className="!p-2" onClick={() => toast("Edit coming soon") }>
                          <MdEdit />
                        </CustomButton>
                        <CustomButton variant="danger" className="!p-2" onClick={() => requestDeleteUser(u.id)}>
                          <MdOutlineDelete />
                        </CustomButton>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-base py-8">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[95%] max-w-2xl relative">
            <button onClick={() => setShowAddForm(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <IoMdClose className="text-2xl" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add User</h2>
            <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input name="name" type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7a00]" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input name="email" type="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7a00]" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select name="role" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7a00]">
                  <option>Student</option>
                  <option>Faculty</option>
                  <option>Coordinator</option>
                  <option>Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input name="department" type="text" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7a00]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select name="status" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7a00]">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                <input name="joinDate" type="date" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7a00]" />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                <CustomButton variant="secondary" type="button" onClick={() => setShowAddForm(false)}>Cancel</CustomButton>
                <CustomButton variant="primary" type="submit">Add</CustomButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      <DeleteConfirm
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={confirmDeleteUser}
        message="Are you sure you want to delete this user?"
      />
    </div>
  );
};

export default Admin;
