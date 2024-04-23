import Movie from "../interfaces/Movie.ts";
import {useState} from "react";
import {Container} from "../components/Container.tsx";
import {searchMovie} from "../services/API.ts";

const NewSubmission = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [movieResults, setMovieResults] = useState<Movie[]>([]);
    const [description, setDescription] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [movieSearchText, setMovieSearchText] = useState<string>("");

    const handleSearch = async () => {
        const searchResults = await searchMovie(movieSearchText);
        console.log(searchResults.movies);
        setMovieResults(searchResults.movies);
    };

    return (
        <Container>
            <h1 className="text-2xl font-semibold">New Submission</h1>
            <div className="top-16 w-full pt-8">
                <div
                    className="flex flex-col w-full md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                    <input
                        type="text"
                        placeholder="Movie Title"
                        className="border border-gray-300 p-2 rounded-md w-full"
                        value={movieSearchText}
                        onChange={(e) => setMovieSearchText(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full md:w-auto"
                    >
                        Search
                    </button>
                </div>
            </div>
        </Container>
    )
}

export default NewSubmission;