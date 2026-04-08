import {createBrowserRouter , RouterProvider } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

import  UserContextProvider  from './component/context/UserContextProvider.jsx';

//Pages
import Recuiter_Dashboard from '../src/component/Pages/recuiter/Recuiter_Dashboard.jsx'
import LandingPage from './component/LandingPage.jsx';
import Login from './component/Pages/Auth/Login.jsx'
import Signin from './component/Pages/Auth/Signin.jsx'


const Root = () => {
  const token = localStorage.getItem("token");

  return token 
    ? <Navigate to="/recruiter" replace />
    : <Navigate to="/landing-page" replace />;
};

const route = createBrowserRouter([
  {
    path:'/',
    element:<Root/>
  },
  {
    path:'/landing-page',
    element:<LandingPage/>
  },
  {
    path:'/recruiter',
    element:<Recuiter_Dashboard/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signin',
    element:<Signin/>
  }
])

function App() {
  
  return (
    <UserContextProvider>
    <RouterProvider router={route}/>
    </UserContextProvider>
  )
}

export default App
