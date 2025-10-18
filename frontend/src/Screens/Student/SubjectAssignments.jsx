/* SubjectAssignments.jsx - Assignments tab for a subject (sample data, blue/white theme) */
import React from "react";

const SubjectAssignments = ({ assignments = [] }) => {
  return (
    <div>
      <style>{`
        .table-blue { width: 100%; border-collapse: collapse; }
        .table-blue th { background:#007BFF; color:#fff; text-align:left; padding:12px; border:1px solid #0056b3; }
        .table-blue td { padding:12px; border:1px solid #e5e7eb; color:#374151; }
        .table-blue tbody tr:nth-child(even){ background:#f9fafb; }
      `}</style>
      <table className="table-blue">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Title</th>
            <th>Total Marks</th>
            <th>Obtained Marks</th>
            <th>Due Date</th>
            <th>Submit File</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ padding: 16, textAlign: "center", color: "#6b7280" }}>
                No assignments yet
              </td>
            </tr>
          ) : (
            assignments.map((a) => (
              <tr key={a.srNo}>
                <td>{a.srNo}</td>
                <td>{a.title}</td>
                <td>{a.totalMarks}</td>
                <td>{a.obtainedMarks ?? '-'}</td>
                <td>{a.dueDate}</td>
                <td>
                  <button className="px-3 py-1 text-white rounded" style={{ background: "#007BFF" }}>Upload</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectAssignments;
