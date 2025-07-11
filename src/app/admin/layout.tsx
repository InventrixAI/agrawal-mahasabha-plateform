import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Agarwal Sabha Platform',
  description: 'Administrative dashboard for Agarwal Sabha community management',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
