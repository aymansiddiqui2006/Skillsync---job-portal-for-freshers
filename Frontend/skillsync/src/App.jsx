import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

import UserContextProvider from './component/context/UserContextProvider.jsx';

import { Toaster } from 'react-hot-toast'

//Pages
import Recuiter_Dashboard from '../src/component/Pages/recuiter/Recuiter_Dashboard.jsx'
import LandingPage from './component/Pages/LandingPage.jsx';
import Login from './component/Pages/Auth/Login.jsx'
import Signin from './component/Pages/Auth/Signin.jsx'
import RecuiterLayout from './component/Pages/Layout/RecuiterLayout/RecuiterLayout.jsx';
import Recuiter_Profile from './component/Pages/recuiter/Recuiter_Profile.jsx'
import Jobs from './component/Pages/Jobs.jsx';
import MyJobs from './component/Pages/recuiter/MyJobs.jsx';


const Root = () => {
  const token = localStorage.getItem("token");

  return token
    ? <Navigate to="/recruiter" replace />
    : <Navigate to="/landing-page" replace />;
};

const route = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    path: '/landing-page',
    element: <LandingPage />
  },
  {
    path: '',
    element: <RecuiterLayout />,
    children: [
      {
        path: 'recruiter',
        element: <Recuiter_Dashboard />
      },
      {
        path:'/jobs',
        element:<Jobs/>
      },
      {
        path:'/my-job',
        element:<MyJobs/>
      }

    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signin',
    element: <Signin />
  },
  {
    path: '/profile',
    element: <Recuiter_Profile />
  },
  
])

function App() {

  return (
    <UserContextProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={route} />
      
    </UserContextProvider>
  )
}

export default App
