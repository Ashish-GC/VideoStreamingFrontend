
import { Outlet } from 'react-router-dom'
import classes from "./AuthLayout.module.css"

function AuthLayout() {
  return (
    <div className={classes.main}>
      <div className='w-[100%] h-[100%] flex justify-center items-center'>
      <Outlet/>   
      </div>
         
    </div>
  ) 
}

export default AuthLayout
