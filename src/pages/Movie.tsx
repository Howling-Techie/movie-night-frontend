import Movie from "../interfaces/Movie.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMovie, getMovieSubmissions} from "../services/API.ts";
import MovieSubmissionPreview from "../components/movies/MovieSubmissionPreview.tsx";
import Submission from "../interfaces/Submission.ts";

const MoviePage = () => {
    const {movie_id} = useParams();
    const [movie, setMovie] = useState<null | Movie>(null);
    const [submissions, setSubmissions] = useState<null | Submission[]>(null);

    useEffect(() => {
        const getMovieById = async () => {
            if (movie_id) {
                const {movie: movieResult} = await getMovie(+movie_id);
                setMovie(movieResult);
                const {submissions: submissionResults} = await getMovieSubmissions(+movie_id);
                setSubmissions(submissionResults);
            }
        }
        if (movie_id)
            getMovieById()
    }, [movie_id]);

    const formattedDuration = (duration: number) => {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        return `${hours}h ${minutes}min`;
    }

    return (
        <div>{movie && <div className="flex justify-center">
            <div className="flex-row flex w-full mt-8 max-w-7xl px-4 ">
                <div className="flex justify-center grow overflow-clip rounded-2xl max-w-[192px] h-72 ">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt={movie.title}
                         className="object-cover"/>
                </div>
                <div className="flex flex-col ml-4">
                    <div className="mt-4">
                        <h2 className="text-2xl font-semibold">{movie.title}</h2>
                        <p className="text-gray-600">
                            Release Date: {new Date(movie.release_date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">Duration: {formattedDuration(movie.duration)}</p>
                        <p className="mt-2">{movie.description || 'No description available.'}</p>
                    </div>
                    <div className="mt-4 flex space-x-4">
                        <a
                            href={`https://www.themoviedb.org/movie/${movie.movie_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            View on TMDB
                        </a>
                        {movie.letterboxd_url && (
                            <a
                                href={`https://letterboxd.com/film/${movie.letterboxd_url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-800 text-white px-4 py-2 rounded"
                            >
                                View on Letterboxd
                            </a>
                        )}
                        {movie.imdb_id && (
                            <a
                                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-yellow-500 text-black px-4 py-2 rounded"
                            >
                                View on IMDb
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
        }
            {submissions &&
                <div className="flex justify-center pb-8">
                    <div className="flex-col flex w-full mt-8 max-w-7xl px-4">
                        <div className="text-2xl font-semibold">Submission History</div>
                        {submissions.map((submission) => {
                            return <MovieSubmissionPreview submission={submission}/>
                        })}
                    </div>
                </div>}
        </div>
    );
};

export default MoviePage;
