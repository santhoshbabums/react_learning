import { Sidebar } from './components/Sidebar'
import { EmployeeTable } from './features/employees/EmployeeTable'
import { mockEmployees } from './features/employees/data/mockEmployee'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { EmployeeDetails } from './features/employees/EmployeeDetails'

//  phase 2 
import { useEffect, useState } from 'react'
import type { Employee } from './features/employees/types'
import { EmployeeForm, type NewEmployee } from './features/employees/EmployeeForm'


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

    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employees))
    }, [employees])

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
                                onEditEmployee={handleEditEmployee}
                                onDeleteEmployee={handleDeleteEmployee}
                            />
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