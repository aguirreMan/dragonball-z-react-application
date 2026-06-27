import { BrowserRouter, Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Planets from './pages/Planets'



function App() {

  return (
   <BrowserRouter>
     <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/planets' element={<Planets />} />
        </Route>
     </Routes>
   </BrowserRouter>
  )
}

export default App
