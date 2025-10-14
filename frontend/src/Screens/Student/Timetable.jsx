import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import Heading from "../../components/Heading";
import { useSelector } from "react-redux";
import axiosWrapper from "../../utils/AxiosWrapper";
import { toast } from "react-hot-toast";
import Loading from "../../components/Loading";
const Timetable = () => {
  const [timetable, setTimetable] = useState("");
  const [timetableData, setTimetableData] = useState(null);
  const [isGridFormat, setIsGridFormat] = useState(false);
  const userData = useSelector((state) => state.userData);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    const getTimetable = async () => {
      try {
        setDataLoading(true);
        const response = await axiosWrapper.get(
          `/timetable?semester=${userData.semester}&branch=${userData.branchId?._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        if (response.data.success && response.data.data.length > 0) {
          const timetableRecord = response.data.data[0];
          setTimetable(timetableRecord.link);
          
          // Check if this is grid format timetable
          if (timetableRecord.isGrid && timetableRecord.gridData) {
            setIsGridFormat(true);
            setTimetableData(timetableRecord.gridData);
          } else if (timetableRecord.link.startsWith('[') || timetableRecord.link.startsWith('{')) {
            // If link contains JSON data, parse it for grid display
            try {
              const gridData = JSON.parse(timetableRecord.link);
              setIsGridFormat(true);
              setTimetableData(gridData);
            } catch (e) {
              setIsGridFormat(false);
              setTimetableData(null);
            }
          } else {
            setIsGridFormat(false);
            setTimetableData(null);
          }
        } else {
          setTimetable("");
          setIsGridFormat(false);
          setTimetableData(null);
        }
      } catch (error) {
        if (error && error.response && error.response.status === 404) {
          setTimetable("");
          return;
        }
        toast.error(
          error.response?.data?.message || "Error fetching timetable"
        );
        console.error(error);
      } finally {
        setDataLoading(false);
      }
    };
    userData && getTimetable();
  }, [userData, userData.branchId, userData.semester]);

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      <div className="flex justify-between items-center w-full">
        <Heading title={`Timetable of Semester ${userData.semester}`} />
        {!dataLoading && timetable && (
          <p
            className="flex justify-center items-center text-lg font-medium cursor-pointer hover:text-red-500 hover:scale-110 ease-linear transition-all duration-200 hover:duration-200 hover:ease-linear hover:transition-all"
            onClick={() =>
              window.open(process.env.REACT_APP_MEDIA_LINK + "/" + timetable)
            }
          >
            Download
            <span className="ml-2">
              <FiDownload />
            </span>
          </p>
        )}
      </div>
      {dataLoading && <Loading />}
      {!dataLoading && timetable && isGridFormat && timetableData && (
        <div className="mt-8 w-full">
          <h3 className="text-lg font-semibold mb-4 text-center">Weekly Timetable - Semester {userData.semester}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Monday</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Tuesday</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Wednesday</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Thursday</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Friday</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {['8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00'].map((timeSlot) => (
                  <tr key={timeSlot} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                      {timeSlot}
                    </td>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => {
                      const classInfo = timetableData.find(item => item.day === day && item.time === timeSlot);
                      return (
                        <td key={day} className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {classInfo ? (
                            <div className="text-center">
                              <div className="font-semibold text-blue-600">{classInfo.subject}</div>
                              <div className="text-xs text-gray-400">{classInfo.room}</div>
                              <div className="text-xs text-gray-500">{classInfo.faculty}</div>
                            </div>
                          ) : (
                            <div className="text-center text-gray-300">-</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!dataLoading && timetable && !isGridFormat && (
        <img
          className="mt-8 rounded-lg shadow-md w-[70%] mx-auto"
          src={process.env.REACT_APP_MEDIA_LINK + "/" + timetable}
          alt="timetable"
        />
      )}
      {!dataLoading && !timetable && (
        <p className="mt-10">No Timetable Available At The Moment!</p>
      )}
    </div>
  );
};

export default Timetable;
