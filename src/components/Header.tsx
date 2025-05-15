import { Link } from '@tanstack/react-router'
import { buttonVariants } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="p-4 bg-white text-black shadow-md fixed top-0 left-0 right-0 z-20">
      <div className="container mx-auto flex items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo192.png"
            alt="MyApp Logo"
            className="h-8 w-auto mr-2 animate-spin spin-in"
          />
          <span className="text-lg font-semibold">HRM</span>
        </Link>

        {/* Navigation */}
        <nav className="ml-auto flex space-x-4">
          <Link
            to="/"
            className={
              buttonVariants({ variant: 'outline', size: 'sm' }) +
              ' font-medium'
            }
            activeProps={{
              className:
                buttonVariants({ variant: 'default', size: 'sm' }) +
                ' font-medium bg-black text-white',
            }}
          >
            Home
          </Link>
          <Link
            to="/users"
            className={
              buttonVariants({ variant: 'outline', size: 'sm' }) +
              ' font-medium'
            }
            activeProps={{
              className:
                buttonVariants({ variant: 'default', size: 'sm' }) +
                ' font-medium bg-black text-white',
            }}
          >
            User
          </Link>
          <Link
            to="/login"
            className={
              buttonVariants({ variant: 'outline', size: 'sm' }) +
              ' font-medium'
            }
            activeProps={{
              className:
                buttonVariants({ variant: 'default', size: 'sm' }) +
                ' font-medium bg-black text-white',
            }}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  )
}
