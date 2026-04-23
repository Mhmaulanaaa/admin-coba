// User types
export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

// Auth types
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}

// Login form types
export interface LoginFormData {
  email: string
  password: string
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// Surgical/Operation types (untuk SiKompas)
export interface Operation {
  id: string
  patientName: string
  operationType: string
  scheduledDate: Date
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  surgeon: string
  room: string
}

// Add more types as needed for your application
