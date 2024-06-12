import Movie from "../../interfaces/Movie.ts";

interface MovieProp {
    movie: Movie
    selectMovie: (movieId: number) => (void),
}

const SubmissionMoviePreview = ({movie, selectMovie}: MovieProp) => {
    const image = `https://image.tmdb.org/t/p/w500${movie.image}`;
    return (
        <div className="bg-gray-100 shadow-md rounded-md flex flex-col overflow-clip">
            {image && <img src={image} alt={movie.title} className="h-48 object-cover inline"/>}
            <div className="flex flex-col mx-2 mt-2 p-2 flex-grow">
                <div>
                    <h4 className="text-lg font-semibold">{movie.title}</h4>
                    <span
                        className="text-gray-500">{new Date(movie.release_date).getFullYear()}
                    </span>
                </div>
                <div className="mt-2 h-24 flex flex-grow overflow-scroll">
                    <p>{movie.description || "No description available."}</p>
                </div>
            </div>
            <button
                onClick={() => selectMovie(movie.tmdb_id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-md w-full transition"
            >Add Movie
            </button>
        </div>
    );
};

export default SubmissionMoviePreview;
