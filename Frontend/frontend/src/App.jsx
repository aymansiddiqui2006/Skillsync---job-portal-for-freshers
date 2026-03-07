import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainPage from './components/home page/MainPage'
import Register from './components/registration/Register'

const route = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path:'/register',
    element:<Register/>
  }
])

function App() {

  return (
    <RouterProvider router={route}></RouterProvider>
  )
}

export default App
