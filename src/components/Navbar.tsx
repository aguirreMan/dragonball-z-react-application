import { NavLink } from 'react-router'

const navLinks = [
  { to: '/', label: 'DBZ Fan Club' },
  { to: '/characters', label: 'Characters' },
  { to: '/planets', label: 'Planets' },
  { to: '/transformations', label: 'Transformations' },
  { to: '/arena', label: 'Arena' }
]

export default function Navbar() {
  return (
    <header className='w-full sticky top-0 z-50 bg-secondary'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-8 py-6'>
        <nav className='flex gap-6'>
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
      </div>
    </header>
  )
}
