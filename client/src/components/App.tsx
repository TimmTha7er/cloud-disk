import { BrowserRouter } from 'react-router-dom'

import Navbar from './navbar/navbar'
import AppRouter from './AppRouter'
import '../styles/app.scss'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar></Navbar>
        <div className='wrap'>
          <AppRouter />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
