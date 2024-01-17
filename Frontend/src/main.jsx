import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Provider } from 'react-redux'
import store from './Redux/store'
import ProviderLayout from './Redux/ProviderLayout.jsx'
import QueryProvider from './lib/react-query/QueryProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <ChakraProvider>
        <QueryProvider>

       
 <Provider store={store}>
  <BrowserRouter>
   <ProviderLayout>     
          <App />      
   </ProviderLayout>
      </BrowserRouter>
  </Provider>
  </QueryProvider>
    </ChakraProvider>,
 
)
