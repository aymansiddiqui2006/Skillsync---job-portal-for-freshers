import {createBrowserRouter , RouterProvider } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

//Pages
import Recuiter_Dashboard from '../src/component/Pages/recuiter/Recuiter_Dashboard.jsx'
import LandingPage from './component/LandingPage.jsx';


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
  }
])

function App() {
  
  return (
    <RouterProvider router={route}/>
  )
}

export default App
