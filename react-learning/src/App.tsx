import { Sidebar } from './components/Sidebar'
import { EmployeeTable } from './features/employees/EmployeeTable'
import { mockEmployees } from './features/employees/data/mockEmployee'
import './App.css'

//  phase 2 
import { useState } from 'react'
import type { Employee } from './features/employees/types'
import { EmployeeForm, type NewEmployee } from './features/employees/EmployeeForm'


function App() {
    const [employees, setEmployees] = useState<Employee[]>(mockEmployees)
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

    function handleAddEmployee(employee: NewEmployee) {
        const initials = employee.name
            .trim()
            .split(/\s+/)
            .map((part) => part[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()

        setEmployees((currentEmployees) => [
            ...currentEmployees,
            { ...employee, id: Date.now(), initials },
        ])

        setIsAddingEmployee(false)
    }

    return (
        <div className="app-shell" id="overview">
            <Sidebar />

            <main className="dashboard-main">
                <header className="page-heading">
                    <p>PEOPLE OPERATIONS</p>
                    <h1>Employee dashboard</h1>
                    <span>A quick look at your team.</span>

                    <button type="button" onClick={() => setIsAddingEmployee(true)}>
                        Add employee
                    </button>
                </header>

                {isAddingEmployee && (
                    <EmployeeForm
                        onAddEmployee={handleAddEmployee}
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

                <EmployeeTable employees={employees} />
            </main>
        </div>
    )
}

export default App