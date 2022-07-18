import { BrowserRouter } from 'react-router-dom'

import { Navbar } from '../components'
import { AppRouter } from '../components'
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
