import {
  getLikeStatusQuery,
  getSubscriptionStatusQuery,
  getVideoByIdQuery,
  getVideoLikeCountQuery,
  toggleSubscriptionQuery,
  toggleVideoLikeQuery,
} from "@/lib/react-query/queriesAndMutation";
import { Link, useParams } from "react-router-dom";
import classes from "./Video.module.css";
import ReactPlayer from "react-player";
import { AiOutlineLike } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { userContext } from "@/context/Context";
// import { BiDislike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { dateformatter } from "@/components/shared/card/dateformatter";
import Comment from "@/components/shared/comment/Comment";
import { Oval } from "react-loader-spinner";

function Video() {
  const params = useParams();
  const {
    data: videoData,
    isPending,
    isError,
    error,
  } = getVideoByIdQuery(params.videoId);

  const { user } = useContext(userContext);

  const {
    data: subscribeStatus,
    mutateAsync: toggleSubscription,
    isPending: isSubscripitonPending,
    isError: isSubscripitonError,
    error: subscripitonError,
  } = toggleSubscriptionQuery();

  //get subscription status
  const { data: subsStatus } = getSubscriptionStatusQuery(videoData?.owner);

  //liked videos
  const { mutateAsync: toggleLike, data: likeStatus } = toggleVideoLikeQuery();
  const { data: isLiked } = getLikeStatusQuery(params.videoId);

  const ytDate = dateformatter(videoData ? videoData.createdAt : "");

  const { data: likeCount } = getVideoLikeCountQuery(params.videoId);

  return (
    <div className={classes.container}>
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
      {!isPending && isError && !videoData && (
        <div>
          <p>{error.message}</p>
        </div>
      )}
      {videoData && !isPending && (
        <>
          <div className={classes.video}>
            <ReactPlayer
              url={videoData.videoFile}
              light={videoData.thumbnail}
              playing
              controls
              className={classes.videoPlayer}
              height={"60vh"}
              width={"60vw"}
            />
          </div>
          <div className={classes.content}>
            <p className={classes.title}>{videoData?.title}</p>
            <div className={classes.ownerInfo}>
              <div className={classes.ownerContainer}>
                <Link
                  to={
                    user._id === videoData.owner
                      ? `/userChannel`
                      : `/channel/${videoData.owner}`
                  }
                >
                  <img
                    src={videoData.owner_details[0]?.avatar}
                    alt="remoteImage"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-sm text-black sm:text-xl md:text-2xl">
                      {videoData.owner_details[0]?.username}
                    </h1>
                    <p className="text-gray-500 text-[0.80rem]">
                      {" "}
                      {/* 3 subscribers */}
                    </p>
                  </div>
                </Link>
                {user._id != videoData.owner && (
                  <Button
                    onClick={() => toggleSubscription(videoData.owner)}
                    className={`rounded-2xl pt-0 pb-0 pl-2 pr-2  md:pt-1.5 md:pb-1.5 md:pl-3 md:pr-3 text-[0.60rem] md:text-[0.80rem] ${
                      subsStatus?.length > 0 &&
                      "bg-gray-200 text-black hover:bg-gray-300"
                    }`}
                  >
                    {subsStatus?.length > 0 ? "Subscribed" : "Subscribe"}
                  </Button>
                )}
              </div>

              <div className="flex items-center">
                <Button
                  onClick={() => toggleLike(videoData._id)}
                  className={`flex gap-1 border-2  bg-gray-200 hover:bg-gray-300 pl-3 pr-3  rounded-3xl align`}
                >
                  {isLiked?.length > 0 ? (
                    <AiFillLike size={15} color={"black"} />
                  ) : (
                    <AiOutlineLike size={15} color={"black"} />
                  )}

                  <p className="text-gray-900 text-sm">
                    {likeCount ? likeCount : "0"}
                  </p>
                </Button>
              </div>
            </div>
            <div className={classes.description}>
              <div className={classes.views}>
                <p>{videoData?.views} views</p>
                <p>{ytDate}</p>
              </div>
              <p>{videoData?.description}</p>
            </div>

            {/* Comments */}

            <Comment videoData={videoData} />
          </div>
        </>
      )}
    </div>
  );
}

export default Video;
