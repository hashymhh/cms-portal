/* 
 * Concordia College CMS - Left Sidebar Navigation Component
 * Supports Admin (orange/white), Student (orange/white), and Coordinator (black/orange) themes
 * Line-style SVG icons for modern, clean look
 */

import React, { useState } from "react";

const Sidebar = ({ activeMenu, onMenuChange, menuItems, userType = "admin" }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
          background: ${theme.bg};
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
          transition: width 0.3s ease;
          z-index: 1000;
          display: flex;
          flex-direction: column;
        }
        
        .sidebar-full {
          width: 260px;
        }
        
        .sidebar-collapsed {
          width: 70px;
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
        
        .toggle-btn {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 18px;
          padding: 4px;
          transition: transform 0.3s ease;
          align-self: flex-end;
          margin-top: -24px;
        }
        
        .toggle-btn:hover {
          transform: scale(1.1);
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
          transition: all 0.2s ease;
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
        }
        
        .menu-label {
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .sidebar-collapsed .menu-label {
          display: none;
        }
        
        .sidebar-collapsed .sidebar-logo-main,
        .sidebar-collapsed .sidebar-logo-sub {
          display: none;
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
        
        .sidebar-collapsed .sidebar-footer {
          display: none;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .concordia-sidebar {
            width: 70px;
          }
          
          .menu-label {
            display: none;
          }
          
          .sidebar-logo-main,
          .sidebar-logo-sub {
            display: none;
          }
          
          .sidebar-footer {
            display: none;
          }
        }
      `}</style>

      <div className={`concordia-sidebar ${isCollapsed ? 'sidebar-collapsed' : 'sidebar-full'}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo-main">Concordia</div>
          <div className="sidebar-logo-sub">
            {userType === "coordinator" ? "Coordinator Panel" : 
             userType === "student" ? "Student Portal" : 
             userType === "faculty" ? "Faculty Panel" : 
             "Admin Panel"}
          </div>
          <button 
            className="toggle-btn" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? '☰' : '✕'}
          </button>
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
