import React from "react";

// Student Panel Icons - Orange/White/Beige Theme
// Matching Concordia College CMS color scheme

const StudentIcons = {
  // Profile Icon - Orange circular design matching your attachment
  Profile: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" fill="#f28300"/>
      <circle cx="12" cy="10" r="4" fill="white"/>
      <path d="M5 19.5C5 16.5 8 14.5 12 14.5C16 14.5 19 16.5 19 19.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  // Course Icon - Open Book (Orange theme)
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

  // Timetable Icon - Calendar with Clock (Orange theme)
  Timetable: () => (
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

  // Calendar Icon - Month view (Orange theme)
  Calendar: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="18" height="17" rx="2" fill="white" stroke="#f28300" strokeWidth="1.8"/>
      <rect x="3" y="5" width="18" height="5" fill="#f28300"/>
      <path d="M8 3v4M16 3v4" stroke="#f28300" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M3 10h18" stroke="#f28300" strokeWidth="1.5"/>
      <rect x="6" y="13" width="3" height="2.5" rx="0.5" fill="#f28300"/>
      <rect x="10.5" y="13" width="3" height="2.5" rx="0.5" fill="#ff9d4d"/>
      <rect x="15" y="13" width="3" height="2.5" rx="0.5" fill="#ff9d4d"/>
      <rect x="6" y="17" width="3" height="2.5" rx="0.5" fill="#ff9d4d"/>
      <rect x="10.5" y="17" width="3" height="2.5" rx="0.5" fill="#ff9d4d"/>
    </svg>
  ),

  // Feedback Icon - Star in speech bubble (Orange theme)
  Feedback: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" fill="#f28300" stroke="#d97200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 8l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5L7 11.5l3.5-.5L12 8z" fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round"/>
    </svg>
  ),

  // FeeVoucher Icon - Receipt/Document with lines (Orange theme)
  FeeVoucher: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill="white" stroke="#f28300" strokeWidth="1.8"/>
      <rect x="7" y="7" width="10" height="2" rx="0.5" fill="#f28300"/>
      <rect x="7" y="11" width="7" height="1.5" rx="0.5" fill="#ff9d4d"/>
      <rect x="7" y="14" width="7" height="1.5" rx="0.5" fill="#ff9d4d"/>
      <rect x="7" y="17" width="10" height="1.5" rx="0.5" fill="#f28300"/>
      <circle cx="17" cy="12" r="1" fill="#f28300"/>
      <circle cx="17" cy="15" r="1" fill="#f28300"/>
    </svg>
  ),
};

export default StudentIcons;
