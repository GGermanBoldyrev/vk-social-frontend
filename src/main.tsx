import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux'
import store from '../redux/store.tsx'

// Create a new instance of QueryClient
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>,
)
