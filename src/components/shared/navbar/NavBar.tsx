import React, { useContext, useState } from 'react'
import classes from './NavBar.module.css';
import { IoIosSearch } from "react-icons/io";
import { userContext } from '@/context/Context';
import SigninButton from '@/components/ui/SigninButton';
import { Link, createSearchParams, useNavigate} from 'react-router-dom';
import { queryClient } from '@/lib/react-query/QueryProvider';

function NavBar() {
  const {user , isAuthenticated} = useContext(userContext);
  const [search , setSearch]=useState('');
  const navigate = useNavigate()
  
  const searchContentHandler=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setSearch(e.target.value)
  }

  const searchQueryHandler=()=>{
    queryClient.invalidateQueries({queryKey:['get-search-query']})
    if(search ===''){navigate('/')}
           if(search!=''){
           navigate({
            pathname:"/search",
            search:`?${createSearchParams({query:search})}`
           })
           }
          
    }



  return (
    <nav className={classes.nav}>
        <ul>
            <li className={classes.search}>
                <input onKeyUp={searchQueryHandler} type="text" placeholder='SEARCH' value={search} onChange={searchContentHandler}/>
                <button onClick={searchQueryHandler}><IoIosSearch /></button>
            </li>
           { !isAuthenticated && 
             <li className={classes.userlogo}>
                  <SigninButton/>
             </li>
           } 
           {    isAuthenticated && 
                
                <li className={classes.userAvatar}>
                   <Link to="/userChannel">
                       <img src={user.avatar} alt="remoteImage" />
                       </Link>
                </li>
           }
        </ul>
    </nav>
  )
}

export default NavBar
