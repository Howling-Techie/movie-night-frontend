import Movie from "../interfaces/Movie.ts";

interface MovieProp {
    movie: Movie
}

export const MoviePreview = ({movie}: MovieProp) => {
    return (
        <div className="mx-auto bg-surface rounded-xl overflow-hidden w-full max-w-2xl">
            <div className="md:flex">
                {movie.poster && (
                    <div className="md:flex-shrink-0">
                        <img
                            className="object-cover w-48"
                            src={`https://image.tmdb.org/t/p/w780${movie.poster}`}
                            alt={movie.title}
                        />
                    </div>
                )}
                <div className="flex flex-col w-full max-h-[288px] h-[288px]  p-4">
                    <div className="tracking-wide flex text-lg font-semibold">
                        {movie.title}
                    </div>
                    <p className="flex text-xs my-1">
                        {new Date(movie.release_date).getFullYear()}
                    </p>
                    <div className="flex text-xs my-1">
                        <p className="">{movie.duration} minutes</p>
                    </div>
                    <div className="flex shrink overflow-scroll">
                        <p className="text-sm">{movie.description || 'No description available'}</p>
                    </div>
                    <div className="flex-row flex justify-end">
                        <div className="bg-background rounded-2xl px-2 py-1 mx-2 font-semibold">TMDB</div>
                        {movie.imdb_id &&
                            <div className="bg-background rounded-2xl px-2 py-1 mx-2 font-semibold">IMDB</div>}
                        <div className="bg-background rounded-2xl px-2 py-1 mx-2 font-semibold">Details</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
