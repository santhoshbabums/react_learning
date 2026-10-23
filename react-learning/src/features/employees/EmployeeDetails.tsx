import { Link, useParams } from 'react-router-dom'
import type { Employee } from './types'

interface EmployeeDetailsProps {
  employees: Employee[]
}

export function EmployeeDetails({ employees }: EmployeeDetailsProps) {
  const { employeeId } = useParams()
  const employee = employees.find(
    (item) => item.id === Number(employeeId),
  )

  if (!employee) {
    return (
      <main className="employee-details empty-state">
        <div className="details-card">
          <p className="eyebrow">Employee profile</p>
          <h1>Employee not found</h1>
          <Link className="back-link" to="/">Back to dashboard</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="employee-details">
      <div className="details-card">
        <div className="details-header">
          <div className="profile-badge">{employee.initials}</div>
          <div>
            <p className="eyebrow">Employee profile</p>
            <h1>{employee.name}</h1>
            <p className="role-line">{employee.role}</p>
          </div>
        </div>

        <div className="details-topbar">
          <span className={`status-badge status-${employee.status.toLowerCase().replace(/\s+/g, '-')}`}>
            {employee.status}
          </span>
          <Link className="back-link" to="/">Back to dashboard</Link>
        </div>

        <dl className="employee-meta">
          <div className="meta-item">
            <dt>Department</dt>
            <dd>{employee.department}</dd>
          </div>

          <div className="meta-item">
            <dt>Email</dt>
            <dd>{employee.email}</dd>
          </div>

          <div className="meta-item">
            <dt>Location</dt>
            <dd>{employee.location}</dd>
          </div>

          <div className="meta-item">
            <dt>Status</dt>
            <dd>{employee.status}</dd>
          </div>
        </dl>
      </div>
    </main>
  )
}