import { useState } from 'react'
import Dashboard from './components/dashboard/Dashboard'
import Task from './components/task/Task'

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import SignUp from './pages/signup/SignUp';
import Login from './pages/signin/Login';
// import Login from "./pages/signin/Login"

const Layout = () =>{
  return (
    <div className='app'>

      <Dashboard/>
      <Task/>

    </div>
  )
}




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "task", element: <Task /> },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/signin",
    element: <Login/>,
  },


]);



function App() {


  return (
   <div className='app--container'>
    <RouterProvider router={router}></RouterProvider>
 
   </div>
  )
}

export default App
