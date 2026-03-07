import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainPage from './components/home page/MainPage'

const route = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  }
])

function App() {

  return (
    <RouterProvider router={route}></RouterProvider>
  )
}

export default App
