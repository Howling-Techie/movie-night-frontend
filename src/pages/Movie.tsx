import Movie from "../interfaces/Movie.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMovie, getMovieSubmissions} from "../services/API.ts";
import MovieSubmissionPreview from "../components/movies/MovieSubmissionPreview.tsx";
import Submission from "../interfaces/Submission.ts";
import {Container} from "../components/Container.tsx";

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
        <div
            className="-mt-1 pt-1 w-full">
            {movie && movie.image &&
                <>
                    <div
                        className="absolute -z-20 w-full h-[768px] overflow-clip">
                        <img src={"https://image.tmdb.org/t/p/original" + movie.image} alt="Background image"
                             className="w-full blur-sm object-cover"/>
                    </div>
                    <div
                        className="absolute -z-10 w-full h-[768px] bg-gradient-to-b from-gray-800 to-white mix-blend-screen">
                    </div>
                </>}
            <Container>
                {movie &&
                    <div
                        className="flex flex-row bg-opacity-70 bg-white p-0 pr-8 shadow-md rounded-md border overflow-clip">
                        <div className="hidden md:flex md:w-1/5">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt={movie.title}
                                 className="object-cover"/>
                        </div>
                        <div className="flex w-full md:w-4/5 flex-col ml-4">
                            <div className="mt-4">
                                <h2 className="text-2xl font-semibold">{movie.title}</h2>
                                <p className="text-gray-600">
                                    Release Date: {new Date(movie.release_date).toLocaleDateString()}
                                </p>
                                <p className="text-gray-600">Duration: {formattedDuration(movie.duration)}</p>
                                <p className="mt-2">{movie.description || 'No description available.'}</p>
                            </div>
                            <div className="my-4 flex space-x-4">
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
                }
                {submissions &&
                    <div className="bg-opacity-70 bg-white p-4 my-8 shadow-md rounded-md border">
                        <div className="flex-col flex w-full px-4">
                            <h1 className="text-2xl font-semibold">Submission History</h1>
                            {submissions.map((submission) => {
                                return <MovieSubmissionPreview submission={submission}/>
                            })}
                        </div>
                    </div>}
            </Container>
        </div>
    );
};

export default MoviePage;
