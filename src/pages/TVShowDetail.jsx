import { useParams } from "react-router-dom";
import Loading from "@components/Loading";
import Banner from "@components/MediaDetail/Banner";
import ActorList from "@components/MediaDetail/ActorList";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import useFetch from "@hooks/useFetch";
import TVShowInformation from "@components/MediaDetail/TVShowInformation";
import SeasonList from "@components/MediaDetail/SeasonList";

const TVShowDetail = () => {
  const { id } = useParams();

  const { data: tvInfo, isLoading } = useFetch({
    url: `/tv/${id}?append_to_response=content_ratings,aggregate_credits,videos`,
    method: "GET",
  });
  //chuột phải vào crew-> store-> console.table(temp1) -> temp2 = temp1.map(t => ({...t, jobs: JSON.stringify(t.jobs)}))
  const { data: recommandationResponse, isLoading: isRecommandationLoading } =
    useFetch({
      url: `/tv/${id}/recommendations`,
      method: "GET",
    });
  const relatedTVshow = recommandationResponse.results || [];

  const certification = (tvInfo.content_ratings?.results || []).find(
    (result) => result.iso_3166_1 === "US",
  )?.rating;

  const crews = (tvInfo.aggregate_credits?.crew || [])
    .filter((crew) => {
      const jobs = (crew.jobs || []).map((j) => j.job);
      return ["Director", "Writer"].some((job) => jobs.find((j) => j === job));
    })
    .slice(0, 5)
    .map((crew) => ({ id: crew.id, job: crew.jobs[0].job, name: crew.name }));

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div>
        <Banner
          title={tvInfo.name}
          backdropPath={tvInfo.backdrop_path}
          posterPath={tvInfo.poster_path}
          overview={tvInfo.overview}
          point={tvInfo.vote_average}
          releaseDate={tvInfo.first_air_date}
          genres={tvInfo.genres}
          certification={certification}
          crews={crews}
          trailerVideoKey={
            (tvInfo.videos?.results || []).find(
              (video) => video.type === "Trailer",
            )?.key
          }
        />
        <div className="bg-black text-[1.2vw] text-white">
          <div className="mx-auto flex max-w-screen-xl gap-6 px-6 py-10 sm:gap-8">
            <div className="flex-[2]">
              <ActorList
                actors={(tvInfo.aggregate_credits?.cast || []).map((cast) => ({
                  ...cast,
                  character: cast.roles[0]?.character,
                  episodeCount: cast.roles[0]?.episode_count,
                }))}
              />
              <SeasonList seasons={(tvInfo.seasons || []).reverse()} />
              <RelatedMediaList
                mediaList={relatedTVshow}
                isLoading={isRecommandationLoading}
              />
            </div>
            <div className="flex-1">
              <TVShowInformation tvInfo={tvInfo} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TVShowDetail;
