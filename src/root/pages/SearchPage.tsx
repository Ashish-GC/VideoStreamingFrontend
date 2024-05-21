import Card from '@/components/shared/card/Card';
import { videoType } from '@/types';
import { Oval } from 'react-loader-spinner';
import classes from './SearchPage.module.css'
import {  getSearchVideoQuery } from '@/lib/react-query/queriesAndMutation';
import { useSearchParams } from 'react-router-dom';


function SearchPage() {
 
  const [searchParams] = useSearchParams();

    const { data: getAllVideos, isPending, isError, error } = getSearchVideoQuery( searchParams.get('query') );

    return (
      <div className="w-[100%] h-[100%]">
        <div className={classes.main}>
          {isPending && (
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

export default SearchPage
