import { useContext, useState } from "react";
import classes from "./UserChannel.module.css";
import UnAuthScreen from "@/components/shared/unAuthScreen/UnAuthScreen";
import { userContext } from "@/context/Context";
import Create from "@/components/shared/createContent/Create";
import { getChannelVideosQuery } from "@/lib/react-query/queriesAndMutation";
import { Oval } from "react-loader-spinner";
import { videoType } from "@/types";
import Card from "@/components/shared/card/Card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function UserChannel() {
  const [nav, setNav] = useState("home");
  const { user, isAuthenticated } = useContext(userContext);

  const {
    data: channelVideos,
    isLoading,
    isError,
    error,
  } = getChannelVideosQuery();

  return (
    <div className="w-[100%] h-[100%]">
      {!isAuthenticated && (
        <UnAuthScreen
          title="Enjoy your favorite videos"
          desc="Sign in to access videos that you’ve liked or saved"
          screenLogo="user"
        />
      )}
      {isAuthenticated && (
        <div className={classes.content}>
          <div className={classes.userDetails}>
            {user.coverImage && (
              <div className={classes.banner}>
                <img src={user.coverImage} alt="remote Image" />
              </div>
            )}
            <div className={classes.user}>
              <img src={user.avatar} alt="remote image" />
              <div className={classes.desc}>
                <h1 className="text-sm md:text-4xl text-black font-bold ">
                  {user.username}
                </h1>
                <p className="text-xs md:text-sm">{user.fullName} . 3 subscribers</p>
                <p className="mt-2 text-xs md:text-sm">
                  {user.description ? user.description : ""}
                  {/* <span className="text-black">...more</span> */}
                </p>
                <div className={classes.userDashboard}>
                  <Button className="text-xs md:text-sm rounded-2xl  text-black bg-gray-200 hover:bg-gray-300">
                    <Link to="/userChannel/customizeChannel">
                      Customize channel
                    </Link>
                  </Button>
                  <Button className=" text-xs md:text-sm rounded-2xl text-black bg-gray-200 hover:bg-gray-300">
                    <Link to="/userChannel/manageVideos">Manage Videos</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className={classes.navbar}>
              <ul>
                <li
                  className={`${nav === "home" && "border-b-2 border-black"}`}
                >
                  <button onClick={() => setNav("home")}>Home</button>
                </li>
                <li
                  className={`${nav === "create" && "border-b-2 border-black"}`}
                >
                  <button onClick={() => setNav("create")}>
                    Create Videos
                  </button>
                </li>
                {/* <li
                  className={`${nav === "manageVideos" && "border-b-2 border-black"}`}
                >
                  <button onClick={() => setNav("manageVideos")}>Manage Videos</button>
                </li>
                <li
                  className={`${nav === "customize" && "border-b-2 border-black"}`}
                >
                  <button onClick={() => setNav("customize")}>Customize channel</button>
                </li> */}
              </ul>
            </div>
          </div>
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
                        <div className={classes.card} key={index}>
                          <Card key={index} video={video} />
                        </div>
                      );
                    })}
                  </div>
                 )}
                {!channelVideos && !isError && !isLoading && <Create />}
              </div>
            )}
            {nav === "create" && (
              <div className={classes.create}>
                <Create />
              </div>
            )}
            {/* {nav === "manageVideos" && (
              <div className={classes.create}>
                <Create />
              </div>
            )}
              {nav === "customize" && (
              <div className={classes.create}>
                <Create />
              </div>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserChannel;
