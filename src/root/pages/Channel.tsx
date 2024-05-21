import { useState } from "react";
import classes from "./UserChannel.module.css";

import {
  getSubscriptionStatusQuery,
  getUserByChannelIdQuery,
  getVideoByChannelIdQuery,
  toggleSubscriptionQuery,
} from "@/lib/react-query/queriesAndMutation";
import { Oval } from "react-loader-spinner";
import { videoType } from "@/types";
import Card from "@/components/shared/card/Card";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Channel() {
  const [nav, setNav] = useState("home");
  const params = useParams();

  //get user by channelID
  const {
    data: channelUser,
    isLoading: loadingUser,
    isError: isUserError,
    error: userError,
  } = getUserByChannelIdQuery(params.channelId);

  //get videos by channelID
  const {
    data: channelVideos,
    isLoading,
    isError,
    error,
  } = getVideoByChannelIdQuery(params.channelId);

  //toggle subscription
  const {
    data: subscribeStatus,
    mutateAsync: toggleSubscription,
    isPending: isSubscripitonPending,
    isError: isSubscripitonError,
    error: subscripitonError,
  } = toggleSubscriptionQuery();

  //get subscription status
  const { data: subsStatus } = getSubscriptionStatusQuery(params.channelId);

  return (
    <div className="w-[100%] h-[100%]">
      <div className={classes.content}>
        {loadingUser && (
          <div className="flex justify-center mt-2">
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
          </div>
        )}
        {isUserError && <div>{userError.message}</div>}
        {channelUser && (
          <div className={classes.userDetails}>
            {channelUser.coverImage && (
              <div className={classes.banner}>
                <img src={channelUser.coverImage} alt="remote Image" />
              </div>
            )}
            <div className={classes.user}>
              <img src={channelUser.avatar} alt="remote image" />
              <div className={classes.desc}>
                <h1 className="text-4xl text-black font-bold ">
                  {channelUser.username}
                </h1>
                <p className="text-sm">
                  {channelUser.fullName} . {channelUser.subscribersCount}{" "}
                  subscribers
                </p>
                <p className="mt-2 text-sm">
                  description will be here{" "}
                  <span className="text-black">...more</span>
                </p>
                <div className="mt-2">
                  <Button
                    onClick={() => toggleSubscription(params.channelId)}
                    className={`m-auto rounded-2xl h-9 ${
                      subsStatus?.length > 0 &&
                      "bg-gray-200 text-black hover:bg-gray-300"
                    }`}
                  >
                    {subsStatus?.length > 0 ? "Subscribed" : "Subscribe"}
                  </Button>
                </div>
              </div>
            </div>

            <div className={classes.navbar}>
              <ul>
                <li
                  className={`${nav === "home" && "border-b-2 border-black"}`}
                >
                  <button>Home</button>
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className={classes.userVideo}>
          {nav === "home" && (
            <div className={classes.home}>
              {isLoading && (
                <div className="flex justify-center mt-2">
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
                </div>
              )}
              {isError && <div>{error.message}</div>}
              {channelVideos && (
                <div className={classes.cardContainer}>
                  {channelVideos.map((video: videoType, index: number) => {
                    return (
                      video.isPublished && (
                        <div className={classes.card} key={index}>
                          <Card key={index} video={video} />
                        </div>
                      )
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Channel;
