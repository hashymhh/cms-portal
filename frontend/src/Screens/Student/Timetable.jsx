import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axiosWrapper from "../../utils/AxiosWrapper";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { SAMPLE_TIMETABLE } from "./timetableSampleData";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Timetable = () => {
  const userData = useSelector((state) => state.userData);
  const [loading, setLoading] = useState(false);
  const [weekLabel, setWeekLabel] = useState(SAMPLE_TIMETABLE.weekLabel);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [viewMode, setViewMode] = useState("day"); // 'day' | 'week'
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const printRef = useRef(null);

  // Attempt to fetch from backend; fallback to sample data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosWrapper.get(
          `/timetable?semester=${userData?.semester || 1}&branch=${userData?.branchId?._id || ""}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
        );
        if (res.data?.success && res.data?.data?.[0]?.gridData) {
          setData({
            semesterLabel: userData?.semester ? `Semester ${userData.semester}` : SAMPLE_TIMETABLE.semesterLabel,
            weekLabel: weekLabel,
            lectureSlots: SAMPLE_TIMETABLE.lectureSlots,
            days: res.data.data[0].gridData,
          });
        } else {
          setData(SAMPLE_TIMETABLE);
        }
      } catch (e) {
        setData(SAMPLE_TIMETABLE);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userData]);

  const slots = useMemo(() => data?.lectureSlots || [], [data]);

  const subjectToId = (name) => {
    const n = (name || "").toLowerCase();
    if (n.includes("math") || n.includes("subject 1")) return 1;
    if (n.includes("phys") || n.includes("subject 2")) return 2;
    if (n.includes("chem") || n.includes("subject 3")) return 3;
    if (n.includes("comp") || n.includes("cs") || n.includes("subject 4")) return 4;
    return 1;
  };

  const goToSubject = (subjectName) => {
    const sid = subjectToId(subjectName);
    const params = new URLSearchParams(window.location.search);
    params.set("page", "course");
    params.set("subjectId", String(sid));
    params.set("tab", "menu");
    navigate(`/student?${params.toString()}`);
  };

  const printTimetable = () => {
    if (!printRef.current) return;
    const content = printRef.current.innerHTML;
    const win = window.open("", "_blank", "width=1024,height=768");
    if (!win) return;
    win.document.write(`<!doctype html><html><head><title>Time Table</title></head><body>${content}</body></html>`);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  if (loading) {
    return <div className="p-6">Loading timetable…</div>;
  }
  if (!data) {
    return <div className="p-6">Schedule Pending</div>;
  }

  return (
    <div className="space-y-4">
      <style>{`
        .orange-header { background:#FF8B2D; color:#fff; padding:18px 24px; border-radius:16px; font-weight:700; font-size:28px; }
        .panel { background:#FFA752; padding:18px; border-radius:18px; }
        .day-tabs { display:flex; gap:14px; align-items:center; flex-wrap:wrap; }
        .day-pill { background:#FFD9A8; color:#6b7280; padding:8px 14px; border-radius:999px; font-weight:700; cursor:pointer; }
        .day-pill.active { background:#FF8B2D; color:#fff; }
        .lecture-grid { display:grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap:18px; }
        .lecture-card { background:#fff; border-radius:14px; padding:12px; box-shadow:0 1px 2px rgba(0,0,0,0.06); border:3px solid #FFE7C9; cursor:pointer; }
        .lecture-card:hover { transform: translateY(-1px); box-shadow: 0 4px 10px rgba(0,0,0,0.08); }
        .subheader { background:#FFD9A8; color:#FF8B2D; font-weight:700; text-align:center; padding:10px; border-radius:10px; }
        .controls { display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
        .btn { background:#fff; color:#FF8B2D; border:2px solid #FF8B2D; padding:6px 12px; border-radius:10px; font-weight:700; cursor:pointer; }
        .btn.primary { background:#FF8B2D; color:#fff; border-color:#FF8B2D; }
        .week-table { width:100%; border-collapse:separate; border-spacing:0; background:#FFA752; border-radius:14px; overflow:hidden; }
        .week-table th, .week-table td { background:#fff; padding:10px; border-right: 1px solid #eee; border-bottom: 1px solid #eee; }
        .week-table th:first-child, .week-table td:first-child { position:sticky; left:0; background:#FFF4E8; font-weight:800; }
        @media (max-width: 1024px){ .lecture-grid { grid-template-columns: repeat(2, minmax(0,1fr)); } }
        @media (max-width: 560px){ .lecture-grid { grid-template-columns: repeat(1, minmax(0,1fr)); } }
      `}</style>

      <div className="orange-header">Time Table</div>

      <div className="flex items-center justify-between">
        <div className="controls" aria-label="Timetable controls">
          <select aria-label="Select week" value={weekLabel} onChange={(e) => setWeekLabel(e.target.value)} className="btn">
            <option>Sep 2025 - Week 1</option>
            <option>Sep 2025 - Week 2</option>
            <option>Sep 2025 - Week 3</option>
            <option>Sep 2025 - Week 4</option>
          </select>
          <button className={`btn ${viewMode === 'day' ? 'primary' : ''}`} onClick={() => setViewMode('day')} aria-pressed={viewMode==='day'}>
            Day View
          </button>
          <button className={`btn ${viewMode === 'week' ? 'primary' : ''}`} onClick={() => setViewMode('week')} aria-pressed={viewMode==='week'}>
            Week View
          </button>
          <button className="btn" onClick={printTimetable} aria-label="Print timetable">Print</button>
        </div>
      </div>

      {viewMode === 'day' && (
        <div className="panel" ref={printRef}>
          <div className="day-tabs mb-3" role="tablist" aria-label="Days selector">
            {DAYS.map((d) => (
              <div
                key={d}
                role="tab"
                aria-selected={selectedDay === d}
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedDay(d); }}
                className={`day-pill ${selectedDay === d ? 'active' : ''}`}
                onClick={() => setSelectedDay(d)}
              >
                {d}
              </div>
            ))}
          </div>
          <div className="subheader">{selectedDay}</div>
          <div className="lecture-grid mt-4">
            {(data.days[selectedDay] || []).slice(0,4).map((lec, idx) => (
              <div
                key={idx}
                className="lecture-card"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && lec?.subject && lec.subject !== 'No Class') goToSubject(lec.subject); }}
                onClick={() => lec?.subject && lec.subject !== 'No Class' && goToSubject(lec.subject)}
                title={lec?.teacher ? `Teacher: ${lec.teacher}\nRoom: ${lec.room || '-'}` : ''}
                aria-label={`Lecture ${idx + 1} ${lec?.subject || 'No Class'}`}
              >
                <div className="font-extrabold text-lg mb-2">Lecture {idx + 1}</div>
                {lec?.subject && lec.subject !== 'No Class' ? (
                  <div className="space-y-1 text-sm">
                    <div><span className="font-semibold">Sub:</span> {lec.subject}</div>
                    <div><span className="font-semibold">Time:</span> {lec.time || '-'}</div>
                    <div><span className="font-semibold">Room:</span> {lec.room || '-'}</div>
                    <div><span className="font-semibold">Teacher:</span> {lec.teacher || '-'}</div>
                  </div>
                ) : (
                  <div className="text-gray-400">No Class</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {viewMode === 'week' && (
        <div className="panel" ref={printRef}>
          <table className="week-table" aria-label="Weekly timetable grid">
            <thead>
              <tr>
                <th>Lecture</th>
                {DAYS.map((d) => (<th key={d}>{d}</th>))}
              </tr>
            </thead>
            <tbody>
              {slots.map((slot, i) => (
                <tr key={slot.id}>
                  <td><div className="font-bold">{slot.label}</div><div className="text-xs text-gray-500">{slot.time}</div></td>
                  {DAYS.map((day) => {
                    const lec = (data.days[day] || []).find(l => l.slot === slot.id);
                    const isClass = lec && lec.subject && lec.subject !== 'No Class';
                    return (
                      <td key={day}>
                        <div
                          className="lecture-card"
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && isClass) goToSubject(lec.subject); }}
                          onClick={() => isClass && goToSubject(lec.subject)}
                          title={isClass ? `Teacher: ${lec.teacher || '-'}\nRoom: ${lec.room || '-'}` : ''}
                          aria-label={`${day} ${slot.label} ${isClass ? lec.subject : 'No Class'}`}
                        >
                          {isClass ? (
                            <div>
                              <div className="font-semibold">{lec.subject}</div>
                              <div className="text-xs text-gray-500">{lec.time || slot.time}</div>
                              <div className="text-xs text-gray-400">Room: {lec.room || '-'}</div>
                            </div>
                          ) : (
                            <div className="text-gray-400">No Class</div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Timetable;
