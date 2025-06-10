import CircularProgressBar from "@components/CircularProgressBar";
import ImageComponent from "@components/Image";
import { useState } from "react";

const SeasonList = ({ seasons = [] }) => {
  const [isShowMore, setIsShowMore] = useState(false);

  const currentSeason = isShowMore ? seasons : seasons.slice(0, 2);

  return (
    <>
      <div className="mt-8 text-[1.3vw]">
        <p className="mb-4 text-[1.4vw] font-bold">Seasons</p>
        <div className="space-y-4">
          {currentSeason.map((season) => (
            <div
              key={season.id}
              className="flex gap-4 rounded-lg border border-slate-200 shadow-md"
            >
              <ImageComponent
                src={
                  season.poster_path
                    ? `https://media.themoviedb.org/t/p/w300${season.poster_path}`
                    : "https://placehold.co/130x195?text=N/A"
                }
                width={130}
                height={195}
                className="w-1/4 rounded-lg"
              />
              <div className="space-y-1">
                <p className="text-[1.4vw] font-bold">{season.name}</p>
                <div className="flex items-center gap-2">
                  <p className="font-bold">Rating</p>
                  <CircularProgressBar
                    percent={Math.round(season.vote_average * 10)}
                    size={2.5}
                    strokeWidth={0.25}
                  />
                </div>
                <p>
                  <span className="font-bold">Release Date:</span>{" "}
                  {season.air_date}
                </p>
                <p>{season.episode_count} Eposodes</p>
                <p>{season.overview}</p>
              </div>
            </div>
          ))}
        </div>
        <p
          onClick={() => setIsShowMore(!isShowMore)}
          className="mt-1 cursor-pointer"
        >
          {isShowMore ? "Show less" : "Show more"}
        </p>
      </div>
    </>
  );
};
export default SeasonList;
