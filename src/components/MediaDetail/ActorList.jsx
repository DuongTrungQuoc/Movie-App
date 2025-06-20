import { useState } from "react";
import ActorInfo from "./ActorInfo";

const ActorList = ({ actors = [] }) => {
  const [isShowMore, setIsShowMore] = useState(false);

  const currentActors = isShowMore ? actors.slice(0, 32) : actors.slice(0, 4);

  return (
    <>
      <div>
        <p className="mb-4 text-[1.4vw] font-bold">Actors</p>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
          {currentActors.map((actor) => (
            <ActorInfo
              key={actor.id}
              id={actor.id}
              name={actor.name}
              character={actor.character}
              profilePath={actor.profile_path}
              episodeCount={actor.episodeCount}
            />
          ))}
        </div>
        <p
          onClick={() => setIsShowMore(!isShowMore)}
          className="mt-1 cursor-pointer text-[1.3vw]"
        >
          {isShowMore ? "Show less" : "Show more"}
        </p>
      </div>
    </>
  );
};
export default ActorList;
