import { BrowserRouter } from 'react-router-dom'

import { Navbar } from '../components'
import { AppRouter } from '../components'
import '../assets/styles/app.scss'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className='container'>
        <Navbar></Navbar>
        <AppRouter />
      </div>
    </BrowserRouter>
  )
}

export default App
