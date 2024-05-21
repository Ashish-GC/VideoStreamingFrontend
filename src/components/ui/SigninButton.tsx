
import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import classes from "./SigninButton.module.css"

function SigninButton() {
  return (
    <Link className={classes.signinButton} to="/signin"> 
    <div className='flex gap-1'>
   <FaUser/>
   <p>Sign in</p> 
   </div> 
</Link>           
  )
}

export default SigninButton

