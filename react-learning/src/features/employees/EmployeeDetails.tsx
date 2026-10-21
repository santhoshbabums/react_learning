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
      <main>
        <h1>Employee not found</h1>
        <Link to="/">Back to dashboard</Link>
      </main>
    )
  }

  return (
    <main className="employee-details">
      <Link to="/">Back to dashboard</Link>
      <h1>{employee.name}</h1>
      <p>{employee.role}</p>

      <dl>
        <dt>Department</dt>
        <dd>{employee.department}</dd>

        <dt>Email</dt>
        <dd>{employee.email}</dd>

        <dt>Location</dt>
        <dd>{employee.location}</dd>

        <dt>Status</dt>
        <dd>{employee.status}</dd>
      </dl>
    </main>
  )
}