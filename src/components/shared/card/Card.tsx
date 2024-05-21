
import { Link } from "react-router-dom"
import classes from "./Card.module.css"
import { videoType } from '@/types'
import { dateformatter } from "./dateformatter";

function Card({video}:{video:videoType}) {
       
    const ytDate = dateformatter(video.createdAt)

  return (

      <Link to={`/video/${video._id}`}> 
      <div  className={classes.thumbnail}>
         <img src={video.thumbnail} alt="remote image" />
      </div>
      <div  className={classes.content}>
          <div className={classes.title}>
                       {/* user logo */}
                   <img src={video.owner_details[0]?.avatar} alt="remote image" /> 
                    <p>{video.title}</p>
          </div>
          <div className={classes.channel}>
             <p>{video.owner_details[0]?.username}</p>
              <div className={classes.video_data}>
                 <p>{video.views} views</p>
                 <p>.</p>
                 <p>{ytDate}</p>
              </div>
          </div>
      </div>
 </Link>

  )
}

export default Card
