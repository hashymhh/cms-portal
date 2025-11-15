/* SubjectAnnouncements.jsx - Announcements tab for a subject (sample data) */
import React from "react";

const SubjectAnnouncements = ({ announcements = [] }) => {
  const items = announcements.length
    ? announcements
    : [
        { title: "Quiz on Friday", date: "2025-09-05", description: "Syllabus: Chapters 1-3" },
        { title: "Assignment Reminder", date: "2025-09-10", description: "Submit by portal" },
      ];

  return (
    <div className="space-y-3">
      {items.map((a, i) => (
        <div key={i} className="p-4 border rounded">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">{a.title}</h4>
            <span className="text-sm text-gray-500">{a.date}</span>
          </div>
          <p className="text-gray-700 mt-1">{a.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SubjectAnnouncements;
