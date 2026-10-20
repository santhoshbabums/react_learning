import { useState, type FormEvent } from 'react'
import type { Employee, EmployeeStatus } from './types'
import './EmployeeForm.css'

export type NewEmployee = Omit<Employee, 'id' | 'initials'>

interface EmployeeFormProps {
    onAddEmployee: (employee: NewEmployee) => void
    onCancel: () => void
}

export function EmployeeForm({
    onAddEmployee,
    onCancel,
}: EmployeeFormProps) {
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [department, setDepartment] = useState('')
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')
    const [status, setStatus] = useState<EmployeeStatus>('Active')

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        onAddEmployee({
            name: name.trim(),
            role: role.trim(),
            department: department.trim(),
            email: email.trim(),
            location: location.trim(),
            status,
        })
    }

    //   return (
    //     <form className="employee-form" onSubmit={handleSubmit}>
    //       <label htmlFor="new-employee-name">Name</label>
    //       <input
    //         id="new-employee-name"
    //         value={name}
    //         onChange={(event) => setName(event.target.value)}
    //         required
    //       />

    //       <label htmlFor="new-employee-role">Role</label>
    //       <input
    //         id="new-employee-role"
    //         value={role}
    //         onChange={(event) => setRole(event.target.value)}
    //         required
    //       />

    //       <label htmlFor="new-employee-department">Department</label>
    //       <input
    //         id="new-employee-department"
    //         value={department}
    //         onChange={(event) => setDepartment(event.target.value)}
    //         required
    //       />

    //       <label htmlFor="new-employee-email">Email</label>
    //       <input
    //         id="new-employee-email"
    //         type="email"
    //         value={email}
    //         onChange={(event) => setEmail(event.target.value)}
    //         required
    //       />

    //       <label htmlFor="new-employee-location">Location</label>
    //       <input
    //         id="new-employee-location"
    //         value={location}
    //         onChange={(event) => setLocation(event.target.value)}
    //         required
    //       />

    //       <label htmlFor="new-employee-status">Status</label>
    //       <select
    //         id="new-employee-status"
    //         value={status}
    //         onChange={(event) => setStatus(event.target.value as EmployeeStatus)}
    //       >
    //         <option value="Active">Active</option>
    //         <option value="On leave">On leave</option>
    //         <option value="Probation">Probation</option>
    //       </select>

    //       <button type="submit">Add employee</button>
    //       <button type="button" onClick={onCancel}>Cancel</button>
    //     </form>
    //   )

    return (
        <form className="employee-form" onSubmit={handleSubmit}>
            <h2>Add employee</h2>

            <div className="employee-form-fields">
                <div className="employee-form-field">
                    <label htmlFor="new-employee-name">Name</label>
                    <input
                        id="new-employee-name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </div>

                <div className="employee-form-field">
                    <label htmlFor="new-employee-role">Role</label>
                    <input
                        id="new-employee-role"
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                        required
                    />
                </div>

                <div className="employee-form-field">
                    <label htmlFor="new-employee-department">Department</label>
                    <input
                        id="new-employee-department"
                        value={department}
                        onChange={(event) => setDepartment(event.target.value)}
                        required
                    />
                </div>

                <div className="employee-form-field">
                    <label htmlFor="new-employee-email">Email</label>
                    <input
                        id="new-employee-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div className="employee-form-field">
                    <label htmlFor="new-employee-location">Location</label>
                    <input
                        id="new-employee-location"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        required
                    />
                </div>

                <div className="employee-form-field">
                    <label htmlFor="new-employee-status">Status</label>
                    <select
                        id="new-employee-status"
                        value={status}
                        onChange={(event) =>
                            setStatus(event.target.value as EmployeeStatus)
                        }
                    >
                        <option value="Active">Active</option>
                        <option value="On leave">On leave</option>
                        <option value="Probation">Probation</option>
                    </select>
                </div>
            </div>

            <div className="employee-form-actions">
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit">Add employee</button>
            </div>
        </form>
    )
}