import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import store from './store'
import App from './app/App'
import { queryClient } from './shared/services/QueryService'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
    <ReactQueryDevtools initialIsOpen={true} />
  </QueryClientProvider>
)
