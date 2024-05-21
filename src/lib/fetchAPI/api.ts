import { loginUserType, registerUserType, updateUserType, uploadVideoFormType, videoType } from "@/types"
import { paths } from "./routes";
import FormData from "form-data"

 

// Authentication

export const registerUser = async (data:registerUserType)=>{

   let formData:any =  new FormData();
     formData.append('avatar',data.avatar );
     formData.append('username',data.username);
     formData.append('fullName',data.fullName);
     formData.append('coverImage',data.coverImage);
     formData.append('email',data.email);
     formData.append('password',data.password);

      try{

        const response=  await fetch(`${paths.server}/users/register`, {
          method: 'POST', 
          body: formData, 
        })


          if(!response.ok){
             throw new Error("Unable to register User")
          } 
          const result:any = await response.json();
          
              
          return await result.data ;

      }catch(error){
        throw new Error("Unable to register User")
      }
     
}

export const singInUser = async(data:loginUserType)=>{
        try{
              const response = await fetch(`${paths.server}/users/login`,{
                method:'POST',
                body:JSON.stringify(data),
                headers:{
                  'Content-Type':'Application/json'
                }
              })
              if(!response.ok){
                throw new Error("request failed unable to login")
              }

              const user =await response.json();
              return  await user.data;
        }
        catch(err){
          throw new Error("Failed to login ")
        }
}

export const signOutUser = async()=>{
  try{
   const token= localStorage.getItem('accessToken');
          const response = await fetch(`${paths.server}/users/logout` , {
            method:'POST',
            headers:{
              'Authorization': `Bearer ${token}`
            }
          })
          
          if(!response.ok){
                 throw new Error("unable to singOut") 
          } 
        
          localStorage.setItem('accessToken','');
          

        const result = await response.json();
        return result;
  }
  catch(err){
    throw new Error("Unable to signout")
  }
}

