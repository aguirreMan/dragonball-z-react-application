import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Planets from './pages/Planets'
import SinglePlanetsPage from './pages/SinglePlanetsPage'
import Characters from './pages/Characters'
import SingleCharactersPage from './pages/SingleCharactersPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'planets', element: <Planets /> },
      { path: '/planets/:id', element: <SinglePlanetsPage /> },
      { path: 'characters', element: <Characters /> },
      { path: 'characters/:id', element: <SingleCharactersPage /> },
    ],
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
