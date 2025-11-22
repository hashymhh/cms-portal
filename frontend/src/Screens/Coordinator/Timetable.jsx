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
    if (!period) return <td key={timeSlot}>-</td>;

    return (
      <td key={timeSlot} className="period-cell">
        <div className="period-subject">{period.subject}</div>
        <div className="period-faculty">{period.faculty}</div>
        {period.room && <div className="period-room">Room: {period.room}</div>}
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
        <div key={timetable._id} className="timetable-card">
          <div className="p-4">
            <p className="info-text mb-2">This timetable is provided as a PDF.</p>
            <a
              className="pdf-link-btn"
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
        <div key={timetable._id} className="timetable-card">
          <NoData message="No timetable data available." />
        </div>
      );
    }

    return (
      <div key={timetable._id} className="timetable-card">
        <div className="timetable-header">
          <h3>
            Semester {timetable.semester} - {timetable.branch?.name || timetable.branchId?.name || 'Unknown Branch'}
          </h3>
          {timetable.academicYear && (
            <p>Academic Year: {timetable.academicYear}</p>
          )}
        </div>
        {/* Grid or PDF fallback */}
        {Object.keys(scheduleMap).length > 0 ? (
          <div className="overflow-x-auto">
            <table className="timetable-table">
              <thead>
                <tr>
                  <th>Day/Time</th>
                  {timeSlots.map(slot => (
                    <th key={slot}>
                      {slot}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {derivedDays.map(day => (
                  <tr key={day}>
                    <td className="day-cell">
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
            <p className="info-text mb-2">This timetable is provided as a PDF.</p>
            <a
              className="pdf-link-btn"
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
      <style>{`
        .info-banner { 
          background:linear-gradient(145deg,#fff7ee,#ffe9d1); 
          border-left:4px solid #f28300; 
          padding:16px; 
          margin-top:16px; 
          border-radius:12px; 
          box-shadow:0 4px 12px rgba(242,131,0,0.15); 
        }
        .info-icon { 
          width:20px; 
          height:20px; 
          color:#f28300; 
        }
        .info-text { 
          font-size:14px; 
          color:#8a5a15; 
          font-weight:500; 
        }
        .semester-pills { 
          display:flex; 
          flex-wrap:wrap; 
          gap:8px; 
          margin-bottom:24px; 
        }
        .semester-pill { 
          padding:12px 20px; 
          border-radius:12px; 
          font-weight:600; 
          transition:all .3s; 
          cursor:pointer; 
          border:2px solid #f3e2cc; 
        }
        .semester-pill.active { 
          background:linear-gradient(135deg,#f28300,#ff9d4d); 
          color:#fff; 
          border-color:#f28300; 
          box-shadow:0 4px 12px rgba(242,131,0,0.3); 
        }
        .semester-pill.inactive { 
          background:#fff; 
          color:#8a5a15; 
        }
        .semester-pill.inactive:hover { 
          background:linear-gradient(145deg,#fff7ee,#ffe9d1); 
          border-color:#f28300; 
        }
        .timetable-card { 
          background:linear-gradient(160deg,#ffffff,#fffaf3); 
          border-radius:18px; 
          overflow:hidden; 
          box-shadow:0 6px 20px rgba(0,0,0,0.1); 
          margin-bottom:32px; 
          border:1px solid #f3e2cc; 
        }
        .timetable-header { 
          background:linear-gradient(135deg,#f28300,#ff9d4d); 
          color:#fff; 
          padding:20px; 
        }
        .timetable-header h3 { 
          font-size:20px; 
          font-weight:700; 
          margin:0; 
        }
        .timetable-header p { 
          color:rgba(255,255,255,0.9); 
          margin:4px 0 0; 
          font-size:14px; 
        }
        .timetable-table { 
          width:100%; 
        }
        .timetable-table thead tr { 
          background:linear-gradient(145deg,#fff7ee,#ffe9d1); 
        }
        .timetable-table th { 
          padding:14px 12px; 
          font-weight:700; 
          color:#8a5a15; 
          border:1px solid #f3e2cc; 
          text-align:center; 
          min-width:120px; 
        }
        .timetable-table td { 
          padding:8px; 
          border:1px solid #f3e2cc; 
          text-align:center; 
        }
        .timetable-table tbody tr:hover { 
          background:linear-gradient(145deg,#fff5e6,#ffe4cc); 
        }
        .timetable-table .day-cell { 
          font-weight:600; 
          color:#2f2f2f; 
          background:linear-gradient(145deg,#fff7ee,#ffe9d1); 
        }
        .period-cell { 
          background:linear-gradient(160deg,#ffffff,#fffbf5); 
        }
        .period-subject { 
          font-size:13px; 
          font-weight:600; 
          color:#d97200; 
        }
        .period-faculty { 
          font-size:12px; 
          color:#8a5a15; 
        }
        .period-room { 
          font-size:11px; 
          color:#6b5c4a; 
        }
        .pdf-link-btn { 
          display:inline-block; 
          background:linear-gradient(135deg,#f28300,#ff9d4d); 
          color:#fff; 
          padding:12px 24px; 
          border-radius:12px; 
          font-weight:600; 
          transition:all .3s; 
          text-decoration:none; 
          box-shadow:0 4px 12px rgba(242,131,0,0.3); 
        }
        .pdf-link-btn:hover { 
          background:linear-gradient(135deg,#d97200,#f28300); 
          transform:translateY(-2px); 
          box-shadow:0 6px 16px rgba(242,131,0,0.4); 
        }
      `}</style>
      <div className="mb-8">
        <Heading title="Coordinator - Timetable Management" />
        <div className="info-banner">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="info-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="info-text">
                As a coordinator, you can view and manage timetables for your assigned branch. Contact admin for editing permissions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Semester Filter */}
      <div className="mb-6">
        <div className="semester-pills">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
            <button
              key={semester}
              onClick={() => handleSemesterChange(semester.toString())}
              className={`semester-pill ${
                selectedSemester === semester.toString()
                  ? "active"
                  : "inactive"
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