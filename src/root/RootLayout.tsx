
import { Outlet } from 'react-router-dom'
import NavBar from '../components/shared/navbar/NavBar'
import SideBar from '../components/shared/sidebar/SideBar'
import classes from './RootLayout.module.css'

function RootLayout() {
  return (
    <div className={classes.main}>
          <div className={classes.sidebar}><SideBar/></div>
          <div className={classes.container}>
        <div className={classes.nav}><NavBar/></div>
        <div className={classes.content}><Outlet/></div>
        </div>
    </div>
  )
}

export default RootLayout
