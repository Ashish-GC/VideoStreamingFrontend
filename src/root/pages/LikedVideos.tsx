import classes from "./LikedVideos.module.css";
import { Oval } from "react-loader-spinner";
import Card from "@/components/shared/card/Card";
import { getAllLikedVideosQuery } from "@/lib/react-query/queriesAndMutation";

function LikedVideos() {
  const {
    data: likedVideos,
    isLoading,
    isError,
    error,
  } = getAllLikedVideosQuery();

  return (
    <div className="w-[100%] h-[100%]">
      <div className={classes.main}>
        {isLoading && (
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
        {likedVideos &&
          likedVideos.map((likedvideo: any, index: number) => {
            return (
              likedvideo.video[0].isPublished && (
                <div className={classes.card} key={index}>
                  <Card video={likedvideo.video[0]} />
                </div>
              )
            );
          })}
      </div>
    </div>
  );
}

export default LikedVideos;
