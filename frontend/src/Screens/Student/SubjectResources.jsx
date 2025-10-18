/* SubjectResources.jsx - Resources tab for a subject (orange/cream empty state) */
import React from "react";

const SubjectResources = ({ resources = [] }) => {
  return (
    <div>
      <style>{`
        .resource-item { padding: 10px 12px; border: 1px solid #e5e7eb; border-radius: 8px; background: #fff; }
      `}</style>
      {resources.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 18, background: '#FFE9C7', borderRadius: 12, color: '#6b7280', fontWeight: 700 }}>
          No Record found
        </div>
      ) : (
        <div className="space-y-3">
          {resources.map((r, idx) => (
            <div key={idx} className="resource-item flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-800">{r.title}</div>
                <div className="text-sm text-gray-500">{r.type}</div>
              </div>
              <a href={r.url} className="text-blue-600 hover:underline">Open</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectResources;
