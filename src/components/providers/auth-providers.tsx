'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth-store'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { refreshUser, setLoading } = useAuthStore()

  useEffect(() => {
    // Initialize auth state on mount
    const initAuth = async () => {
      setLoading(true)
      await refreshUser()
      setLoading(false)
    }

    initAuth()
  }, [refreshUser, setLoading])

  return <>{children}</>
}
