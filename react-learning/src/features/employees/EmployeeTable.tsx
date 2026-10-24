import type { Employee } from './types'
import { useState } from 'react'
import './EmployeeTable.css'
import { Link } from 'react-router-dom'

type SortableColumn = 'name' | 'department' | 'status'
type SortDirection = 'asc' | 'desc'

const PAGE_SIZE = 10

interface EmployeeTableProps {
    employees: Employee[]
    departments: string[]
    onEditEmployee: (employee: Employee) => void
    onDeleteEmployee: (employee: Employee) => void
}


export function EmployeeTable({
    employees,
    departments,
    onEditEmployee,
    onDeleteEmployee,
}: EmployeeTableProps) {

    const [searchName, setSearchName] = useState('')
    const [selectedDepartment, setSelectedDepartment] = useState('All')
    const [selectedStatus, setSelectedStatus] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)
    const [sortColumn, setSortColumn] = useState<SortableColumn>('name')
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
    const statuses = ['Active', 'On leave', 'Probation']

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

    const sortedEmployees = [...filteredEmployees].sort((first, second) => {
        const comparison = first[sortColumn].localeCompare(second[sortColumn], undefined, {
            sensitivity: 'base',
        })

        return sortDirection === 'asc' ? comparison : -comparison
    })

    const totalPages = Math.max(1, Math.ceil(sortedEmployees.length / PAGE_SIZE))
    const pageToDisplay = Math.min(currentPage, totalPages)
    const firstEmployeeIndex = (pageToDisplay - 1) * PAGE_SIZE
    const pageEmployees = sortedEmployees.slice(
        firstEmployeeIndex,
        firstEmployeeIndex + PAGE_SIZE,
    )
    const firstDisplayedEmployee = sortedEmployees.length === 0 ? 0 : firstEmployeeIndex + 1
    const lastDisplayedEmployee = Math.min(
        firstEmployeeIndex + PAGE_SIZE,
        sortedEmployees.length,
    )

    function handleSort(column: SortableColumn) {
        if (sortColumn === column) {
            setSortDirection((currentDirection) =>
                currentDirection === 'asc' ? 'desc' : 'asc',
            )
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }

        setCurrentPage(1)
    }

    function clearFilters() {
        setSearchName('')
        setSelectedDepartment('All')
        setSelectedStatus('All')
        setCurrentPage(1)
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
                        onChange={(event) => {
                            setSearchName(event.target.value)
                            setCurrentPage(1)
                        }}
                        placeholder="Type an employee name"
                    />
                </div>

                <div className="department-filter">
                    <label htmlFor="employee-department">Department</label>
                    <select
                        id="employee-department"
                        value={selectedDepartment}
                        onChange={(event) => {
                            setSelectedDepartment(event.target.value)
                            setCurrentPage(1)
                        }}
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
                        onChange={(event) => {
                            setSelectedStatus(event.target.value)
                            setCurrentPage(1)
                        }}
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
                        <th
                            scope="col"
                            aria-sort={sortColumn === 'name' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                        >
                            <button type="button" className="sortable-header" onClick={() => handleSort('name')}>
                                Employee Name <span aria-hidden="true">{sortColumn === 'name' ? sortDirection.toUpperCase() : 'SORT'}</span>
                            </button>
                        </th>
                        <th
                            scope="col"
                            aria-sort={sortColumn === 'department' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                        >
                            <button type="button" className="sortable-header" onClick={() => handleSort('department')}>
                                Department <span aria-hidden="true">{sortColumn === 'department' ? sortDirection.toUpperCase() : 'SORT'}</span>
                            </button>
                        </th>
                        <th
                            scope="col"
                            aria-sort={sortColumn === 'status' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                        >
                            <button type="button" className="sortable-header" onClick={() => handleSort('status')}>
                                Status <span aria-hidden="true">{sortColumn === 'status' ? sortDirection.toUpperCase() : 'SORT'}</span>
                            </button>
                        </th>
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
                        pageEmployees.map((employee) => (
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

            <div className="table-pagination">
                <p className="pagination-summary" aria-live="polite">
                    Showing {firstDisplayedEmployee}-{lastDisplayedEmployee} of {sortedEmployees.length} employees
                </p>
                <nav className="pagination-controls" aria-label="Employee table pages">
                    <button
                        type="button"
                        className="pagination-button pagination-direction"
                        onClick={() => setCurrentPage(pageToDisplay - 1)}
                        disabled={pageToDisplay === 1}
                    >
                        Previous
                    </button>
                    {sortedEmployees.length > 0 && Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button
                            key={page}
                            type="button"
                            className={`pagination-button${page === pageToDisplay ? ' is-current' : ''}`}
                            onClick={() => setCurrentPage(page)}
                            aria-current={page === pageToDisplay ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        type="button"
                        className="pagination-button pagination-direction"
                        onClick={() => setCurrentPage(pageToDisplay + 1)}
                        disabled={pageToDisplay === totalPages}
                    >
                        Next
                    </button>
                </nav>
            </div>
        </section>
    )
}