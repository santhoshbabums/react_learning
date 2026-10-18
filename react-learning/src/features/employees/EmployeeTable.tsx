import type { Employee } from './types'

interface EmployeeTableProps {
  employees: Employee[]
}

export function EmployeeTable({ employees }: EmployeeTableProps) {
  return (
    <section aria-labelledby="employee-directory-heading">
      <h2 id="employee-directory-heading">Employee directory</h2>

      <table>
        <thead>
          <tr>
            <th scope="col">Employee</th>
            <th scope="col">Department</th>
            <th scope="col">Status</th>
            <th scope="col">Location</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <strong>{employee.name}</strong>
                <br />
                {employee.role}
              </td>
              <td>{employee.department}</td>
              <td>{employee.status}</td>
              <td>{employee.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}