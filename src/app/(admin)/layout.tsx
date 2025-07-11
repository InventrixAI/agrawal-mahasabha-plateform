import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen flex-1 bg-gray-50/50 dark:bg-gray-900/50">{children}</main>
      <Footer />
    </>
  )
}
