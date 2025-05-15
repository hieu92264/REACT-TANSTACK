import { Link } from '@tanstack/react-router'

export default function Footer() {
  return (
    <footer className="mt-12 bg-gray-100 text-gray-700 py-6 fixed bottom-0 left-0 right-0 z-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Logo or Text */}
        <Link to="/" className="flex items-center mb-4 md:mb-0">
          <img
            src="/logo192.png"
            alt="MyApp Logo"
            className="h-6 w-auto mr-2"
          />
          <span className="text-lg font-semibold">HRM</span>
        </Link>

        {/* Copyright */}
        <p className="text-sm">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
