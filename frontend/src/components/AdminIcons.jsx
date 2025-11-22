import React from "react";

// Admin Panel Icons - Orange/White/Beige Theme
// Matching Concordia College CMS color scheme

const AdminIcons = {
  // Dashboard Icon - Computer/Monitor (Orange theme)
  Dashboard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="14" rx="1.5" fill="white" stroke="#f28300" strokeWidth="1.8"/>
      <rect x="2" y="3" width="20" height="2" fill="#f28300"/>
      <path d="M8 20h8" stroke="#f28300" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 17v3" stroke="#f28300" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="6" cy="5" r="0.5" fill="white"/>
      <circle cx="8" cy="5" r="0.5" fill="white"/>
      <circle cx="10" cy="5" r="0.5" fill="white"/>
      <rect x="5" y="8" width="6" height="6" rx="0.5" fill="#fff5e6" stroke="#f28300" strokeWidth="0.8"/>
      <rect x="13" y="8" width="6" height="2.5" rx="0.5" fill="#ffe4cc"/>
      <rect x="13" y="11.5" width="6" height="2.5" rx="0.5" fill="#ffe4cc"/>
    </svg>
  ),

  // Departments Icon - Building (Orange theme)
  Departments: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="2" width="16" height="20" rx="1" fill="#f28300"/>
      <rect x="4" y="2" width="16" height="3" fill="#ff9d4d"/>
      <rect x="7" y="7" width="3" height="3" rx="0.5" fill="white"/>
      <rect x="14" y="7" width="3" height="3" rx="0.5" fill="white"/>
      <rect x="7" y="12" width="3" height="3" rx="0.5" fill="white"/>
      <rect x="14" y="12" width="3" height="3" rx="0.5" fill="white"/>
      <rect x="10" y="17" width="4" height="5" fill="white"/>
      <circle cx="12" cy="3.5" r="0.8" fill="white"/>
    </svg>
  ),

  // User Management Icon - Multiple People with Gear (Orange theme)
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="7" r="3" fill="#f28300"/>
      <ellipse cx="8" cy="16" rx="5" ry="3" fill="#f28300"/>
      <circle cx="16" cy="7" r="3" fill="#ff9d4d"/>
      <ellipse cx="16" cy="16" rx="5" ry="3" fill="#ff9d4d"/>
      <circle cx="8" cy="7" r="2" fill="white"/>
      <circle cx="16" cy="7" r="2" fill="white"/>
      <path d="M4 15c0-2 1.8-3 4-3s4 1 4 3" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M12 15c0-2 1.8-3 4-3s4 1 4 3" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
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

  // Reports & Analytics Icon - Bar Chart with Arrow (Orange theme)
  Reports: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="14" width="3" height="8" rx="0.5" fill="#f28300"/>
      <rect x="9" y="10" width="3" height="12" rx="0.5" fill="#ff9d4d"/>
      <rect x="14" y="6" width="3" height="16" rx="0.5" fill="#f28300"/>
      <rect x="19" y="8" width="3" height="14" rx="0.5" fill="#ff9d4d"/>
      <path d="M2 3l5 5 4-4 6 6 5-5" stroke="#f28300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="2" cy="3" r="1.5" fill="#f28300"/>
      <circle cx="7" cy="8" r="1.5" fill="#ff9d4d"/>
      <circle cx="11" cy="4" r="1.5" fill="#f28300"/>
      <circle cx="17" cy="10" r="1.5" fill="#ff9d4d"/>
      <circle cx="22" cy="5" r="1.5" fill="#f28300"/>
    </svg>
  ),

  // Finance Icon - Money/Bills (Orange theme)
  Finance: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="20" height="12" rx="1.5" fill="#f28300" stroke="#d97200" strokeWidth="1.5"/>
      <rect x="2" y="8" width="20" height="3" fill="#ff9d4d"/>
      <rect x="5" y="13" width="14" height="1.5" rx="0.5" fill="white"/>
      <rect x="5" y="16" width="10" height="1" rx="0.5" fill="white"/>
      <rect x="4" y="4" width="16" height="2" rx="0.5" fill="#ffe4cc"/>
      <rect x="6" y="2" width="12" height="2" rx="0.5" fill="#ffd9b3"/>
    </svg>
  ),

  // Announcements Icon - Megaphone (Orange theme)
  Announcements: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 11c0-1 0-2 1.5-2h3l6-5v16l-6-5h-3c-1.5 0-1.5-1-1.5-2v-2z" fill="#f28300" stroke="#d97200" strokeWidth="1.2"/>
      <path d="M15 8c1 1 2 2.5 2 4s-1 3-2 4" stroke="#f28300" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 6c1.5 1.5 3 3.5 3 6s-1.5 4.5-3 6" stroke="#ff9d4d" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="7" cy="11" rx="2" ry="3" fill="white" opacity="0.3"/>
      <path d="M8 15l-2 6h3l1-6" fill="#ff9d4d" stroke="#d97200" strokeWidth="0.8"/>
    </svg>
  ),

  // Settings Icon - Gears (Orange theme)
  Settings: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="3" fill="white" stroke="#f28300" strokeWidth="1.5"/>
      <circle cx="10" cy="10" r="1.5" fill="#f28300"/>
      <path d="M10 2v2M10 18v2M2 10h2M18 10h2M4.93 4.93l1.41 1.41M15.66 15.66l1.41 1.41M4.93 15.07l1.41-1.41M15.66 6.34l1.41-1.41" stroke="#f28300" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="17" cy="17" r="2.5" fill="white" stroke="#ff9d4d" strokeWidth="1.5"/>
      <circle cx="17" cy="17" r="1.2" fill="#ff9d4d"/>
      <path d="M17 13v1M17 20v1M13 17h1M20 17h1M14.5 14.5l0.7 0.7M18.8 18.8l0.7 0.7M14.5 19.5l0.7-0.7M18.8 15.2l0.7-0.7" stroke="#ff9d4d" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
};

export default AdminIcons;
