import {SubmissionMovie} from "../../interfaces/Submission.ts";
import {useNavigate} from "react-router-dom";

interface MovieProp {
    movie: SubmissionMovie
}

const SubmissionMoviePreview = ({movie}: MovieProp) => {
    const navigate = useNavigate();
    const {movie_info} = movie;
    const poster = `https://image.tmdb.org/t/p/w500${movie.poster ?? movie_info.poster}`;
    const image = `https://image.tmdb.org/t/p/w500${movie.image ?? movie_info.image}`;
    return (
        <div className="bg-gray-100 shadow-md rounded-md flex flex-col md:flex-row overflow-clip hover:cursor-pointer"
             onClick={() => navigate(`/movies/${movie.movie_id}`)}>
            {poster &&
                <img src={poster} alt={movie_info.title} className="w-48 object-cover hidden md:inline"/>}
            {image && <img src={image} alt={movie_info.title} className="h-48 object-cover inline md:hidden"/>}
            <div className="flex flex-col mx-4 mt-2 p-2 ">
                <h4 className="text-lg font-semibold">{movie_info.title}</h4>
                <span className="text-gray-500">{new Date(movie_info.release_date).toLocaleDateString()}</span>
                <div className="flex mt-2">
                    <p>{movie_info.description || 'No description available.'}</p>
                </div>
            </div>
        </div>
    );
};

export default SubmissionMoviePreview
