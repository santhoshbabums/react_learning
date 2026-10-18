import { Sidebar } from './components/sideBar'
import { EmployeeTable } from './features/employees/EmployeeTable'
import { mockEmployees } from './features/employees/data/mockEmployee'
import './App.css'

function App() {
  const activeCount = mockEmployees.filter(
    (employee) => employee.status === 'Active',
  ).length

  const leaveCount = mockEmployees.filter(
    (employee) => employee.status === 'On leave',
  ).length

  const departmentCount = new Set(
    mockEmployees.map((employee) => employee.department),
  ).size

  return (
    <div className="app-shell" id="overview">
      <Sidebar />

      <main className="dashboard-main">
        <header className="page-heading">
          <p>PEOPLE OPERATIONS</p>
          <h1>Employee dashboard</h1>
          <span>A quick look at your team.</span>
        </header>

        <section className="summary-cards" aria-label="Employee summary">
          <article className="summary-card">
            <h2>Total employees</h2>
            <p>{mockEmployees.length}</p>
          </article>

          <article className="summary-card">
            <h2>Active</h2>
            <p>{activeCount}</p>
          </article>

          <article className="summary-card">
            <h2>On leave</h2>
            <p>{leaveCount}</p>
          </article>

          <article className="summary-card">
            <h2>Departments</h2>
            <p>{departmentCount}</p>
          </article>
        </section>

        <EmployeeTable employees={mockEmployees} />
      </main>
    </div>
  )
}

export default App