export const getCurrentUser=async()=>{
  try{
     const token = localStorage.getItem('accessToken');

    const response =  await fetch(`${paths.server}/users/current-user `,{
      method:"GET",
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
      const result =await response.json();
        return result.data
  }
  catch(err){
    console.log(err);
  }
}


// Channel DashBoard

export const getChannelVideos =async()=>{
     try{
          const token = localStorage.getItem('accessToken');
          if(!token){
            throw new Error("unable to get token")
          }

          const response = await fetch(`${paths.server}/dashboard/videos`,{
            method:'GET',
            headers:{
              'Authorization':`Bearer ${token}`
            }
          }) 

             if(!response.ok){
              throw new Error("Failed to fetch channel videos");
             }

          const data = await response.json();
          const result= data.data;
          
          return result;

     }
     catch(err){
      throw new Error("Failed to fetch channel videos")
     }
}

export const getChannelStats= async()=>{
  try {
    const token = localStorage.getItem('accessToken');
    if(!token){
      throw new Error("unable to get token")
    }

    const response = await fetch(`${paths.server}/dashboard/stats`,{
      method:'GET',
      headers:{
        'Authorization':`Bearer ${token}`
      }
    }) 

       if(!response.ok){
        throw new Error("Failed to fetch channel videos");
       }

    const data = await response.json();

    console.log("stats",data);
      return data;

  } catch (error) {
    throw new Error("unable to fetch channel Stats")
  }
}

// videos 

 export const getAllVideos =async()=>{
  try {
           //query params later 
     
           const response = await fetch(`${paths.server}/videos`,{
            method:"GET",
           })

           if(!response.ok){
            throw new Error("unable to get videos")
           }

           const video= await response.json();
          
           return video.data;


  } catch (error) {
    throw new Error("unable to get videos")
  }
 }
 export const getSearchVideos =async(search:string|null)=>{
  try {
           //query params later 
     
           const response = await fetch(`${paths.server}/videos?query=${search}`,{
            method:"GET",
           })

           if(!response.ok){
            throw new Error("unable to get videos")
           }

           const video= await response.json();
          
           return video.data;


  } catch (error) {
    throw new Error("unable to get videos")
  }
 }

 export const uploadAVideo =async(videoData:uploadVideoFormType)=>{
              
          const formData:any = new FormData();
          const token = localStorage.getItem('accessToken');

          formData.append("title",videoData.title);
          formData.append("description",videoData.description);
          formData.append("thumbnail",videoData.thumbnail);
          formData.append("videoFile",videoData.videoFile);

          const response = await fetch(`${paths.server}/videos/`, {
            method:'POST',
            body:formData,
            headers:{
              'Authorization':`Bearer ${token}`
            }
          } )

          if(!response.ok){
            throw new Error("unable to upload file");
          }

          const data = await response.json();
          return  data.data ;
 }

 export const getVideoById = async(videoId:string|undefined)=>{
      
         const token = localStorage.getItem('accessToken');

         if(!videoId){
          throw new Error ("no video Id")
         }
     
         const response = await fetch(`${paths.server}/videos/${videoId}` ,{
          method:"GET",
          headers:{
            'Authorization':`Bearer ${token}`
          }
         }) 
           
          if(!response.ok){
                throw new Error("Video dosent exists ")
          } 
           
         const data = await  response.json();
         const result:videoType = data.data[0];
             
         return result ;
 }
export const getVideosByChannelId = async(channelId:string|undefined)=>{
  try { 
         const response = await fetch(`${paths.server}/videos/channel/${channelId}`,{
          method:'GET',
         })
             
          if(!response.ok){
             throw new Error("unable to fetch channel data")
          }

         const data = await response.json();
         return data.data;

  } catch (error) {
    throw new Error("channot fetch details of the channel")
  }
}
export const getUserByChannelId = async(channelId:string|undefined)=>{
  try { 
    const token = localStorage.getItem("accessToken")
         const response = await fetch(`${paths.server}/users/c/${channelId}`,{
          method:'GET',
          headers:{
            "Authorization":`Bearer ${token}`
          }
         })
             
          if(!response.ok){
             throw new Error("unable to fetch channel data")
          }

         const data = await response.json();
         return data.data;

  } catch (error) {
    throw new Error("channot fetch details of the channel")
  }
}
  
//subscriptions
export const getSubscribedChannels=async(subscriberId:string)=>{
  try {
         const token = localStorage.getItem('accessToken');

         const response = await fetch(`${paths.server}/subscriptions/u/${subscriberId}`,{
          method:'GET',
          headers:{
            'Authorization':`Bearer ${token}`
          }
         })

         if(!response.ok){
          throw new Error('no response . cannot get subscribed channels ');
         }

         const data =await response.json();
         
         return  data.data
          
  } catch (error) {
   throw new Error('cannot get subscribed channels ');
  }
}
export const toggleSubscription = async(channelId:string|undefined)=>{
  try {
         const token= localStorage.getItem('accessToken');

      const response = await fetch(`${paths.server}/subscriptions/c/${channelId}`,{
        method:"POST",
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })

      const data = await response.json();

      return data.data;
  } catch (error) {
    throw new Error(`unable to handle subscription ${error}`);
  }
}
export const getSubscriptionStatus = async(channelId:string|undefined)=>{
  try {
    const token = localStorage.getItem('accessToken')

    const response= await  fetch(`${paths.server}/subscriptions/s/${channelId}` , {
      headers:{
        'Authorization':`Bearer ${token}`
      }
    });
    
    if(!response.ok){
      throw new Error("response.cannot fetch subscription Status")
    }
    const data =await response.json();
     
     return data.data;

  } catch (error) {
    throw new Error("cannot fetch subscription Status")
  }
}

//liked
export const getAllLikedVideos = async()=>{
 try {

  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${paths.server}/likes/videos` ,{
    headers:{
      "Authorization":`Bearer ${token}`
    }
  })

 if(!response.ok){
  throw new Error("res ->unable to fetch liked videos")
 }

  const data=await response.json();
  return data.data;

 } catch (error) {
   throw new Error("unable to fetch liked videos")
 }
}

export const toggleVideoLike = async(videoId:string)=>{
 try {
       const token= localStorage.getItem("accessToken");
      
       const response =await fetch(`${paths.server}/likes/toggle/v/${videoId}`,{
        method:"POST",
        headers:{
          "Authorization":`Bearer ${token}`
        }
       })

      if(!response.ok){
        throw new Error("res->unable to toggle like")
      }

      const data=await response.json();
      return data.data;

 } catch (error) {
  throw new Error("unable to toggle like")
 }
}
export const getLikeStatus = async(videoId:string|undefined)=>{
  try {
    const token= localStorage.getItem("accessToken");
      
    const response =await fetch(`${paths.server}/likes/status/${videoId}`,{
     method:"GET",
     headers:{
       "Authorization":`Bearer ${token}`
     }
    })

   if(!response.ok){
     throw new Error("res->unable to get like status")
   }

   const data=await response.json();
   return data.data;
    
  } catch (error) {
    throw new Error("unable to get status")
  }
} 
export const getVideoLikeCount= async(videoId:string|undefined)=>{
  try {
    const token= localStorage.getItem("accessToken");
      
    const response =await fetch(`${paths.server}/likes/videos/like-count/${videoId}`,{
     method:"GET",
     headers:{
       "Authorization":`Bearer ${token}`
     }
    })

   if(!response.ok){
     throw new Error("res->unable to get like count")
   }

   const data=await response.json();
   return data.data[0].likeCount;
    
  } catch (error) {
    throw new Error("unable to get like count")
  }
} 


 
//edit user
  export  const updateAccountDetails = async( userInfo:updateUserType )=>{
      try {
             const token = localStorage.getItem("accessToken");
             const response = await fetch(`${paths.server}/users/update-account`,{
              method:"PATCH",
              body:JSON.stringify(userInfo),
              headers:{
                "Authorization":`Bearer ${token}` ,
                "Content-Type": "application/json"  
              }
             })
              if(!response.ok){
                throw new Error("res->cannot update Account Details")
              }

             const data = await response.json();
             return data.data;

      } catch (error) {
        throw new Error("cannot update Account Details")
      }
     }
export const updateUserAvatar =async(avatar:File)=>{
          
  try {

         const formdata:any = new FormData();
         formdata.append('avatar' ,avatar);
            console.log(formdata);
         const token = localStorage.getItem("accessToken");

         const response = await fetch(`${paths.server}/users/avatar`,{
          method:'PATCH',
          body:formdata,
          headers:{
            "Authorization":`Bearer ${token}`,
          }
         })

         if(!response.ok){
          throw new Error("res->cannot update user avatar")
         }

         const data= await response.json();
         console.log(data);
         return data.data;
    
  } catch (error) {
    throw new Error("cannot update user avatar")
  }
}
export const updateUserCoverImage =async(coverImage:File)=>{
          
  try {

         const formdata:any = new FormData();
         formdata.append('coverImage' ,coverImage);
            console.log(formdata);
         const token = localStorage.getItem("accessToken");

         const response = await fetch(`${paths.server}/users/cover-image`,{
          method:'PATCH',
          body:formdata,
          headers:{
            "Authorization":`Bearer ${token}`,
          }
         })

         if(!response.ok){
          throw new Error("res->cannot update user coverImage")
         }

         const data= await response.json();
         console.log(data);
         return data.data;
    
  } catch (error) {
    throw new Error("cannot update user coverImage")
  }
} 

//edit video 

export const togglePublishStatus = async(videoId:string)=>{
  try {
    const token = localStorage.getItem('accessToken');

    if(!videoId){
     throw new Error ("no video Id")
    }

    const response = await fetch(`${paths.server}/videos/toggle/publish/${videoId}` ,{
     method:"PATCH",
     headers:{
       'Authorization':`Bearer ${token}`
     }
    }) 
      
     if(!response.ok){
           throw new Error("res->unable to publish video ")
     } 
      
    const data = await  response.json();   
    return data.data;

  } catch (error) {
    throw new Error("unable to publish video ")
  }
}
export const deleteVideo = async(videoId:string)=>{
  try {
    const token = localStorage.getItem('accessToken');

    if(!videoId){
     throw new Error ("no video Id")
    }

    const response = await fetch(`${paths.server}/videos/${videoId}` ,{
     method:"DELETE",
     headers:{
       'Authorization':`Bearer ${token}`
     }
    }) 
      
     if(!response.ok){
           throw new Error("res->unable to delete video ")
     } 
      
    const data = await  response.json();   
    return data.data;

  } catch (error) {
    throw new Error("unable to delete video ")
  }
}
export const editVideo = async(video_data:any)=>{
  try {
    const token = localStorage.getItem('accessToken');

     const formdata:any = new FormData();
         
         formdata.append('thumbnail',video_data.thumbnail);
         formdata.append('title',video_data.title);
         formdata.append('description',video_data.description);


    const response = await fetch(`${paths.server}/videos/${video_data.videoId}` ,{
     method:"PATCH",
     body:formdata,
     headers:{
       'Authorization':`Bearer ${token}`
     }
    }) 
      
     if(!response.ok){
           throw new Error("res->unable to edit video ")
     } 
      
    const data = await  response.json();   
    return data.data;

  } catch (error) {
    throw new Error("unable to edit video ")
  }
}


//comment

export const addVideoComment = async(videoId:string,content:string)=>{
  try {
    const token = localStorage.getItem('accessToken');

    if(!videoId){
     throw new Error ("no video Id")
    }
    
    const comment = {content }

    const response = await fetch(`${paths.server}/comments/${videoId}` ,{
     method:"POST",
     body:JSON.stringify(comment),
     headers:{
       'Authorization':`Bearer ${token}`,
       'Content-Type':"application/json"
     }
    }) 
      
     if(!response.ok){
           throw new Error("res->unable to add comment ")
     } 
      
    const data = await  response.json();   
  
    return data.data;

  } catch (error) {
    throw new Error("unable to add video comments ")
  }
}
export const getVideoComment = async(videoId:string)=>{
  try {
    const token = localStorage.getItem('accessToken');

    if(!videoId){
     throw new Error ("no video Id")
    }

    const response = await fetch(`${paths.server}/comments/${videoId}` ,{
     method:"GET",
     headers:{
       'Authorization':`Bearer ${token}`
     }
    }) 
      
     if(!response.ok){
           throw new Error("res->unable to get video comment ")
     } 
      
    const data = await  response.json();   
   
    return data.data;

  } catch (error) {
    throw new Error("unable to get video comments ")
  }
}
export const editVideoComment = async(commentId:string,content:string)=>{
  try {
    const token = localStorage.getItem('accessToken');

    if(!commentId){
     throw new Error ("no video Id")
    }
    const editData = {content :content}

    const response = await fetch(`${paths.server}/comments/c/${commentId}` ,{
     method:"PATCH",
     body:JSON.stringify(editData),
     headers:{
       'Authorization':`Bearer ${token}`,
       'Content-Type':'application/json'
     }
    }) 
      
     if(!response.ok){
           throw new Error("res->unable to edit video comment ")
     } 
      
    const data = await  response.json();   
  
    return data.data;

  } catch (error) {
    throw new Error("unable to edit video comments ")
  }
}
export const deleteVideoComment = async(commentId:string)=>{
  try {
    const token = localStorage.getItem('accessToken');

    if(!commentId){
     throw new Error ("no video Id")
    }

    const response = await fetch(`${paths.server}/comments/c/${commentId}` ,{
     method:"DELETE",
     headers:{
       'Authorization':`Bearer ${token}`
     }
    }) 
      
     if(!response.ok){
           throw new Error("res->unable to delete video comment ")
     } 
      
    const data = await  response.json();   
    return data.data;

  } catch (error) {
    throw new Error("unable to delete video comments ")
  }
}