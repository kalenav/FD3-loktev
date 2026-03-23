import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { FinnhubWebSocketProvider } from './contexts/finnhub-ws.context.tsx'
import './index.scss'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Provider store={store}>
      <FinnhubWebSocketProvider>
        <App />
      </FinnhubWebSocketProvider>
    </Provider>
  // </StrictMode>,
)
