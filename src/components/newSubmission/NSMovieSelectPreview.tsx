import Movie from "../../interfaces/Movie.ts";

interface MovieProp {
    movie: Movie,
    removeMovie: (movieId: number) => (void),
    moveMovieUp: (movieId: number) => (void),
    moveMovieDown: (movieId: number) => (void)
}

export const NSMovieSelectPreview = ({movie, removeMovie, moveMovieUp, moveMovieDown}: MovieProp) => {
    return (
        <div
            className="flex flex-col m-4 max-h-[520px] rounded-2xl overflow-clip border shadow-2xl">
            <div
                className="flex flex-col flex-grow max-h-[460px] overflow-clip">
                <button
                    onClick={() => removeMovie(movie.tmdb_id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 w-full transition"
                >Remove Movie
                </button>
                <div className="p-2">
                    <span className="font-semibold">{movie.title}</span> - {new Date(movie.release_date).getFullYear()}
                </div>
                <img
                    className="object-cover flex flex-grow"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                    alt={movie.title}
                />
            </div>
            <div className="flex flex-row justify-evenly">
                <button
                    onClick={() => moveMovieUp(movie.tmdb_id)}
                    className="bg-green-500 hover:bg-green-700 outline outline-1 outline-green-700 text-white font-semibold py-2 w-full transition"
                >Move Up
                </button>
                <button
                    onClick={() => moveMovieDown(movie.tmdb_id)}
                    className="bg-green-500 hover:bg-green-700 outline outline-1 outline-green-700 text-white font-semibold py-2 w-full transition"
                >Move Down
                </button>

            </div>
        </div>
    );
};
