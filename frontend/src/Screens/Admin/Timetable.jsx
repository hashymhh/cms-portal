import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { FiDownload } from "react-icons/fi";
import CustomButton from "../../components/CustomButton";

const Timetable = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [department, setDepartment] = useState("All Departments");
  const [semester, setSemester] = useState("Fall 2024");

  // Sample weekly schedule data matching the screenshot
  const scheduleData = {
    department: "Computer Science Department",
    semester: "Fall 2024",
    schedule: [
      {
        time: "08:00 - 09:00",
        Monday: "CS101 (Lab A)",
        Tuesday: "CS101 (Lab A)",
        Wednesday: "CS101 (Lab A)",
        Thursday: "CS101 (Lab A)",
        Friday: "CS101 (Lab A)",
      },
      {
        time: "09:00 - 10:00",
        Monday: "BUS201",
        Tuesday: "BUS201",
        Wednesday: "BUS201",
        Thursday: "BUS201",
        Friday: "BUS201",
      },
      {
        time: "10:00 - 11:00",
        Monday: "ENG301",
        Tuesday: "ENG301",
        Wednesday: "ENG301",
        Thursday: "ENG301",
        Friday: "ENG301",
      },
      {
        time: "11:00 - 12:00",
        Monday: "SCI101",
        Tuesday: "SCI101",
        Wednesday: "SCI101",
        Thursday: "SCI101",
        Friday: "SCI101",
      },
      {
        time: "12:00 - 01:00",
        Monday: "BREAK",
        Tuesday: "BREAK",
        Wednesday: "BREAK",
        Thursday: "BREAK",
        Friday: "BREAK",
      },
      {
        time: "01:00 - 02:00",
        Monday: "CS201",
        Tuesday: "CS201",
        Wednesday: "CS201",
        Thursday: "CS201",
        Friday: "CS201",
      },
      {
        time: "02:00 - 03:00",
        Monday: "BUS301",
        Tuesday: "BUS301",
        Wednesday: "BUS301",
        Thursday: "BUS301",
        Friday: "BUS301",
      },
    ],
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const handleExportPDF = () => {
    toast.success("PDF export feature coming soon");
  };

  const handleCreateSchedule = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newSchedule = {
      course: form.get("course"),
      day: form.get("day"),
      time: form.get("time"),
      room: form.get("room"),
    };
    toast.success("Schedule created (local)");
    setShowCreateModal(false);
  };

  return (
    <div className="w-full mx-auto mt-10 flex flex-col mb-10">
      {/* Header */}
      <div className="w-full flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Timetable &amp; Scheduling
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            View and manage class schedules
          </p>
        </div>
        <CustomButton
          onClick={() => setShowCreateModal(true)}
          className="!rounded-lg !px-4 !py-2 flex items-center gap-2"
        >
          <IoMdAdd className="text-xl" />
          <span className="hidden sm:inline">Create Schedule</span>
        </CustomButton>
      </div>

      {/* Filters */}
      <div className="w-full mt-4 flex items-center gap-3 flex-wrap">
        <div>
          <label className="block text-xs text-gray-600 mb-1">Department</label>
          <select
            className="px-3 py-2 rounded-lg border bg-white text-sm min-w-[200px]"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option>All Departments</option>
            <option>Computer Science</option>
            <option>Engineering</option>
            <option>Business</option>
            <option>Mathematics</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">Semester</label>
          <select
            className="px-3 py-2 rounded-lg border bg-white text-sm min-w-[200px]"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option>Fall 2024</option>
            <option>Spring 2024</option>
            <option>Summer 2024</option>
          </select>
        </div>
        <div className="ml-auto mt-5">
          <CustomButton
            onClick={handleExportPDF}
            className="!px-4 !py-2 flex items-center gap-2"
          >
            <FiDownload />
            <span>Export PDF</span>
          </CustomButton>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="text-xl">📅</div>
          <h3 className="text-lg font-semibold text-gray-800">Weekly Schedule</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          {scheduleData.department} - {scheduleData.semester}
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left font-semibold text-gray-800 bg-gray-50">
                  Time
                </th>
                {days.map((day) => (
                  <th
                    key={day}
                    className="py-3 px-4 text-center font-semibold text-gray-800 bg-gray-50"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scheduleData.schedule.map((slot, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-700">
                    {slot.time}
                  </td>
                  {days.map((day) => (
                    <td key={day} className="py-3 px-4 text-center">
                      {slot[day] === "BREAK" ? (
                        <span className="inline-block px-3 py-1 rounded-full text-xs bg-gray-800 text-white">
                          BREAK
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-700 font-medium">
                          {slot[day]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Conflict Detection */}
      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Conflict Detection
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          No scheduling conflicts detected
        </p>
        <div className="text-center py-6 text-gray-400 text-sm">
          All schedules are optimized with no room or faculty conflicts
        </div>
      </div>

      {/* Create Schedule Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[95%] max-w-2xl relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <IoMdClose className="text-2xl" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Create Schedule</h2>
            <form
              onSubmit={handleCreateSchedule}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course
                </label>
                <input
                  name="course"
                  type="text"
                  placeholder="e.g., CS101"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7a00]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Day
                </label>
                <select
                  name="day"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7a00]"
                >
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  name="time"
                  type="time"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7a00]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room
                </label>
                <input
                  name="room"
                  type="text"
                  placeholder="e.g., Lab A"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff7a00]"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                <CustomButton
                  variant="secondary"
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </CustomButton>
                <CustomButton variant="primary" type="submit">
                  Create
                </CustomButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timetable;
