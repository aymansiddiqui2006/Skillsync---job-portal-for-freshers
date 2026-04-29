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
import JobsInfo from './component/Pages/JobsInfo.jsx';
import SeekerLayout from './component/Pages/Layout/SeekerLayout/SeekerLayout.jsx'
import Seeker_Dashboard from './component/Pages/Seeker/Seeker_Dashboard.jsx';


const Root = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/landing-page" replace />
  }

  if (role === 'recruiter') {
    return <Navigate to="/recruiter" replace />
  }

  if (role === 'fresher') {
    return <Navigate to="/user" replace />
  }

  return <Navigate to="/landing-page" replace />;

};


const ProtectedRoute = ({ children, allowedRole }) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
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
    path: '/recruiter',
    element: (
      <ProtectedRoute allowedRole="recruiter">
        <RecuiterLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Recuiter_Dashboard />
      },
      {
        path: 'jobs',
        element: <Jobs />
      },
      {
        path: 'my-job',
        element: <MyJobs />
      },
      {
        path: 'jobs/:id',
        element: <JobsInfo />
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
  {
    path: '/user',
    element: (
      <ProtectedRoute allowedRole="fresher">
        <SeekerLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Seeker_Dashboard />
      },
      {
        path: 'jobs',
        element: <Jobs />
      },
      {
        path: 'jobs/:id',
        element: <JobsInfo />
      }
    ]
  }

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
