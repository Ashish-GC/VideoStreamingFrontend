import { useMutation, useQuery} from "@tanstack/react-query"
import { loginUserType, registerUserType, updateUserType, uploadVideoFormType } from "@/types"
import { addVideoComment, deleteVideo, deleteVideoComment, editVideo, editVideoComment, getAllLikedVideos, getAllVideos, getChannelStats, getChannelVideos, getCurrentUser, getLikeStatus, getSearchVideos, getSubscribedChannels, getSubscriptionStatus, getUserByChannelId, getVideoById, getVideoComment, getVideoLikeCount, getVideosByChannelId, registerUser, signOutUser, singInUser, togglePublishStatus, toggleSubscription, toggleVideoLike, updateAccountDetails, updateUserAvatar, updateUserCoverImage, uploadAVideo } from "../fetchAPI/api"
import { queryClient } from "./QueryProvider"


 //Authentication
export const registerUserQuery=()=>{
    return useMutation({
        mutationFn: (user_data:registerUserType)=> registerUser(user_data)
    })
} 

export const signInUserQuery=()=>{
     return useMutation({
         mutationFn:(user_data:loginUserType)=>singInUser(user_data)
     })
}

export const signOutUserQuery=()=>{
    return useMutation({
        mutationFn:signOutUser
    })
}

export const getCurrentUserQuery=()=>{
    return useMutation({
        mutationKey:['get-current-user'],
        mutationFn:getCurrentUser
    })
}

// channel stats
export const getChannelStatsQuery=()=>{
    return useQuery({
         queryKey:['get-channel-stats'],
         queryFn: getChannelStats
    })
}
export const getChannelVideosQuery=()=>{
    return useQuery({
         queryKey:['get-channel-videos'],
         queryFn: getChannelVideos
    })
}

//video
export const getAllVideoQuery=()=>{
  
    return useQuery({
        queryKey:['get-all-query'],
        queryFn:getAllVideos
    })
}
export const getSearchVideoQuery=(search:string|null)=>{
    return useQuery({
        queryKey:['get-search-query'],
        queryFn:()=>getSearchVideos(search)
    })
}
export const uploadAVideoQuery=()=>{
    queryClient.invalidateQueries({queryKey:['get-channel-videos']})
    return useMutation({
       mutationFn:(videoData:uploadVideoFormType)=>uploadAVideo(videoData)
    })
}

export const getVideoByIdQuery=(videoId:string|undefined)=>{
    return useQuery({
        queryKey:['get-video-by-Id'],
        queryFn:()=>getVideoById(videoId)
    })
}
  
//subscribed channels
export const getSubscribedChannelsOuery=(subscriberId:string)=>{
        return useQuery({
                  queryKey:['subscribed_channels'],
                  queryFn:()=>getSubscribedChannels(subscriberId)
})
}
export const getVideoByChannelIdQuery =(channelId:string|undefined)=>{
       return useQuery({
        queryKey:['get_videos_by_channel'],
        queryFn:()=>getVideosByChannelId(channelId)
       }) 
}
export const getUserByChannelIdQuery =(channelId:string|undefined)=>{
    return useQuery({
     queryKey:['get_user_by_channel'],
     queryFn:()=>getUserByChannelId(channelId)
    })
}
export const toggleSubscriptionQuery = ()=>{
    queryClient.invalidateQueries({ queryKey: ['subscribed_channels'] })
    queryClient.invalidateQueries({ queryKey: ['get_videos_by_channel'] })
    queryClient.invalidateQueries({ queryKey: ['get-subscription-status'] })
      return useMutation({
        mutationFn: (channelId:string|undefined)=>toggleSubscription(channelId)
      })
}
export const getSubscriptionStatusQuery=(channelId:string|undefined)=>{
    return useQuery({
        queryKey:['get-subscription-status'],
        queryFn:()=>getSubscriptionStatus(channelId)
    })
}


