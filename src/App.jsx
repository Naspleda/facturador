import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CountProvider from './context/countContext';

import Home from './pages/Home';
import Facturador from './pages/Facturador';
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/facturador',
    element: <Facturador />,
  }
]);

function App() {
  return (
    <CountProvider>
      <RouterProvider router={router} />
    </CountProvider>
  )
}

export default App
