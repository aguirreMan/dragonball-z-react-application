import { Outlet } from 'react-router'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className='min-h-screen'>
      <Navbar />
      <main className='p-8'>
        <Outlet />
      </main>
    </div>
  )
}
