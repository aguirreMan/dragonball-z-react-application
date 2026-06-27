import { Outlet } from 'react-router'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className='min-h-screen'>
      <Navbar />
      <main className='mx-auto max-w-7xl px-8 py-8'>
        <Outlet />
      </main>
    </div>
  )
}
