import type { Employee } from '../types'

export const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'Olivia Rhye',
    role: 'Product Designer',
    department: 'Design',
    email: 'olivia@example.com',
    location: 'New York',
    status: 'Active',
    initials: 'OR',
  },
  {
    id: 2,
    name: 'Phoenix Baker',
    role: 'Engineering Lead',
    department: 'Engineering',
    email: 'phoenix@example.com',
    location: 'San Francisco',
    status: 'Active',
    initials: 'PB',
  },
  {
    id: 3,
    name: 'Lana Steiner',
    role: 'People Partner',
    department: 'People',
    email: 'lana@example.com',
    location: 'Austin',
    status: 'On leave',
    initials: 'LS',
  },
  {
    id: 4,
    name: 'Demi Wilkinson',
    role: 'Frontend Developer',
    department: 'Engineering',
    email: 'demi@example.com',
    location: 'New York',
    status: 'Probation',
    initials: 'DW',
  },
]