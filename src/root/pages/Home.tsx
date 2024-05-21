import Card from "@/components/shared/card/Card";
import classes from "./Home.module.css";
import { getAllVideoQuery } from "@/lib/react-query/queriesAndMutation";
import { videoType } from "@/types";
import { Oval } from "react-loader-spinner";

function Home() {
  const { data: getAllVideos, isLoading, isError, error } = getAllVideoQuery();

  return (
    <div className="w-[100%] h-[100%]">
      <div className={classes.main}>
        {isLoading && (
          <Oval
            visible={true}
            height="35"
            width="35"
            color="gray"
            secondaryColor="gray"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
        {isError && <p className="text-gray-800">{error.message}</p>}
        {getAllVideos &&
          getAllVideos.map((video: videoType, index: number) => {
            return (
              video.isPublished && (
                <div className={classes.card} key={index}>
                  <Card video={video} />
                </div>
              )
            );
          })}
      </div>
    </div>
  );
}

export default Home;
