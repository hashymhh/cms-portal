import React from "react";

// Faculty Panel Icons - Orange/White/Beige Theme
// Matching Concordia College CMS color scheme

const FacultyIcons = {
  // Profile Icon - Orange circular design
  Profile: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" fill="#f28300"/>
      <circle cx="12" cy="10" r="4" fill="white"/>
      <path d="M5 19.5C5 16.5 8 14.5 12 14.5C16 14.5 19 16.5 19 19.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  // Course Modules Icon - Open Book (Orange theme)
  Course: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="18" rx="1.5" fill="#f28300"/>
      <path d="M2 3h20v18H2z" stroke="#d97200" strokeWidth="1"/>
      <path d="M12 3v18" stroke="#d97200" strokeWidth="1.5"/>
      <path d="M4 7h6M4 11h6M4 15h6" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M14 7h6M14 11h6M14 15h6" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M12 3c-1.5 0-2.5 1-2.5 2v16c0-1 1-2 2.5-2s2.5 1 2.5 2V5c0-1-1-2-2.5-2z" fill="#ff9d4d" stroke="#d97200" strokeWidth="0.8"/>
    </svg>
  ),

  // Lecture Schedule Icon - Calendar with Clock (Orange theme)
  Schedule: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="18" height="18" rx="2" fill="#f28300" stroke="#d97200" strokeWidth="1.5"/>
      <rect x="3" y="4" width="18" height="5" rx="2" fill="#ff9d4d"/>
      <path d="M16 2v4M8 2v4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M3 9h18" stroke="#d97200" strokeWidth="1.5"/>
      <circle cx="12" cy="15" r="4.5" fill="white" stroke="#d97200" strokeWidth="1"/>
      <path d="M12 13v2.5h1.5" stroke="#f28300" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="8" cy="13" r="0.8" fill="white"/>
      <circle cx="16" cy="13" r="0.8" fill="white"/>
    </svg>
  ),

  // Attendance Icon - Checklist (Orange theme)
  Attendance: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="2" width="16" height="20" rx="2" fill="white" stroke="#f28300" strokeWidth="1.8"/>
      <rect x="4" y="2" width="16" height="4" fill="#f28300"/>
      <circle cx="12" cy="4" r="1" fill="white"/>
      <path d="M7 10l2 2 4-4" stroke="#f28300" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="7" y="9" width="10" height="3" rx="0.5" fill="#fff5e6"/>
      <path d="M7 15l2 2 4-4" stroke="#ff9d4d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="7" y="14" width="10" height="3" rx="0.5" fill="#fff5e6"/>
      <rect x="7" y="19" width="10" height="1.5" rx="0.5" fill="#ffe4cc"/>
    </svg>
  ),

  // DateSheet Icon - Document with A+ (Orange theme)
  DateSheet: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="white" stroke="#f28300" strokeWidth="1.8"/>
      <path d="M14 2v6h6" fill="#ff9d4d" stroke="#f28300" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 13l2-4 2 4M9.5 12.5h5" stroke="#f28300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 16v-2M17 15h-4" stroke="#f28300" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="7" y="16" width="3" height="0.8" rx="0.4" fill="#f28300"/>
    </svg>
  ),

  // Students List Icon - Multiple People (Orange theme)
  Students: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="8" r="3" fill="#f28300"/>
      <ellipse cx="9" cy="17" rx="5" ry="3" fill="#f28300"/>
      <circle cx="16" cy="8" r="3" fill="#ff9d4d"/>
      <ellipse cx="16" cy="17" rx="5" ry="3" fill="#ff9d4d"/>
      <circle cx="9" cy="8" r="2" fill="white"/>
      <circle cx="16" cy="8" r="2" fill="white"/>
      <path d="M5 16c0-2 1.8-3 4-3s4 1 4 3" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M12 16c0-2 1.8-3 4-3s4 1 4 3" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
};

export default FacultyIcons;
