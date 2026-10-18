import type { Employee } from './types'
import { useState } from 'react'
import './EmployeeTable.css'

interface EmployeeTableProps {
    employees: Employee[]
}


export function EmployeeTable({ employees }: EmployeeTableProps) {

    const [searchName, setSearchName] = useState('')
    const [selectedDepartment, setSelectedDepartment] = useState('All')
    const [selectedStatus, setSelectedStatus] = useState('All')
    const statuses = ['Active', 'On leave', 'Probation']

    const departments = [
        ...new Set(employees.map((employee) => employee.department)),
    ]

    const filteredEmployees = employees.filter((employee) => {
        const matchesName = employee.name
            .toLowerCase()
            .includes(searchName.trim().toLowerCase())

        const matchesDepartment =
            selectedDepartment === 'All' ||
            employee.department === selectedDepartment


        const matchesStatus =
            selectedStatus === 'All' || employee.status === selectedStatus

        return matchesName && matchesDepartment && matchesStatus
    })




    return (
        <section aria-labelledby="employee-directory-heading">
            <h2 id="employee-directory-heading">Employee directory</h2>

            <div className="employee-search">
                <label htmlFor="employee-search">Search by name</label>
                <input
                    id="employee-search"
                    type="search"
                    value={searchName}
                    onChange={(event) => setSearchName(event.target.value)}
                    placeholder="Type an employee name"
                />
            </div>

            <div className="department-filter">
                <label htmlFor="employee-department">Department</label>
                <select
                    id="employee-department"
                    value={selectedDepartment}
                    onChange={(event) => setSelectedDepartment(event.target.value)}
                >
                    <option value="All">All departments</option>
                    {departments.map((department) => (
                        <option key={department} value={department}>
                            {department}
                        </option>
                    ))}
                </select>
            </div>

            <div className="status-filter">
                <label htmlFor="employee-status">Status</label>
                <select
                    id="employee-status"
                    value={selectedStatus}
                    onChange={(event) => setSelectedStatus(event.target.value)}
                >
                    <option value="All">All statuses</option>
                    {statuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>

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
                    {filteredEmployees.map((employee) => (
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