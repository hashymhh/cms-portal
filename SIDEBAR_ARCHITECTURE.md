# Concordia College CMS - Sidebar Navigation Architecture

## Component Hierarchy

```
Student Portal
│
├── Home.jsx (Main Container)
│   │
│   ├── Sidebar.jsx (Navigation Component)
│   │   ├── Header (Concordia CMS logo + Toggle)
│   │   ├── Menu Items
│   │   │   ├── Profile (👤)
│   │   │   ├── Course (📚)
│   │   │   ├── TimeTable (📅)
│   │   │   ├── DateSheet (📋)
│   │   │   ├── Calender (🗓️)
│   │   │   ├── FeedBack (💬)
│   │   │   └── Fee Voucher (💰)
│   │   └── Footer (© 2025 Concordia College)
│   │
│   └── Main Content Area (Right side)
│       └── Dynamic Component Rendering
│           ├── Profile.jsx (Personal + Academic Info)
│           ├── Course.jsx (Subjects + Assignments)
│           ├── Timetable.jsx (Weekly Schedule)
│           ├── DateSheet.jsx (Exam Dates)
│           ├── Calender.jsx (Academic Calendar)
│           ├── FeedBack.jsx (Feedback Form)
│           └── FeeVoucher.jsx (Fee Payments)
```

## Data Flow

```
User Click → handleMenuClick(menuId) → setSelectedMenu(menuId) → 
navigate(`/student?page=${menuId}`) → URL Updates → 
useEffect detects change → Component Renders
```

## Sidebar Component API

### Props
```typescript
interface SidebarProps {
  activeMenu: string;              // Current active menu ID
  onMenuChange: (menuId: string) => void;  // Callback when menu clicked
  menuItems: MenuItem[];           // Array of menu items
}

interface MenuItem {
  id: string;        // Unique identifier
  label: string;     // Display text
  icon?: string;     // Emoji or icon
  component: React.Component | null;  // Page component
}
```

### State Management
```javascript
const [isCollapsed, setIsCollapsed] = useState(false);

// Toggle sidebar width
// false → 260px (full)
// true → 70px (collapsed)
```

## Styling Architecture

### CSS Classes (in Sidebar.jsx)
```css
.concordia-sidebar       → Main container (fixed, full-height)
.sidebar-full           → Width: 260px
.sidebar-collapsed      → Width: 70px
.sidebar-header         → Orange gradient header
.sidebar-menu           → Scrollable menu area
.menu-item              → Individual menu item
.menu-item.active       → Orange background (#FF6B35)
.menu-item:hover        → Light orange hover (#FFF5F2)
.sidebar-footer         → Copyright footer
```

### Color Palette
```javascript
const COLORS = {
  primaryOrange: '#FF6B35',    // Active states, headers
  lightOrange: '#FFF5F2',      // Hover states
  white: '#FFFFFF',            // Background
  darkGray: '#333333',         // Text
  lightGray: '#e5e7eb',        // Borders
  shadowOrange: 'rgba(255, 107, 53, 0.3)'  // Box shadows
};
```

## Responsive Breakpoints

```css
/* Desktop: Full sidebar */
@media (min-width: 769px) {
  .concordia-sidebar { width: 260px; }
  .menu-label { display: block; }
}

/* Mobile: Collapsed sidebar */
@media (max-width: 768px) {
  .concordia-sidebar { width: 70px; }
  .menu-label { display: none; }
  .sidebar-logo { display: none; }
  .sidebar-footer { display: none; }
}
```

## State Management Flow

### In Home.jsx
```javascript
// 1. Initialize state
const [selectedMenu, setSelectedMenu] = useState("profile");

// 2. Handle menu clicks
const handleMenuClick = (menuId) => {
  setSelectedMenu(menuId);          // Update local state
  navigate(`/student?page=${menuId}`);  // Update URL
};

// 3. Sync with URL on load
useEffect(() => {
  const urlParams = new URLSearchParams(location.search);
  const pathMenuId = urlParams.get("page") || "profile";
  setSelectedMenu(pathMenuId);
}, [location.pathname]);

// 4. Render content based on state
const renderContent = () => {
  if (selectedMenu === "profile") {
    return <Profile profileData={profileData} />;
  }
  
  const MenuItem = MENU_ITEMS.find(
    item => item.label.toLowerCase() === selectedMenu.toLowerCase()
  )?.component;
  
  return MenuItem && <MenuItem />;
};
```

