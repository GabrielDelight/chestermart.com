import React from 'react'
import { FaSadTear } from 'react-icons/fa'
import classes from "./NotFound.module.css"
function NotFound() {
  return (
   <div className={classes.wrap}>
   <FaSadTear size={30} />
   <h3>No Item found</h3>
 </div>
   )
}

export default NotFound