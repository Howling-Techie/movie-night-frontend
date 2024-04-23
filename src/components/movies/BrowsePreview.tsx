import Movie from "../../interfaces/Movie.ts";

interface MovieProp {
    movie: Movie
}

export const BrowsePreview = ({movie}: MovieProp) => {
    return (
        <a
            className="flex flex-col m-4 w-48 min-h-80 rounded-2xl overflow-hidden border shadow-2xl hover:cursor-pointer"
            href={`/movies/${movie.id}`}>
            <img
                className="object-cover w-48"
                src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                alt={movie.title}
            />
            <div className="font-bold p-2 pb-0">
                {movie.title}
            </div>
            <div className="font p-2 pt-0">
                {new Date(movie.release_date).getFullYear()}
            </div>
        </a>
    );
};
