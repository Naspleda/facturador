import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Facturador from './pages/Facturador';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/facturador',
    element: <Facturador />,
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App
