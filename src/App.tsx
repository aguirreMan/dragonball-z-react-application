import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Planets from './pages/Planets'
import SinglePlanetsPage from './pages/SinglePlanetsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'planets', element: <Planets /> },
      { path: '/planets/:id', element: <SinglePlanetsPage /> },
    ],
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
