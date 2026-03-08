import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainPage from './components/home page/MainPage'
import Register from './components/registration/Register'
import Login from './components/registration/Login'
import RecruiterLandingPage from './components/recuiter/RecruiterLandingPage'
import RecruiterLayout from './components/Layouts/RecruiterLayout'

import UserProvider from './components/context/UserProvider'
import PostJob from './components/recuiter/PostJob/PostJob'

const route = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/recruiter',
    element: <RecruiterLayout />,
    children: [
      {
        path: 'landing-page',
        element: <RecruiterLandingPage />
      },

    ]
  },
  {
    path: 'post-job',
    element: <PostJob />
  }
])

function App() {

  return (
    <UserProvider>
      <RouterProvider router={route}></RouterProvider>
    </UserProvider>

  )
}

export default App