//liked videos
export const getAllLikedVideosQuery = ()=>{
 return useQuery({
    queryKey:['get-all-liked-videos'],
    queryFn:getAllLikedVideos
 })
}
export const toggleVideoLikeQuery=()=>{
    queryClient.invalidateQueries({queryKey:['get-like-status']})
    queryClient.invalidateQueries({queryKey:['get-all-liked-videos']})
    queryClient.invalidateQueries({queryKey:['getvideolikecount']})
  return useMutation({
    mutationFn:(videoId:string)=>toggleVideoLike(videoId)
  })
}
export const getLikeStatusQuery=(videoId:string|undefined)=>{
    return useQuery({
        queryKey:['get-like-status'],
        queryFn:()=>getLikeStatus(videoId)
    })
}
export const getVideoLikeCountQuery=(videoId:string|undefined)=>{
    return useQuery({
        queryKey:['getvideolikecount'],
        queryFn:()=>getVideoLikeCount(videoId)
    })
}

 
// edit user
  export const updateAccountDetailsQuery=()=>{

    return useMutation({
        mutationFn:(userInfo:updateUserType)=>updateAccountDetails(userInfo)
    })
  }
 export const updateUserAvatarQuery=()=>{
      return useMutation({
        mutationFn:(avatar:File)=>updateUserAvatar(avatar)
      })
 }
 export const updateUserCoverImageQuery=()=>{
    return useMutation({
      mutationFn:(coverImage:File)=>updateUserCoverImage(coverImage)
    })
} 

//edit video 

export const togglePublishStatusQuery=()=>{
     queryClient.invalidateQueries({queryKey:['get-channel-videos']})
     queryClient.invalidateQueries({queryKey:['get-all-query']})
     queryClient.invalidateQueries({queryKey:['get_videos_by_channel']})
     queryClient.invalidateQueries({queryKey:['get-all-liked-videos']})
     
    return useMutation({
         mutationFn:(videoId:string)=>togglePublishStatus(videoId)
    })
}
export const deleteVideoQuery=()=>{
    queryClient.invalidateQueries({queryKey:['get-channel-videos']})
    queryClient.invalidateQueries({queryKey:['get-all-query']})
    queryClient.invalidateQueries({queryKey:['get_videos_by_channel']})
    queryClient.invalidateQueries({queryKey:['get-all-liked-videos']})
    queryClient.invalidateQueries({queryKey:['get-channel-videos']})
  
    return useMutation({
        mutationFn:(videoId:string)=>deleteVideo(videoId)
   })

}
export const editVideoQuery=()=>{
    queryClient.invalidateQueries({queryKey:['get-channel-videos']})
    queryClient.invalidateQueries({queryKey:['get-all-query']})
    queryClient.invalidateQueries({queryKey:['get_videos_by_channel']})
    queryClient.invalidateQueries({queryKey:['get-all-liked-videos']})
    queryClient.invalidateQueries({queryKey:['get-channel-videos']})
  
    return useMutation({
        mutationFn:(video_data)=>editVideo(video_data)
   })
}

//comment
export const getVideoCommentQuery=(videoId:string)=>{
         return useQuery({
            queryKey:['get-video-comments'],
            queryFn:()=>getVideoComment(videoId)
         })
}
export const addVideoCommentQuery =()=>{
    queryClient.invalidateQueries({queryKey:['get-video-comments']})
    return useMutation({
        mutationFn:({videoId,content}:{videoId:string,content:string})=>addVideoComment(videoId ,content)
    })
}
export const editVideoCommentQuery =()=>{
    queryClient.invalidateQueries({queryKey:['get-video-comments']})
return useMutation({
   mutationFn:({commentId,content}:{commentId:string,content:string})=>editVideoComment(commentId ,content)
})
}
export const deleteVideoCommentQuery =()=>{
    return useMutation({
       mutationFn:(commentId:string)=>deleteVideoComment(commentId )
    })
    }