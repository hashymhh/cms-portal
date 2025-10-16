import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axiosWrapper from "../../utils/AxiosWrapper";
import Heading from "../../components/Heading";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";

const Timetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState("1");

  const fetchTimetables = async () => {
    setLoading(true);
    try {
      const response = await axiosWrapper.get(`/timetable?semester=${selectedSemester}`);
      if (response.data?.success) {
        const payload = response.data?.data;
        setTimetables(Array.isArray(payload) ? payload : []);
        if (!Array.isArray(payload)) {
          console.warn("Timetable API returned non-array payload", payload);
        }
      } else {
        toast.error(response.data?.message || "Failed to fetch timetables");
        setTimetables([]);
      }
    } catch (error) {
      console.error("Error fetching timetables:", error);
      if (error.response?.status === 404) {
        // No timetables found for this semester
        setTimetables([]);
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch timetables");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetables();
  }, [selectedSemester]);

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
  };

  const renderTimeSlot = (timeSlot, daySchedule) => {
    const period = daySchedule[timeSlot];
    if (!period) return <td key={timeSlot} className="border border-gray-300 p-2 text-center">-</td>;

    return (
      <td key={timeSlot} className="border border-gray-300 p-2 text-center bg-blue-50">
        <div className="text-sm font-medium text-blue-800">{period.subject}</div>
        <div className="text-xs text-blue-600">{period.faculty}</div>
        {period.room && <div className="text-xs text-gray-600">Room: {period.room}</div>}
      </td>
    );
  };

  const renderTimetableGrid = (timetable) => {
    // Build schedule map from either gridData (preferred) or legacy schedule object
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let scheduleMap = {};
    let derivedDays = [];
    let timeSlots = [];

    if (timetable.isGrid && Array.isArray(timetable.gridData) && timetable.gridData.length > 0) {
      // Convert array of entries into { [day]: { [time]: entry } }
      scheduleMap = timetable.gridData.reduce((acc, entry) => {
        const day = entry.day;
        const time = entry.time;
        if (!acc[day]) acc[day] = {};
        acc[day][time] = entry;
        return acc;
      }, {});
      // Derive ordered unique days and time slots
      let uniqueDays = [];
      let uniqueSlots = [];
      if (Array.isArray(timetable.gridData)) {
        uniqueDays = Array.from(new Set(timetable.gridData.map(e => e.day)));
        uniqueSlots = Array.from(new Set(timetable.gridData.map(e => e.time)));
      }
      derivedDays = dayOrder.filter(d => uniqueDays.includes(d));
      timeSlots = uniqueSlots;
    } else if (timetable.schedule && typeof timetable.schedule === 'object') {
      // Legacy shape: timetable.schedule with fixed slots
      scheduleMap = timetable.schedule || {};
      derivedDays = dayOrder;
      timeSlots = ['8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-1:00', '2:00-3:00', '3:00-4:00', '4:00-5:00'];
    } else if (timetable.link) {
      // PDF fallback
      return (
        <div key={timetable._id} className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-2">This timetable is provided as a PDF.</p>
            <a
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              href={/^https?:\/\//.test(timetable.link) ? timetable.link : `${process.env.REACT_APP_MEDIA_LINK}/${timetable.link}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View PDF
            </a>
          </div>
        </div>
      );
    } else {
      // No valid timetable data
      return (
        <div key={timetable._id} className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <NoData message="No timetable data available." />
        </div>
      );
    }

    return (
      <div key={timetable._id} className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="bg-green-600 text-white p-4">
          <h3 className="text-xl font-bold">
            Semester {timetable.semester} - {timetable.branch?.name || timetable.branchId?.name || 'Unknown Branch'}
          </h3>
          {timetable.academicYear && (
            <p className="text-green-100">Academic Year: {timetable.academicYear}</p>
          )}
        </div>
        {/* Grid or PDF fallback */}
        {Object.keys(scheduleMap).length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 font-semibold text-gray-700">Day/Time</th>
                  {timeSlots.map(slot => (
                    <th key={slot} className="border border-gray-300 p-3 font-semibold text-gray-700 min-w-[120px]">
                      {slot}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {derivedDays.map(day => (
                  <tr key={day} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-3 font-medium text-gray-800 bg-gray-50">
                      {day}
                    </td>
                    {timeSlots.map(timeSlot => renderTimeSlot(timeSlot, scheduleMap[day] || {}))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-2">This timetable is provided as a PDF.</p>
            <a
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              href={/^https?:\/\//.test(timetable.link) ? timetable.link : `${process.env.REACT_APP_MEDIA_LINK}/${timetable.link}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View PDF
            </a>
          </div>
        )}
      </div>
    );
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <Heading title="Coordinator - Timetable Management" />
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                As a coordinator, you can view and manage timetables for your assigned branch. Contact admin for editing permissions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Semester Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
            <button
              key={semester}
              onClick={() => handleSemesterChange(semester.toString())}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedSemester === semester.toString()
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Semester {semester}
            </button>
          ))}
        </div>
      </div>

      {/* Timetables */}
      {Array.isArray(timetables) && timetables.length > 0 ? (
        <div>
          {timetables.map(timetable => renderTimetableGrid(timetable))}
        </div>
      ) : (
        <NoData message={`No timetable found for semester ${selectedSemester}`} />
      )}
    </div>
  );
};

export default Timetable;