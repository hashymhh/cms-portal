import React from "react";

const Reports = () => {
  // Sample data for metrics
  const metrics = {
    avgAttendance: { value: "89.3%", change: "+2.1% from last month", icon: "👥", color: "bg-orange-50" },
    avgGrade: { value: "3.2/4.0", change: "+0.3 from last semester", icon: "🎓", color: "bg-teal-50" },
    feeCollection: { value: "98%", change: "+3% from last month", icon: "📈", color: "bg-orange-50" },
    activeCourses: { value: "48", change: "+5 new courses", icon: "📚", color: "bg-teal-50" },
  };

  // Class Attendance Rate data (bar chart)
  const attendanceData = [95, 88, 90, 92, 97, 89];
  const maxAttendance = Math.max(...attendanceData);

  // Grade Distribution data (pie chart percentages)
  const gradeData = [
    { grade: "A", percent: 25, color: "#5eaaa8", label: "A: 25%" },
    { grade: "A+", percent: 15, color: "#ff6347", label: "A+: 15%" },
    { grade: "D", percent: 5, color: "#dc2626", label: "D: 5%" },
    { grade: "C", percent: 20, color: "#9ca3af", label: "C: 20%" },
    { grade: "Other", percent: 35, color: "#e5e7eb", label: "" }, // remaining
  ];

  // Fee Collection Trend data (line chart)
  const feeData = {
    collected: [88, 92, 96, 94, 98, 100],
    pending: [12, 8, 4, 6, 2, 0],
  };

  // Simple SVG pie chart calculation
  const createPieSlices = () => {
    let cumulativePercent = 0;
    return gradeData.map((slice, idx) => {
      const startAngle = (cumulativePercent / 100) * 360;
      cumulativePercent += slice.percent;
      const endAngle = (cumulativePercent / 100) * 360;

      const x1 = 50 + 40 * Math.cos((Math.PI * startAngle) / 180);
      const y1 = 50 + 40 * Math.sin((Math.PI * startAngle) / 180);
      const x2 = 50 + 40 * Math.cos((Math.PI * endAngle) / 180);
      const y2 = 50 + 40 * Math.sin((Math.PI * endAngle) / 180);

      const largeArc = slice.percent > 50 ? 1 : 0;

      return (
        <path
          key={idx}
          d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
          fill={slice.color}
        />
      );
    });
  };

  return (
    <div className="w-full mx-auto mt-10 flex flex-col mb-10">
      {/* Header */}
      <div className="w-full mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Reports &amp; Analytics</h2>
        <p className="text-sm text-gray-500 mt-1">Comprehensive system analytics and performance metrics</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className={`${metrics.avgAttendance.color} border rounded-lg p-4 flex items-start justify-between`}>
          <div>
            <div className="text-sm text-gray-600 mb-1">Avg Attendance</div>
            <div className="text-2xl font-bold text-gray-800">{metrics.avgAttendance.value}</div>
            <div className="text-xs text-red-600 mt-1">{metrics.avgAttendance.change}</div>
          </div>
          <div className="text-3xl">{metrics.avgAttendance.icon}</div>
        </div>

        <div className={`${metrics.avgGrade.color} border rounded-lg p-4 flex items-start justify-between`}>
          <div>
            <div className="text-sm text-gray-600 mb-1">Avg Grade</div>
            <div className="text-2xl font-bold text-gray-800">{metrics.avgGrade.value}</div>
            <div className="text-xs text-teal-600 mt-1">{metrics.avgGrade.change}</div>
          </div>
          <div className="text-3xl">{metrics.avgGrade.icon}</div>
        </div>

        <div className={`${metrics.feeCollection.color} border rounded-lg p-4 flex items-start justify-between`}>
          <div>
            <div className="text-sm text-gray-600 mb-1">Fee Collection</div>
            <div className="text-2xl font-bold text-gray-800">{metrics.feeCollection.value}</div>
            <div className="text-xs text-red-600 mt-1">{metrics.feeCollection.change}</div>
          </div>
          <div className="text-3xl">{metrics.feeCollection.icon}</div>
        </div>

        <div className={`${metrics.activeCourses.color} border rounded-lg p-4 flex items-start justify-between`}>
          <div>
            <div className="text-sm text-gray-600 mb-1">Active Courses</div>
            <div className="text-2xl font-bold text-gray-800">{metrics.activeCourses.value}</div>
            <div className="text-xs text-teal-600 mt-1">{metrics.activeCourses.change}</div>
          </div>
          <div className="text-3xl">{metrics.activeCourses.icon}</div>
        </div>
      </div>

      {/* Charts Row 1: Attendance + Grade Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Class Attendance Rate */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Class Attendance Rate</h3>
          <div className="flex items-end justify-around h-64 gap-2">
            {attendanceData.map((val, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-[#ff6347] rounded-t-md"
                  style={{ height: `${(val / maxAttendance) * 100}%` }}
                ></div>
                <div className="text-sm text-gray-600 mt-2">{idx}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
            <span>0</span>
            <span>100</span>
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Grade Distribution</h3>
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-64 h-64">
              {createPieSlices()}
              {/* Center white circle for donut effect */}
              <circle cx="50" cy="50" r="20" fill="white" />
            </svg>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {gradeData
              .filter((d) => d.label)
              .map((d, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: d.color }}></div>
                  <span className="text-gray-700">{d.label}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Fee Collection Trend */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Fee Collection Trend</h3>
        <div className="relative h-64">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            {/* Collected line */}
            <polyline
              fill="none"
              stroke="#ff6347"
              strokeWidth="0.5"
              points={feeData.collected
                .map((v, i) => `${(i / (feeData.collected.length - 1)) * 100},${100 - v}`)
                .join(" ")}
            />
            {feeData.collected.map((v, i) => (
              <circle
                key={`c-${i}`}
                cx={(i / (feeData.collected.length - 1)) * 100}
                cy={100 - v}
                r="1"
                fill="#ff6347"
              />
            ))}

            {/* Pending line */}
            <polyline
              fill="none"
              stroke="#dc2626"
              strokeWidth="0.5"
              points={feeData.pending
                .map((v, i) => `${(i / (feeData.pending.length - 1)) * 100},${100 - v * 5}`)
                .join(" ")}
            />
            {feeData.pending.map((v, i) => (
              <circle
                key={`p-${i}`}
                cx={(i / (feeData.pending.length - 1)) * 100}
                cy={100 - v * 5}
                r="1"
                fill="#dc2626"
              />
            ))}
          </svg>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff6347]"></div>
            <span className="text-gray-700">collected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#dc2626]"></div>
            <span className="text-gray-700">pending</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>
    </div>
  );
};

export default Reports;
