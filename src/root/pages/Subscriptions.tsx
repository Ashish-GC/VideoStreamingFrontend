import classes from "./Subscription.module.css";
import { useContext, useEffect } from "react";
import { userContext } from "@/context/Context";
import UnAuthScreen from "@/components/shared/unAuthScreen/UnAuthScreen";
import {
  getSubscribedChannelsOuery,
  toggleSubscriptionQuery,
} from "@/lib/react-query/queriesAndMutation";
import { Oval } from "react-loader-spinner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Subscriptions() {
  const { user, isAuthenticated } = useContext(userContext);

  const subscriberId = user._id;
  const { data, isPending, isError, error } =
    getSubscribedChannelsOuery(subscriberId);

  const {
    data: subscribeStatus,
    mutateAsync: toggleSubscription,
    isPending: isSubscripitonPending,
    isError: isSubscripitonError,
    error: subscripitonError,
  } = toggleSubscriptionQuery();

  return (
    <div className="w-[100%] h-[100%]">
      {!isAuthenticated && (
        <UnAuthScreen
          title="Don't miss new videos"
          desc="Sign in to see updates from your favorite YouTube channels"
          screenLogo="subscription"
        />
      )}
      {isAuthenticated && (
        <div className={classes.main}>
          <div className={classes.subscribed}>
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
            {isError && <p>{error.message}</p>}
            {data &&
              data.map((channel: any) => {
                return (
                  <div className={classes.channel} key={channel._id}>
                    <Link to={`/channel/${channel.channel_details._id}`}>
                      <img
                        src={channel.channel_details.avatar}
                        alt="remote Image"
                      />
                    </Link>

                    <div className={classes.channel_content}>
                      <Link
                        to={`/channel/${channel.channel_details._id}`}
                        className={classes.desc}
                      >
                        <h1>{channel.channel_details.username}</h1>
                        <p>@{channel.channel_details.username}</p>
                        <p>description will be displayed here</p>
                      </Link>
                      <Button
                        onClick={() =>
                          toggleSubscription(channel.channel_details._id)
                        }
                        className={`text-black bg-gray-300 rounded-3xl hover:bg-gray-400 ${
                          subscribeStatus?.status === "Subscribed" &&
                          "bg-gray-200 text-black hover:bg-gray-300"
                        }`}
                      >
                        {"Subscribed"}
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* <div className={classes.content}>
       
      </div> */}
        </div>
      )}
    </div>
  );
}

export default Subscriptions;
