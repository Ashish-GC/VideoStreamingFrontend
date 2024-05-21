import { useEffect, useState } from "react";
import classes from "./ManageVideos.module.css";
import {
  deleteVideoQuery,
  getChannelVideosQuery,
  togglePublishStatusQuery,
} from "@/lib/react-query/queriesAndMutation";
import { Oval } from "react-loader-spinner";
import { videoType } from "@/types";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import EditVideo from "@/components/shared/editVideo/EditVideo";

function ManageVideos() {
  // const [nav, setNav] = useState("videos");
  const {
    data: channelVideos,
    isPending,
    isError,
    error,
  } = getChannelVideosQuery();

  const {
    mutateAsync: togglePublish,
    data: publishStatus,
    isPending: publishPending,
    isError: publishIsError,
    error: publishError,
  } = togglePublishStatusQuery();
  const {
    mutateAsync: deleteVideo,
    data: deleteVideoStatus,
    isPending: deletePending,
    isError: deleteIsError,
    error: deleteError,
  } = deleteVideoQuery();

  //notification
  const { toast } = useToast();

  //publish
  const togglePublishHandler = (videoId: string) => {
    togglePublish(videoId);
  };
  // delete
  const deleteVideoHandler = (videoId: string) => {
    deleteVideo(videoId);
  };

  useEffect(() => {
    if (publishStatus === true) {
      toast({
        description: "video published",
      });
    } else if (publishStatus === false) {
      toast({
        description: "video unpublished",
      });
    } else if (deleteVideoStatus) {
      toast({
        description: "video deleted",
      });
    }
  }, [publishStatus, deleteVideoStatus]);

  return (
    <div className={classes.main}>
      <h1 className=" text-base md:text-2xl ml-4 font-[500]">Channel Content</h1>
      <nav className="md:mt-3 w-[100%]">
        <ul className="flex mt-1 md:mt-3 justify-between w-[100%] pl-3 pr-3 border-b-2 border-gray-200">
          <li
            // onClick={() => setNav("videos")}
            // className={`${
            //   nav === "video" && "border-b-4 border-blue-600 text-blue-600"
            // } p-2 cursor-pointer text-sm`}
            className="p-2 cursor-pointer text-sm text-blue-600"
          >
            Videos
          </li>
        </ul>
      </nav>

      <div className={classes.content}>
        {isPending && (
          <Oval
            visible={true}
            height="35"
            width="35"
            color="blue"
            secondaryColor="blue"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
        {isError && <h1>{error.message}</h1>}
        {channelVideos &&
          channelVideos.map((video: videoType, index: number) => {
            return (
              <div key={index} className="flex w-[100%]  justify-around lg:flex-row flex-col ">
                <div className="flex gap-4 flex-[70%] ">
                  <Link to={`/video/${video._id}`}>
                    <img
                      className="w-20 h-14 lg:w-44 lg:h-24 rounded"
                      src={video.thumbnail}
                      alt="remoteImage"
                    />
                  </Link>
                  <div className="flex justify-center  flex-col ">
                    <p className="text-xs md:text-base">Title : {video.title}</p>
                    <p className="text-xs md:text-base">Description : {video.description}</p>
                  </div>
                </div>
                <div className="flex gap-2 md:gap-4 justify-center items-center flex-[30%] ">
                  <label
                    className="cursor-pointer flex gap-2 text-sm lg:text-base"
                    htmlFor="publish"
                  >
                    <input
                      onClick={() => togglePublishHandler(video._id)}
                      name="publish"
                      type="checkbox"
                      defaultChecked={
                        publishStatus ? publishStatus : video.isPublished
                      }
                    />
                    publish
                  </label>
                  <EditVideo video={video} />
                  <button
                    onClick={() => deleteVideoHandler(video._id)}
                    className="bg-red-600 p-1 pl-2 pr-2 text-xs lg:text-base  hover:bg-red-500 text-white lg:p-2 rounded-md lg:pl-4 lg:pr-4"
                  >
                    delete
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ManageVideos;
