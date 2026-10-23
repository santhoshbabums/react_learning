import { Sidebar } from './components/Sidebar'
import { EmployeeTable } from './features/employees/EmployeeTable'
import { mockEmployees } from './features/employees/data/mockEmployee'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import { EmployeeDetails } from './features/employees/EmployeeDetails'

//  phase 2 
import { useEffect, useState, type FormEvent } from 'react'
import type { Employee } from './features/employees/types'
import { EmployeeForm, type NewEmployee } from './features/employees/EmployeeForm'

function normalizeDepartmentName(value: string) {
    return value.trim().replace(/\s+/g, ' ')
}

function getDepartmentOptions(employeeList: Employee[]) {
    return Array.from(
        new Set(
            employeeList
                .map((employee) => normalizeDepartmentName(employee.department))
                .filter(Boolean),
        ),
    ).sort((left, right) => left.localeCompare(right))
}

function App() {
    const [employees, setEmployees] = useState<Employee[]>(() => {
        const savedEmployees = localStorage.getItem('employees')

        if (!savedEmployees) {
            return mockEmployees
        }

        try {
            const parsedEmployees = JSON.parse(savedEmployees) as Employee[]
            return parsedEmployees.length > 0 ? parsedEmployees : mockEmployees
        } catch {
            return mockEmployees
        }
    })

    const [departments, setDepartments] = useState<string[]>(() => {
        const savedDepartments = localStorage.getItem('departments')

        if (savedDepartments) {
            try {
                const parsedDepartments = JSON.parse(savedDepartments) as string[]
                if (Array.isArray(parsedDepartments) && parsedDepartments.length > 0) {
                    return parsedDepartments
                        .map((department) => normalizeDepartmentName(department))
                        .filter(Boolean)
                }
            } catch {
                // fall back to employees when storage data is invalid
            }
        }

        return getDepartmentOptions(mockEmployees)
    })

    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employees))
    }, [employees])

    useEffect(() => {
        const mergedDepartments = Array.from(
            new Set([...departments, ...getDepartmentOptions(employees)]),
        ).sort((left, right) => left.localeCompare(right))

        setDepartments((currentDepartments) => {
            const nextDepartments = Array.from(
                new Set([...currentDepartments, ...mergedDepartments]),
            ).sort((left, right) => left.localeCompare(right))

            if (JSON.stringify(currentDepartments) === JSON.stringify(nextDepartments)) {
                return currentDepartments
            }

            localStorage.setItem('departments', JSON.stringify(nextDepartments))
            return nextDepartments
        })
    }, [employees])

    useEffect(() => {
        localStorage.setItem('departments', JSON.stringify(departments))
    }, [departments])

    // phase 2 
    const [isAddingEmployee, setIsAddingEmployee] = useState(false)

    const activeCount = employees.filter(
        (employee) => employee.status === 'Active',
    ).length

    const leaveCount = employees.filter(
        (employee) => employee.status === 'On leave',
    ).length

    const departmentCount = new Set(
        employees.map((employee) => employee.department),
    ).size

    const departmentBreakdown = employees.reduce<Record<string, number>>(
        (counts, employee) => {
            counts[employee.department] = (counts[employee.department] ?? 0) + 1
            return counts
        },
        {},
    )

    const recentEmployees = [...employees].reverse().slice(0, 5)

    // phase 2

    function handleSaveEmployee(employee: NewEmployee, id?: number) {
        // Make initials for the new or edited name.
        const initials = employee.name
            .trim()
            .split(/\s+/)
            .map((part) => part[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()

        setEmployees((currentEmployees) => {
            // No ID means this is a new employee, so append.
            if (id === undefined) {
                return [...currentEmployees, { ...employee, id: Date.now(), initials }]
            }

            // An ID means edit: replace only the matching employee.
            return currentEmployees.map((currentEmployee) =>
                currentEmployee.id === id
                    ? { ...currentEmployee, ...employee, initials }
                    : currentEmployee,
            )
        })

        setEditingEmployee(null)
        setIsAddingEmployee(false)
    }

    //phase 3 

    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
    function handleEditEmployee(employee: Employee) {
        setEditingEmployee(employee)
        setIsAddingEmployee(true)
    }

    const [departmentName, setDepartmentName] = useState('')
    const [editingDepartment, setEditingDepartment] = useState<string | null>(null)
    const [departmentError, setDepartmentError] = useState('')

    function handleDepartmentSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const nextDepartmentName = normalizeDepartmentName(departmentName)

        if (!nextDepartmentName) {
            setDepartmentError('Department name is required.')
            return
        }

        const isDuplicate = departments.some(
            (department) =>
                normalizeDepartmentName(department).toLowerCase() ===
                nextDepartmentName.toLowerCase() &&
                (editingDepartment === null ||
                    normalizeDepartmentName(department).toLowerCase() !==
                    editingDepartment.trim().toLowerCase()),
        )

        if (isDuplicate) {
            setDepartmentError('A department with that name already exists.')
            return
        }

        if (editingDepartment) {
            const previousDepartmentName = normalizeDepartmentName(editingDepartment)

            setDepartments((currentDepartments) =>
                currentDepartments.map((department) =>
                    normalizeDepartmentName(department).toLowerCase() ===
                    previousDepartmentName.toLowerCase()
                        ? nextDepartmentName
                        : department,
                ),
            )

            setEmployees((currentEmployees) =>
                currentEmployees.map((employee) =>
                    normalizeDepartmentName(employee.department).toLowerCase() ===
                    previousDepartmentName.toLowerCase()
                        ? { ...employee, department: nextDepartmentName }
                        : employee,
                ),
            )
        } else {
            setDepartments((currentDepartments) => [
                ...currentDepartments,
                nextDepartmentName,
            ])
        }

        setDepartmentName('')
        setEditingDepartment(null)
        setDepartmentError('')
    }

    function handleEditDepartment(department: string) {
        setEditingDepartment(department)
        setDepartmentName(department)
        setDepartmentError('')
    }

    function handleDeleteDepartment(department: string) {
        const normalizedDepartment = normalizeDepartmentName(department)
        const affectedEmployees = employees.filter(
            (employee) =>
                normalizeDepartmentName(employee.department).toLowerCase() ===
                normalizedDepartment.toLowerCase(),
        )

        if (affectedEmployees.length > 0) {
            window.alert(
                `Cannot delete "${department}" because ${affectedEmployees.length} employee(s) are still assigned to it. Please reassign them before deleting the department.`,
            )
            return
        }

        setDepartments((currentDepartments) =>
            currentDepartments.filter(
                (currentDepartment) =>
                    normalizeDepartmentName(currentDepartment).toLowerCase() !==
                    normalizedDepartment.toLowerCase(),
            ),
        )
    }

    //phase 4 

    function handleDeleteEmployee(employee: Employee) {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${employee.name}?`,
        )

        if (!confirmed) return

        setEmployees((currentEmployees) =>
            currentEmployees.filter(
                (currentEmployee) => currentEmployee.id !== employee.id,
            ),
        )
    }

    return (
        <div className="app-shell" id="overview">
            <Sidebar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <main className="dashboard-main overview-main">
                            <header className="page-heading">
                                <p>PEOPLE OPERATIONS</p>
                                <h1>Overview</h1>
                                <span>A quick look at your team.</span>
                            </header>

                            <section className="summary-cards" aria-label="Employee summary">
                                <article className="summary-card">
                                    <h2>Total employees</h2>
                                    <p>{employees.length}</p>
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

                            <section className="overview-panels">
                                <article className="overview-panel">
                                    <div className="panel-header">
                                        <h2>Department distribution</h2>
                                    </div>

                                    <ul className="department-list">
                                        {Object.entries(departmentBreakdown)
                                            .sort(([left], [right]) => left.localeCompare(right))
                                            .map(([department, count]) => (
                                                <li key={department} className="department-item">
                                                    <span>{department}</span>
                                                    <strong>{count}</strong>
                                                </li>
                                            ))}
                                    </ul>
                                </article>

                                <article className="overview-panel">
                                    <div className="panel-header">
                                        <h2>Recent additions</h2>
                                        <Link to="/employees" className="panel-link">
                                            View all employees
                                        </Link>
                                    </div>

                                    <ul className="recent-list">
                                        {recentEmployees.map((employee) => (
                                            <li key={employee.id} className="recent-item">
                                                <div className="recent-profile">{employee.initials}</div>
                                                <div className="recent-details">
                                                    <strong>{employee.name}</strong>
                                                    <span>{employee.role}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            </section>
                        </main>
                    }
                />

                <Route
                    path="/employees"
                    element={
                        <main className="dashboard-main">
                            <header className="page-heading">
                                <p>PEOPLE OPERATIONS</p>
                                <h1>Employee dashboard</h1>
                                <span>A quick look at your team.</span>

                                <button
                                    type="button"
                                    className="primary-action"
                                    onClick={() => {
                                        setEditingEmployee(null)
                                        setIsAddingEmployee(true)
                                    }}
                                >
                                    Add employee
                                </button>
                            </header>

                            {isAddingEmployee && (
                                <EmployeeForm
                                    initialEmployee={editingEmployee ?? undefined}
                                    availableDepartments={departments}
                                    onSaveEmployee={handleSaveEmployee}
                                    onCancel={() => setIsAddingEmployee(false)}
                                />
                            )}

                            <section className="summary-cards" aria-label="Employee summary">
                                <article className="summary-card">
                                    <h2>Total employees</h2>
                                    <p>{employees.length}</p>
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

                            <EmployeeTable
                                employees={employees}
                                departments={departments}
                                onEditEmployee={handleEditEmployee}
                                onDeleteEmployee={handleDeleteEmployee}
                            />
                        </main>
                    }
                />

                <Route
                    path="/departments"
                    element={
                        <main className="dashboard-main departments-main">
                            <header className="page-heading">
                                <p>PEOPLE OPERATIONS</p>
                                <h1>Departments</h1>
                                <span>Manage team structure and departmental headcount.</span>
                            </header>

                            <form className="department-form" onSubmit={handleDepartmentSubmit}>
                                <div className="department-form-field">
                                    <label htmlFor="department-name">Department name</label>
                                    <input
                                        id="department-name"
                                        type="text"
                                        value={departmentName}
                                        onChange={(event) => setDepartmentName(event.target.value)}
                                        placeholder="Enter a department name"
                                        required
                                    />
                                </div>

                                {departmentError && (
                                    <p className="form-error-message">{departmentError}</p>
                                )}

                                <div className="department-form-actions">
                                    {editingDepartment && (
                                        <button
                                            type="button"
                                            className="secondary-button"
                                            onClick={() => {
                                                setEditingDepartment(null)
                                                setDepartmentName('')
                                                setDepartmentError('')
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button type="submit" className="primary-action">
                                        {editingDepartment ? 'Save department' : 'Add department'}
                                    </button>
                                </div>
                            </form>

                            <section className="department-grid">
                                {departments.map((department) => {
                                    const departmentEmployeeCount = employees.filter(
                                        (employee) =>
                                            normalizeDepartmentName(employee.department).toLowerCase() ===
                                            normalizeDepartmentName(department).toLowerCase(),
                                    ).length

                                    return (
                                        <article key={department} className="department-card">
                                            <div className="department-card-header">
                                                <div>
                                                    <p className="department-label">Department</p>
                                                    <h2>{department}</h2>
                                                </div>
                                                <span className="department-count">{departmentEmployeeCount}</span>
                                            </div>

                                            <p className="department-card-meta">
                                                {departmentEmployeeCount} employee{departmentEmployeeCount === 1 ? '' : 's'} assigned
                                            </p>

                                            <div className="department-card-actions">
                                                <button
                                                    type="button"
                                                    className="table-action edit-action"
                                                    onClick={() => handleEditDepartment(department)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="table-action delete-action"
                                                    onClick={() => handleDeleteDepartment(department)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </article>
                                    )
                                })}
                            </section>
                        </main>
                    }
                />

                <Route
                    path="/employees/:employeeId"
                    element={<EmployeeDetails employees={employees} />}
                />
            </Routes>

        </div>


    )
}

export default App