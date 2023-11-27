import {useEffect, useState} from "react";
import {Container} from "../components/Container.tsx";
import {getMovies} from "../services/API.ts";
import {BrowsePreview} from "../components/movies/BrowsePreview.tsx";
import Movie from "../interfaces/Movie.ts";

const Movies = () => {
    const [movies, setMovies] = useState<null | Movie[]>(null);

    useEffect(() => {
        const getMovieData = async () => {
            const {movies} = await getMovies();
            setMovies(movies);
        }
        getMovieData();
    }, []);
    return (
        <Container>
            <div className="flex flex-row flex-wrap max-w-7xl justify-center">
                {movies && movies.map((movie => {
                    return <BrowsePreview movie={movie}/>
                }))}
            </div>
        </Container>
    );
};

export default Movies;
