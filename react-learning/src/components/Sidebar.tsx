const navigationItems = [
  'Overview',
  'Employees',
  'Departments',
  'Time off',
  'Reports',
]

export function Sidebar() {
  return (
    <aside className="sidebar">
      <a className="brand" href="#overview">
        People Desk
      </a>

      <nav aria-label="Main navigation">
        <ul className="navigation-list">
          {navigationItems.map((item, index) => (
            <li key={item}>
              <a
                className={index === 0 ? 'navigation-link is-active' : 'navigation-link'}
                href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
                aria-current={index === 0 ? 'page' : undefined}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}