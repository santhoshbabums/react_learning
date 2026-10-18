export type EmployeeStatus = 'Active' | 'On leave' | 'Probation'

export interface Employee {
  id: number
  name: string
  role: string
  department: string
  email: string
  location: string
  status: EmployeeStatus
  initials: string
}