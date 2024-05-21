import UnAuthScreen from '@/components/shared/unAuthScreen/UnAuthScreen';
import { userContext } from '@/context/Context';
import { useContext } from 'react'


function History() {
  const {isAuthenticated} = useContext(userContext);
  return (
    <div className='w-[100%] h-[100%]'>
       {!isAuthenticated && <UnAuthScreen title='Keep track of what you watch' desc="watch history isn't viewable when signed out. Learn more" screenLogo="history"/>}  
       {isAuthenticated && <div>here</div>}
    </div>
  )
}

export default History