## Page Layout Structure

```html
┌─────────────────────────────────────────────────┐
│ Browser Window (100vw x 100vh)                  │
│ ┌──────────┬──────────────────────────────────┐ │
│ │          │                                  │ │
│ │ Sidebar  │  Main Content Area               │ │
│ │ (260px)  │  (margin-left: 260px)            │ │
│ │          │                                  │ │
│ │ Fixed    │  Scrollable                      │ │
│ │ Position │                                  │ │
│ │          │  ┌────────────────────────────┐  │ │
│ │ [Logo]   │  │  Header                    │  │ │
│ │          │  ├────────────────────────────┤  │ │
│ │ • Menu 1 │  │                            │  │ │
│ │ • Menu 2 │  │  Page Content              │  │ │
│ │ • Menu 3 │  │                            │  │ │
│ │ ...      │  │                            │  │ │
│ │          │  └────────────────────────────┘  │ │
│ │ [Footer] │                                  │ │
│ │          │                                  │ │
│ └──────────┴──────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

## Menu Item Rendering Logic

```jsx
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
```

## Component Interaction Diagram

```
┌─────────────┐
│   User      │
│   Click     │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Sidebar.jsx     │
│ onMenuChange()  │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Home.jsx        │
│ handleMenuClick │
└──────┬──────────┘
       │
       ├─────► setSelectedMenu(menuId)
       │
       ├─────► navigate('/student?page=...')
       │
       ▼
┌─────────────────┐
│ URL Updates     │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ useEffect()     │
│ Detects Change  │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ renderContent() │
│ Shows Component │
└─────────────────┘
```

## File Dependencies

```
Sidebar.jsx
  → Uses: React, useState
  → Exports: Sidebar component
  → No external dependencies

Home.jsx
  → Imports: Sidebar, Profile, Course, DateSheet, etc.
  → Uses: useEffect, useState, useNavigate, useLocation
  → Manages: Menu state, navigation, content rendering

Profile.jsx
  → Receives: profileData prop
  → Uses: useState (for password update modal)
  → Independent of sidebar (decoupled)

Course.jsx, DateSheet.jsx, etc.
  → Standalone components
  → No dependencies on sidebar
  → Self-contained styling
```

## Performance Optimizations

1. **Memoization Opportunities**
   ```javascript
   const menuItems = useMemo(() => MENU_ITEMS, []);
   ```

2. **Lazy Loading**
   ```javascript
   const Course = React.lazy(() => import('./Course'));
   const DateSheet = React.lazy(() => import('./DateSheet'));
   ```

3. **Event Delegation**
   - Single onClick handler on menu container
   - Use event.target to determine clicked item

4. **CSS Transitions**
   - Hardware-accelerated (transform, opacity)
   - Smooth 0.3s ease transitions

## Accessibility Features

### Current
- ✅ Semantic HTML (`<nav>`, `<ul>`, `<li>`)
- ✅ `title` attributes for collapsed state
- ✅ Clear focus states on hover

### Recommended
- ⚠️ Add `aria-label` to sidebar nav
- ⚠️ Add `aria-current="page"` to active link
- ⚠️ Keyboard navigation (Tab, Enter)
- ⚠️ Screen reader announcements

## Testing Scenarios

### Unit Tests
```javascript
describe('Sidebar', () => {
  it('renders all menu items', () => {});
  it('highlights active menu', () => {});
  it('calls onMenuChange when clicked', () => {});
  it('collapses/expands on toggle', () => {});
});
```

### Integration Tests
```javascript
describe('Navigation Flow', () => {
  it('navigates to Profile on click', () => {});
  it('updates URL correctly', () => {});
  it('renders correct component', () => {});
  it('persists state on refresh', () => {});
});
```

### Visual Regression Tests
- Sidebar width (260px full, 70px collapsed)
- Active state color (#FF6B35)
- Hover effects
- Mobile responsiveness (<768px)

---
**Architecture**: React Functional Components
**State Management**: Local useState + URL params
**Styling**: CSS-in-JS (inline styles in component)
**Routing**: React Router (useNavigate, useLocation)
**Theme**: Orange (#FF6B35) + White
**Status**: ✅ Production Ready (MVP)
