# 🎨 Modern UI Quick Reference Cheat Sheet

## Essential Classes at a Glance

### 📦 Cards
| Class | Purpose |
|-------|---------|
| `.panel-card` | Main container with shadow & hover |
| `.ui-card` | Smaller card component |
| `.panel-card.glass` | Glassmorphism effect |
| `.card-header` | Orange gradient header |
| `.card-header.gradient-blue-purple` | Blue-purple gradient |
| `.card-header.gradient-orange-red` | Orange-red gradient |

### 📊 Stats & Metrics
| Class | Purpose |
|-------|---------|
| `.stats-grid` | Grid layout for stat cards |
| `.stat-card` | Individual stat card |
| `.stat-card-icon.orange` | Orange icon background |
| `.stat-card-icon.blue` | Blue icon background |
| `.stat-card-icon.purple` | Purple icon background |
| `.stat-card-icon.green` | Green icon background |
| `.stat-value` | Large number display |
| `.stat-label` | Muted label text |
| `.stat-trend.up` | Green upward trend |
| `.stat-trend.down` | Red downward trend |

### 🔘 Buttons
| Class | Purpose |
|-------|---------|
| `.btn.btn-primary` | Orange gradient button |
| `.btn.btn-secondary` | Blue-purple gradient button |
| `.btn.btn-outline` | Transparent with border |
| `.btn.btn-ghost` | Minimal transparent button |
| `.icon-btn` | Circular icon button |

### 📋 Tables
| Class | Purpose |
|-------|---------|
| `.data-table` | Modern styled table |
| `th.sortable` | Clickable sort header |
| `.table-actions` | Action button container |
| `.table-action-btn.view` | Blue view button |
| `.table-action-btn.edit` | Blue edit button |
| `.table-action-btn.delete` | Red delete button |

### 📝 Forms
| Class | Purpose |
|-------|---------|
| `.form-group` | Form field wrapper |
| `.form-label` | Field label |
| `.form-input` | Text input |
| `.form-select` | Dropdown select |
| `.form-textarea` | Multi-line text |
| `.input-focus` | Add focus animation |

### 🏷️ Badges & Status
| Class | Purpose |
|-------|---------|
| `.status-badge.success` | Green success badge |
| `.status-badge.warning` | Yellow warning badge |
| `.status-badge.danger` | Red danger badge |
| `.status-badge.info` | Blue info badge |
| `.status-badge.primary` | Orange primary badge |

### 🚨 Alerts
| Class | Purpose |
|-------|---------|
| `.alert.success` | Green success alert |
| `.alert.warning` | Yellow warning alert |
| `.alert.danger` | Red danger alert |
| `.alert.info` | Blue info alert |

### ✨ Animations
| Class | Purpose |
|-------|---------|
| `.scroll-reveal` | Fade in on scroll |
| `.fade-in` | Fade in on load |
| `.slide-down` | Slide down on load |
| `.parallax-section` | Parallax container |
| `.parallax-bg` | Parallax background |

### 🎯 Utilities
| Class | Purpose |
|-------|---------|
| `.tooltip` | Hover tooltip (use with `data-tooltip`) |
| `.spinner` | Loading spinner |
| `.spinner.sm` | Small spinner |
| `.spinner.lg` | Large spinner |
| `.progress-bar` | Progress container |
| `.progress-fill` | Progress bar fill |
| `.sr-only` | Screen reader only |

---

## 🔥 Most Common Patterns

### Dashboard Stats
```jsx
<div className="stats-grid">
  <div className="stat-card scroll-reveal">
    <div className="stat-card-icon orange">👥</div>
    <div className="stat-value">1,234</div>
    <div className="stat-label">Total Students</div>
    <div className="stat-trend up">↑ 12%</div>
  </div>
</div>
```

### Data Table
```jsx
<table className="data-table">
  <thead>
    <tr>
      <th className="sortable">Name</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td><span className="status-badge success">Active</span></td>
      <td>
        <div className="table-actions">
          <button className="table-action-btn view">👁️</button>
          <button className="table-action-btn edit">✏️</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
```

### Form
```jsx
<div className="form-group">
  <label className="form-label">Name</label>
  <input className="form-input input-focus" type="text" />
</div>
<button className="btn btn-primary">Submit</button>
```

### Card with Header
```jsx
<div className="panel-card scroll-reveal">
  <div className="card-header">
    <h2>
      <span className="card-header-icon">📊</span>
      Dashboard
    </h2>
  </div>
  <p>Content here</p>
</div>
```

---

## 🎨 Color Variables

```css
--primary-color: #f28300
--primary-gradient: linear-gradient(135deg, #f28300 0%, #ff9d4d 100%)
--accent-blue: #4A90E2
--accent-purple: #7c3aed
--bg-light: #F9F9F9
--bg-white: #ffffff
--text-dark: #1f2937
--text-muted: #6b7280
```

---

## 🛠️ JavaScript Functions

```javascript
// Notifications
window.modernCMS.showNotification(message, type, duration);
// Types: 'success', 'warning', 'danger', 'info'

// Loading
window.modernCMS.showLoading(message);
window.modernCMS.hideLoading();

// Confirm Dialog
window.modernCMS.confirm(message, onConfirm, onCancel);

// Dark Mode
window.modernCMS.toggleDarkMode();

// Animate Counter
window.modernCMS.animateCounter(element, targetValue, duration);

// Format Currency
window.modernCMS.formatCurrency(amount); // Returns "PKR 50,000"

// Format Date
window.modernCMS.formatDate(date); // Returns "November 3, 2024"
```

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All grid layouts automatically adapt!

---

## ⚡ Quick Tips

1. Add `scroll-reveal` to anything for fade-in on scroll
2. Use `data-tooltip="Your text"` for instant tooltips
3. Dark mode works automatically - just toggle!
4. All buttons get ripple effect automatically
5. Tables are sortable if you add `.sortable` to `<th>`
6. Use `.stats-grid` for automatic responsive grid
7. All animations respect reduced-motion preferences

---

## 🎯 Copy-Paste Starter Template

```jsx
<div className="panel-card scroll-reveal">
  {/* Header */}
  <div className="card-header">
    <h2>
      <span className="card-header-icon">📊</span>
      Section Title
    </h2>
  </div>

  {/* Stats Grid */}
  <div className="stats-grid">
    <div className="stat-card">
      <div className="stat-card-icon orange">📈</div>
      <div className="stat-value">1,234</div>
      <div className="stat-label">Metric Name</div>
    </div>
  </div>

  {/* Data Table */}
  <table className="data-table" style={{marginTop:24}}>
    <thead>
      <tr>
        <th className="sortable">Column 1</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Data</td>
        <td><span className="status-badge success">Active</span></td>
        <td>
          <div className="table-actions">
            <button className="table-action-btn view">👁️</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  {/* Actions */}
  <div style={{marginTop:24, display:'flex', gap:12}}>
    <button className="btn btn-primary">
      <span>Primary Action</span>
      <span>➕</span>
    </button>
    <button className="btn btn-outline">Secondary</button>
  </div>
</div>
```

---

**Print this page and keep it handy! 📌**
