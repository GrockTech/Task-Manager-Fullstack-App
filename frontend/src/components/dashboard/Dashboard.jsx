import React from 'react'
import "./dashboard.css"
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/authContext'
import { useLogout } from '../../hooks/useLogout'


const Dashboard = () => {

const {user} = useAuthContext()
        

const {logOut} = useLogout()

const handleLogout = () =>{
  logOut()
}

  return (
    <div className='dashbarod-Container'>
        <div className="topWrapper">
            <h2>Task Manager</h2>
{!user &&
            <div className="link">
                
                <Link to="/signup">
                <span>Signup</span> 
                </Link>
               
                <Link to="signin">
                <span>Sign In</span>
                </Link>
            
            </div>}
              {user && <div className="signOut">
                
                <button onClick={handleLogout} className='button--signout' id='signout'>
                    Logout
                </button>

                <span style={{color: "#fff"}}>{user.email}</span>
                </div> }
                
        </div>

    </div>
  )
}

export default Dashboard

