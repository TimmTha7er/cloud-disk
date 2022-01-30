import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './navbar/navbar'
import './app.css'
import Registration from './registration/Registration'

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar></Navbar>
        <Routes>
          <Route path='/registration' element={<Registration/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
