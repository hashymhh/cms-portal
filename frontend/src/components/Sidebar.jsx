/* 
 * Concordia College CMS - Left Sidebar Navigation Component
 * Supports Admin (orange/white), Student (orange/white), and Coordinator (black/orange) themes
 * Line-style SVG icons for modern, clean look
 */

import React from "react";

const Sidebar = ({ activeMenu, onMenuChange, menuItems, userType = "admin" }) => {
  // Theme configurations
  const themes = {
    admin: {
      bg: "white",
      headerBg: "linear-gradient(135deg, #f28300 0%, #ff9d4d 100%)",
      headerBorder: "#f28300",
      menuBg: "white",
      menuColor: "#333",
      menuHoverBg: "#fff5e6",
      menuHoverBorder: "#f28300",
      activeBg: "#f28300",
      activeColor: "white",
      scrollThumb: "#f28300",
      footerBorder: "#e5e7eb",
      footerColor: "#666",
    },
    student: {
      bg: "white",
      headerBg: "linear-gradient(135deg, #f28300 0%, #ff9d4d 100%)",
      headerBorder: "#f28300",
      menuBg: "white",
      menuColor: "#333",
      menuHoverBg: "#fff5e6",
      menuHoverBorder: "#f28300",
      activeBg: "#f28300",
      activeColor: "white",
      scrollThumb: "#f28300",
      footerBorder: "#e5e7eb",
      footerColor: "#666",
    },
    coordinator: {
      bg: "white",
      headerBg: "linear-gradient(135deg, #f28300 0%, #ff9d4d 100%)",
      headerBorder: "#f28300",
      menuBg: "white",
      menuColor: "#333",
      menuHoverBg: "#fff5e6",
      menuHoverBorder: "#f28300",
      activeBg: "#f28300",
      activeColor: "white",
      scrollThumb: "#f28300",
      footerBorder: "#e5e7eb",
      footerColor: "#666",
    },
    faculty: {
      bg: "#f7e6af",
      headerBg: "linear-gradient(135deg, #f28300 0%, #ff9d4d 100%)",
      headerBorder: "#f28300",
      menuBg: "#f7e6af",
      menuColor: "#333",
      menuHoverBg: "#ffe4a8",
      menuHoverBorder: "#f28300",
      activeBg: "#f28300",
      activeColor: "white",
      scrollThumb: "#f28300",
      footerBorder: "#e5c77b",
      footerColor: "#666",
    },
  };

  const theme = themes[userType] || themes.admin;

  return (
    <>
      <style>{`
        .concordia-sidebar {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          width: 260px;
          background: ${theme.bg};
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
          z-index: 1000;
          display: flex;
          flex-direction: column;
        }
        .sidebar-header {
          padding: 20px 16px;
          border-bottom: 2px solid ${theme.headerBorder};
          background: ${theme.headerBg};
          color: white;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .sidebar-logo-main {
          font-size: 20px;
          font-weight: bold;
          color: ${userType === "coordinator" ? "white" : "white"};
          white-space: nowrap;
          overflow: hidden;
        }
        
        .sidebar-logo-sub {
          font-size: 12px;
          font-weight: 400;
          color: white;
          white-space: nowrap;
          overflow: hidden;
        }
        
        .sidebar-menu {
          flex: 1;
          overflow-y: auto;
          padding: 16px 0;
          list-style: none;
          margin: 0;
        }
        
        .sidebar-menu::-webkit-scrollbar {
          width: 6px;
        }
        
        .sidebar-menu::-webkit-scrollbar-thumb {
          background: ${theme.scrollThumb};
          border-radius: 3px;
        }
        
        .menu-item {
          margin: 6px 12px;
          padding: 12px 14px;
          cursor: pointer;
          border-radius: 8px;
          transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          font-weight: 500;
          color: ${theme.menuColor};
          border: 1px solid transparent;
          white-space: nowrap;
        }
        
        .menu-item:hover {
          background: ${theme.menuHoverBg};
          border-color: ${theme.menuHoverBorder};
          transform: translateX(6px);
          box-shadow: 0 6px 18px rgba(16,24,40,0.04);
        }
        
        .menu-item.active {
          background: ${theme.activeBg};
          color: ${theme.activeColor};
          border-color: ${theme.activeBg};
          box-shadow: 0 2px 8px rgba(255, 69, 0, 0.4);
        }
        
        .menu-icon {
          min-width: 20px;
          height: 20px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .menu-icon svg {
          width: 20px;
          height: 20px;
          stroke: currentColor;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform 0.22s ease, color 0.18s ease;
        }
        .menu-item:hover .menu-icon svg { transform: scale(1.08); color: ${theme.menuHoverBorder}; }
        
        .menu-label {
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .sidebar-footer {
          padding: 16px 12px;
          border-top: 1px solid ${theme.footerBorder};
          font-size: 11px;
          color: ${theme.footerColor};
          text-align: center;
          line-height: 1.4;
        }
        
        .sidebar-footer-main {
          font-weight: 600;
          color: ${theme.footerColor};
        }
        
        .sidebar-footer-sub {
          font-size: 10px;
          color: ${theme.footerColor};
          margin-top: 2px;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .concordia-sidebar { width: 260px; }
        }
      `}</style>

      <div className="concordia-sidebar">
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo-main">Concordia</div>
          <div className="sidebar-logo-sub">
            {userType === "coordinator" ? "Coordinator Panel" : 
             userType === "student" ? "Student Portal" : 
             userType === "faculty" ? "Faculty Panel" : 
             "Admin Panel"}
          </div>
        </div>

        {/* Menu Items */}
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
              onClick={() => onMenuChange(item.id)}
              title={item.label}
            >
              <span className="menu-icon">{item.icon || '📄'}</span>
              <span className="menu-label">{item.label}</span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-footer-main">Concordia College</div>
          <div className="sidebar-footer-sub">Township Campus</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
