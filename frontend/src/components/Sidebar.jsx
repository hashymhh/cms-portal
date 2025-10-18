/* 
 * Concordia College CMS - Left Sidebar Navigation Component
 * Based on PDF Page 2 Design - Orange/White Theme
 * Module Names: Profile, Course, TimeTable, DateSheet, Calender, FeedBack, Fee Voucher
 */

import React, { useState } from "react";

const Sidebar = ({ activeMenu, onMenuChange, menuItems }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <style>{`
        .concordia-sidebar {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          background: white;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
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
          padding: 18px 16px;
          border-bottom: 2px solid #FF6B35;
          background: linear-gradient(135deg, #FF6B35 0%, #ff8555 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .sidebar-logo {
          font-size: 18px;
          font-weight: bold;
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
        }
        
        .toggle-btn:hover {
          transform: scale(1.1);
        }
        
        .sidebar-menu {
          flex: 1;
          overflow-y: auto;
          padding: 12px 0;
          list-style: none;
          margin: 0;
        }
        
        .sidebar-menu::-webkit-scrollbar {
          width: 6px;
        }
        
        .sidebar-menu::-webkit-scrollbar-thumb {
          background: #FF6B35;
          border-radius: 3px;
        }
        
        .menu-item {
          margin: 4px 10px;
          padding: 11px 14px;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #333;
          border: 2px solid transparent;
          white-space: nowrap;
        }
        
        .menu-item:hover {
          background: #FFF5F2;
          border-color: #FF6B35;
          transform: translateX(5px);
        }
        
        .menu-item.active {
          background: #FF6B35;
          color: white;
          border-color: #FF6B35;
          box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
        }
        
        .menu-icon {
          font-size: 18px;
          min-width: 18px;
          text-align: center;
        }
        
        .menu-label {
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .sidebar-collapsed .menu-label {
          display: none;
        }
        
        .sidebar-collapsed .sidebar-logo {
          display: none;
        }
        
        .sidebar-footer {
          padding: 12px;
          border-top: 1px solid #e5e7eb;
          font-size: 11px;
          color: #666;
          text-align: center;
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
          
          .sidebar-logo {
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
          <div className="sidebar-logo">Concordia CMS</div>
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
          © 2025 Concordia College
        </div>
      </div>
    </>
  );
};

export default Sidebar;
