import { NavLink } from 'react-router-dom'

const navigationItems = [
  { label: 'Overview', to: '/' },
  { label: 'Employees', to: '/employees' },
  { label: 'Departments', to: '/departments' },
]

export function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink className="brand" to="/">
        People Desk
      </NavLink>

      <nav aria-label="Main navigation">
        <ul className="navigation-list">
          {navigationItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive ? 'navigation-link is-active' : 'navigation-link'
                }
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}