import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularProgressBar from "../CircularProgressBar";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { groupBy } from "lodash";
import ImageComponent from "@components/Image";
import { useContext } from "react";
import { useModalContext } from "@context/ModalProvider";

const Banner = ({
  title,
  backdropPath,
  posterPath,
  certification,
  crews,
  releaseDate,
  genres,
  point = 0,
  overview,
  trailerVideoKey,
}) => {
  const { setIsShowing, setContent } = useModalContext();

  if (!title) return null;
  const groupedCrews = groupBy(crews, "job");

  //console.log({ crews, groupedCrews });
  return (
    <div className="relative overflow-hidden text-white shadow-sm shadow-slate-800">
      <ImageComponent
        src={`https://image.tmdb.org/t/p/original${backdropPath}`}
        width={1200}
        height={800}
        className="absolute inset-0 aspect-video h-full w-full brightness-[.2]"
      />
      <div className="relative mx-auto flex max-w-screen-xl gap-6 px-6 py-10 lg:gap-8">
        <div className="flex-1">
          <ImageComponent
            className="w-full"
            src={
              posterPath
                ? `https://image.tmdb.org/t/p/w500${posterPath}`
                : "/src/assets/PosterNoImage.svg"
            }
            width={600}
            height={900}
          />
        </div>
        <div className="flex-[2] text-[1.2vw]">
          <p className="mb-2 text-[2vw] font-bold">{title}</p>
          <div className="flex items-center gap-4">
            <span className="border border-gray-400 p-1 text-gray-400">
              {certification || "N/A"}
            </span>
            <p>{releaseDate}</p>
            <p>{(genres || []).map((genre) => genre.name).join(", ")}</p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CircularProgressBar
                percent={Math.round((point || 0) * 10)}
                strokeWidth={0.3}
                size={3.5}
              />
              Rating
            </div>
            <button
              onClick={() => {
                setIsShowing(true);
                setContent(
                  <iframe
                    title="Trailer"
                    src={`https://www.youtube.com/embed/${trailerVideoKey}`}
                    className="aspect-video w-[50vw]"
                  />,
                );
              }}
            >
              <FontAwesomeIcon icon={faPlay} className="mr-1" />
              Trailer
            </button>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-[1.3vw] font-bold">Overview</p>
            <p>{overview}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {Object.keys(groupedCrews).map((job) => (
              <div key={job}>
                <p className="font-bold">{job}</p>
                <p>{groupedCrews[job].map((crew) => crew.name).join(", ")} </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
