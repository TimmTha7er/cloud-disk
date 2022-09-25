import { BrowserRouter } from 'react-router-dom'

import { Navbar } from '../entities'
import AppRouter from './AppRouter'
import Layout from '../shared/helpers/Layout'
import '../shared/assets/styles/app.scss'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Navbar></Navbar>
        <AppRouter />
      </Layout>
    </BrowserRouter>
  )
}

export default App
