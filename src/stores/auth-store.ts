import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  role: string
  status: string
  member?: {
    id: string
    firstName: string
    lastName: string
    membershipNo: string
    profilePhoto?: string
  }
}

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  gotra: string
  locality: string
  fatherName?: string
  motherName?: string
  phone?: string
  occupation?: string
  education?: string
}

interface AuthResult {
  success: boolean
  error?: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean

  // Actions
  login: (credentials: LoginCredentials) => Promise<AuthResult>
  register: (data: RegisterData) => Promise<AuthResult>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  setLoading: (loading: boolean) => void
  setUser: (user: User | null) => void
}

const setAuthCookie = (token: string) => {
  if (typeof document !== 'undefined') {
    document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`
  }
}

const getAuthToken = (): string | null => {
  if (typeof document === 'undefined') return null

  const cookies = document.cookie.split(';')
  const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith('token='))
  return tokenCookie ? tokenCookie.split('=')[1] : null
}

const removeAuthCookie = () => {
  if (typeof document !== 'undefined') {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setUser: (user: User | null) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      login: async (credentials: LoginCredentials): Promise<AuthResult> => {
        set({ isLoading: true })

        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          })

          const data = await response.json()

          if (data.success) {
            const { user: userData, token } = data.data
            setAuthCookie(token)
            set({
              user: userData,
              isAuthenticated: true,
              isLoading: false,
            })
            return { success: true }
          }

          set({ isLoading: false })
          return { success: false, error: data.message || 'Login failed' }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, error: 'Network error occurred' }
        }
      },

      register: async (data: RegisterData): Promise<AuthResult> => {
        set({ isLoading: true })

        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })

          const result = await response.json()

          if (result.success) {
            set({ isLoading: false })
            return { success: true }
          }

          set({ isLoading: false })
          return { success: false, error: result.message || 'Registration failed' }
        } catch (error) {
          set({ isLoading: false })
          return { success: false, error: 'Network error occurred' }
        }
      },

      logout: async (): Promise<void> => {
        try {
          await fetch('/api/auth/logout', { method: 'POST' })
        } catch (error) {
          console.error('Logout error:', error)
        } finally {
          removeAuthCookie()
          set({
            user: null,
            isAuthenticated: false,
          })
        }
      },

      refreshUser: async (): Promise<void> => {
        const token = getAuthToken()
        if (!token) {
          set({ user: null, isAuthenticated: false, isLoading: false })
          return
        }

        try {
          const response = await fetch('/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (response.ok) {
            const data = await response.json()
            if (data.success) {
              set({
                user: data.data.user,
                isAuthenticated: true,
                isLoading: false,
              })
              return
            }
          }

          // If refresh fails, clear auth state
          removeAuthCookie()
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          })
        } catch (error) {
          console.error('Refresh user error:', error)
          removeAuthCookie()
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
