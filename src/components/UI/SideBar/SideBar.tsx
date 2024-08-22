import React from 'react'
import { Link } from 'react-router-dom'
import classes from "./SideBarStyles.module.css"
function SideBar() {
  return (
    <div className={classes.main}>

         <ul>
            <li>
               <Link to={"/account"}>
               Account  
               </Link>
            </li>
        
            <li>
               <Link to={"/my-order"}>
               Order
               </Link>
            </li>
            <li>
               <Link to={"/login"} style={{color: "red"}}>
               Logout
               </Link>
            </li>
         </ul>
    </div>
  )
}

export default SideBar