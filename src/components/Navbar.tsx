import { Link, NavLink } from 'react-router'

const navLinks = [
  { to: '/characters', label: 'Characters' },
  { to: '/planets', label: 'Planets' },
  { to: '/transformations', label: 'Transformations' }
]

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 bg-secondary border-b-4 border-foreground px-8 py-4 flex items-center gap-12">
      <h2 className="text-5xl uppercase tracking-widest shrink-0">
        <Link to="/">Dragon Ball Z</Link>
      </h2>
      <nav className="flex gap-6">
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `text-lg font-bold uppercase tracking-wide transition-colors ${
                isActive ? 'text-foreground' : 'text-gray-400 hover:text-foreground'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
