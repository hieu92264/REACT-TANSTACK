import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(features)/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="relative">
      <Header />
      <div className="mt-[65px] mx-auto max-w-8xl">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
