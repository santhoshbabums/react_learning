import type { Employee } from './types'
import { useState } from 'react'
import './EmployeeTable.css'
import { Link } from 'react-router-dom'

interface EmployeeTableProps {
    employees: Employee[]
    onEditEmployee: (employee: Employee) => void
    onDeleteEmployee: (employee: Employee) => void
}


export function EmployeeTable({ employees, onEditEmployee, onDeleteEmployee }: EmployeeTableProps) {

    const [searchName, setSearchName] = useState('')
    const [selectedDepartment, setSelectedDepartment] = useState('All')
    const [selectedStatus, setSelectedStatus] = useState('All')
    const statuses = ['Active', 'On leave', 'Probation']

    const departments = [
        ...new Set(employees.map((employee) => employee.department)),
    ]

    const hasActiveFilters =
        searchName.trim() !== '' ||
        selectedDepartment !== 'All' ||
        selectedStatus !== 'All'

    const filteredEmployees = employees.filter((employee) => {
        const normalizedSearch = searchName.trim().toLowerCase()
        const matchesName =
            normalizedSearch === '' ||
            employee.name.toLowerCase().includes(normalizedSearch)

        const matchesDepartment =
            selectedDepartment === 'All' ||
            employee.department === selectedDepartment

        const matchesStatus =
            selectedStatus === 'All' || employee.status === selectedStatus

        return matchesName && matchesDepartment && matchesStatus
    })

    function clearFilters() {
        setSearchName('')
        setSelectedDepartment('All')
        setSelectedStatus('All')
    }

    return (
        <section aria-labelledby="employee-directory-heading">
            <h2 id="employee-directory-heading">Employee directory</h2>

            <div className="table-filters">
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
            </div>

            {hasActiveFilters && (
                <div className="filters-toolbar">
                    <button
                        type="button"
                        className="clear-filters-button"
                        onClick={clearFilters}
                    >
                        Clear filters
                    </button>
                </div>
            )}

            <table>
                <thead>
                    <tr>
                        <th scope="col">Employee</th>
                        <th scope="col">Department</th>
                        <th scope="col">Status</th>
                        <th scope="col">Location</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredEmployees.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="empty-row">
                                <div className="empty-state-box">
                                    <strong>No employees match your filters.</strong>
                                    <span>Try a different name, department, or status.</span>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        filteredEmployees.map((employee) => (
                            <tr key={employee.id}>
                                <td>
                                    <strong>
                                        <Link className="employee-name-link" to={`/employees/${employee.id}`}>
                                            {employee.name}
                                        </Link>
                                    </strong>
                                    <br />
                                    <span className="employee-role">{employee.role}</span>
                                </td>
                                <td>{employee.department}</td>
                                <td>
                                    <span className={`status-badge status-${employee.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                        {employee.status}
                                    </span>
                                </td>
                                <td>{employee.location}</td>
                                <td>
                                    <div className="employee-actions">
                                        <button
                                            type="button"
                                            className="table-action edit-action"
                                            onClick={() => onEditEmployee(employee)}
                                            aria-label={`Edit ${employee.name}`}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="table-action delete-action"
                                            onClick={() => onDeleteEmployee(employee)}
                                            aria-label={`Delete ${employee.name}`}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </section>
    )
}