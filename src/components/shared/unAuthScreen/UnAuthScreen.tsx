
import SigninButton from "@/components/ui/SigninButton";
import classes from "./UnAuthScreen.module.css"
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";

function UnAuthScreen({screenLogo , title , desc }:{screenLogo:string , title:string , desc:string}) {
 
  let icon;
  if(screenLogo === "subscription"){
        icon = < MdOutlineSubscriptions size={100} />
      }
      else if(screenLogo ==="history"){
        icon = <MdHistory size={100} />
      }
      else if(screenLogo ==="user"){
       icon = <FaUserTie size={100} />
      }

  return (
    <div className={classes.main}>
        <div className={classes.logo}>{icon}</div>
        <div className={classes.content}>
            <h1 className="text-center text-xl lg:text-3xl">{title}</h1>
            <p  className="text-center m-5">{desc}</p>
        </div>
        <div className={classes.button}>
          <SigninButton/>
        </div>
    </div>
  )
}

export default UnAuthScreen
