import Movie from "../interfaces/Movie.ts";
import {useEffect, useState} from "react";
import {Container} from "../components/Container.tsx";
import {
    getMovieImagesById,
    getServers,
    getServerTags,
    postMovieSubmission,
    searchMovie
} from "../services/API.ts";
import {useAuth} from "../context/AuthContext.tsx";
import Server from "../interfaces/Server.ts";
import {NSServerPreview} from "../components/newSubmission/NSServerPreview.tsx";
import NSMovieSearchPreview from "../components/newSubmission/NSMovieSearchPreview.tsx";
import {NSMovieSelectPreview} from "../components/newSubmission/NSMovieSelectPreview.tsx";
import {FaStar} from "react-icons/fa";
import NSSubmissionPreview from "../components/newSubmission/NSSubmissionPreview.tsx";
import {useNavigate} from "react-router-dom";

const NewSubmission = () => {
    const {user} = useAuth();
    const navigate = useNavigate();

    const [stage, setStage] = useState<number>(1);
    //STAGE 1
    const [servers, setServers] = useState<Server[]>();
    const [server, setServer] = useState<Server>();
    //STAGE 2
    const [movieSearchText, setMovieSearchText] = useState<string>("");
    const [movieResults, setMovieResults] = useState<Movie[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
    //STAGE 3
    const [description, setDescription] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [tags, setTags] = useState<{ id: number, name: string, description: string, icon: string }[]>([]);
    const [tag, setTag] = useState<number>(1);
    const [images, setImages] = useState<{ movieId: number, posters: string[], images: string[] }[]>([]);
    const [imagesToLoad, setImagesToLoad] = useState<number[]>([]);
    const [maxImagesToLoad, setMaxImagesToLoad] = useState<number[]>([]);
    const [postersToLoad, setPostersToLoad] = useState<number[]>([]);
    const [maxPostersToLoad, setMaxPostersToLoad] = useState<number[]>([]);

    useEffect(() => {
        if (user) {
            getServers(user.tokens.access_token).then(data => {
                setServers(data.servers);
            });
        }
    }, [user]);

    //STAGE 1
    const handleServerSelect = (serverId: string) => {
        if (servers) {
            setServer(servers.find((s) => s.id === serverId));
            setStage(2);
        }
    };

    //STAGE 2
    const handleSearch = async () => {
        const searchResults = await searchMovie(movieSearchText);
        setMovieResults(searchResults.movies);
    };
    const handleMovieSelect = (movieId: number) => {
        if (movies.find((m) => m.id === movieId))
            return;
        const selectedMovie = movieResults.find((m) => m.id === movieId);
        if (selectedMovie) {
            setMovies((prevMovies) => {
                return [...prevMovies, selectedMovie];
            });
        }
    };
    const handleMovieRemove = (movieId: number) => {
        setMovies((prevMovies) => {
            return prevMovies.filter((m) => m.id !== movieId);
        });
    };
    const handleMoveMovieUp = (movieId: number) => {
        const index = movies.findIndex((m) => m.id === movieId);
        if (index > 0) {
            const updatedMovies = [...movies];
            const temp = updatedMovies[index];
            updatedMovies[index] = updatedMovies[index - 1];
            updatedMovies[index - 1] = temp;
            setMovies(updatedMovies);
        }
    };
    const handleMoveMovieDown = (movieId: number) => {
        const index = movies.findIndex((m) => m.id === movieId);
        if (index < movies.length - 1) {
            const updatedMovies = [...movies];
            const temp = updatedMovies[index];
            updatedMovies[index] = updatedMovies[index + 1];
            updatedMovies[index + 1] = temp;
            setMovies(updatedMovies);
        }
    };
    const handleMovieSelectionConfirmation = async () => {
        if (movies.length > 0) {
            // Get images
            const initialImagesToLoad: number[][] = [];
            const movieImages = await Promise.all(
                movies.map(async (m) => {
                    const result = await getMovieImagesById(m.id);
                    initialImagesToLoad.push([5, 5, result.images.images.length, result.images.posters.length]);
                    return {movieId: m.id, images: result.images.images, posters: result.images.posters};
                })
            );
            setImages(movieImages);
            setImagesToLoad(initialImagesToLoad.map(a => a[0]));
            setPostersToLoad(initialImagesToLoad.map(a => a[1]));
            setMaxImagesToLoad(initialImagesToLoad.map(a => a[2]));
            setMaxPostersToLoad(initialImagesToLoad.map(a => a[3]));
            setStage(3);
        }
    };

    //STAGE 3
    useEffect(() => {
        if (server && user) {
            getServerTags(server.id, user.tokens.access_token).then(data => {
                console.log(data);
                setTags(data.tags);
            });
        }
    }, [server, user]);
    const handlePosterChange = (movieId: number, poster: string) => {
        setMovies(prevMovies => {
            return prevMovies.map(movie => {
                if (movie.id === movieId) {
                    return {...movie, poster: poster};
                }
                return movie;
            });
        });
    };
    const handleImageChange = (movieId: number, image: string) => {
        setMovies(prevMovies => {
            return prevMovies.map(movie => {
                if (movie.id === movieId) {
                    return {...movie, image: image};
                }
                return movie;
            });
        });
    };
    const handleLoadMoreImages = (index: number) => {
        setImagesToLoad(prevState => {
            const newState = [...prevState];
            newState[index] = Math.min(newState[index] + 5, maxImagesToLoad[index]);
            return newState;
        });
    };
    const handleLoadMorePosters = (index: number) => {
        setPostersToLoad(prevState => {
            const newState = [...prevState];
            newState[index] = Math.min(newState[index] + 5, maxPostersToLoad[index]);
            return newState;
        });
    };

    const handleSubmissionSubmit = () => {
        if (title.length < 1) {
            alert("Please enter a title");
            return;
        }
        if (server && user) {
            console.log(`submitting movie for ${JSON.stringify(user.tokens)}`);
            postMovieSubmission(server.id, title, description, rating, tag, movies, user.tokens.access_token).then((data) => {
                navigate(`/submissions/${data.submission.id}`);
            });
        }
    };

    return (
        <Container>
            <h1 className="text-2xl font-semibold">New Submission</h1>
            <div className="top-16 w-full pt-4 mb-8">
                {stage === 1 &&
                    <div>
                        <h2 className="text-xl font-semibold">Select a Server</h2>
                        {servers &&
                            <div
                                className="flex-row flex-wrap justify-center grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
                                {servers.map((s) => {
                                    return (<NSServerPreview key={s.id} server={s} selectServer={handleServerSelect}/>);
                                })
                                }
                            </div>
                        }
                    </div>
                }
                {stage === 2 &&
                    <div className="flex flex-col divide-y divide-gray-200 space-y-4">
                        <h2 className="text-xl font-semibold">Select Some Movies</h2>
                        {movies.length > 0 &&
                            <div>
                                <div
                                    className="flex-row flex-wrap grid grid-cols-2 md:grid-cols-4 gap-2">
                                    {movies.map((m) => {
                                        return (
                                            <NSMovieSelectPreview key={m.id} movie={m} removeMovie={handleMovieRemove}
                                                                  moveMovieUp={handleMoveMovieUp}
                                                                  moveMovieDown={handleMoveMovieDown}/>);
                                    })
                                    }
                                </div>
                                <button
                                    onClick={handleMovieSelectionConfirmation}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full transition"
                                >
                                    Confirm Movies
                                </button>
                            </div>
                        }
                        <div>
                            <div
                                className="flex flex-col w-full md:flex-row items-center justify-center md:space-x-4 mt-4">
                                <input
                                    type="text"
                                    placeholder="Movie Title"
                                    className="border border-gray-300 p-2 rounded-md w-full"
                                    value={movieSearchText}
                                    onChange={(e) => setMovieSearchText(e.target.value)}
                                />
                                <button
                                    onClick={handleSearch}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full md:w-auto transition"
                                >
                                    Search
                                </button>
                            </div>
                            {movieResults &&
                                <div
                                    className="flex-row flex-wrap justify-center grid grid-cols-1 md:grid-cols-3 gap-2 py-2">
                                    {movieResults.map((m) => {
                                        return (<NSMovieSearchPreview key={m.id} movie={m}
                                                                      selectMovie={handleMovieSelect}/>);
                                    })
                                    }
                                </div>
                            }
                        </div>
                    </div>
                }
                {stage === 3 && movies && tags && user &&
                    <div className="flex flex-col space-y-2">
                        <h2 className="text-xl font-semibold">Enter Some Details</h2>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Rating</label>
                            <div className="flex space-x-1">
                                {Array.from({length: 5}, (_, index) => (
                                    <FaStar
                                        key={index}
                                        size={24}
                                        className={`cursor-pointer ${
                                            index < rating ? "text-yellow-500" : "text-gray-400"
                                        } hover:text-yellow-800`}
                                        onClick={() => setRating(index + 1)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="tag" className="block text-gray-700 font-bold mb-2">
                                Tag
                            </label>
                            <select
                                id="tag"
                                value={tag}
                                onChange={(e) => setTag(+e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Select a tag</option>
                                {tags.map((tag) => (
                                    <option key={tag.id} value={tag.id}>
                                        {tag.icon} - {tag.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {movies.map((movie, mIndex) => (
                            <div key={movie.id} className="mb-4">
                                <h3 className="text-lg font-bold mb-2">{movie.title}</h3>

                                <div className="flex flex-row justify-between items-center">
                                    <label className="block text-gray-700 font-bold mb-2">Select Poster</label>
                                    {postersToLoad[mIndex] < maxPostersToLoad[mIndex] &&
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 mb-2 rounded-md hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-800"
                                            onClick={() => {
                                                handleLoadMorePosters(mIndex);
                                            }}
                                            disabled={postersToLoad[mIndex] === maxPostersToLoad[mIndex]}>Load
                                            More</button>
                                    }
                                </div>
                                <div className="flex space-x-2 mb-4 overflow-scroll">
                                    {images.filter(i => i.movieId === movie.id)[0].posters
                                        .map((poster, index) => {
                                            if (index >= postersToLoad[mIndex]) {
                                                return;
                                            }
                                            return (<img
                                                key={index}
                                                src={`https://image.tmdb.org/t/p/w500${poster}`}
                                                alt={`Poster ${index + 1}`}
                                                className={`h-48 mb-4 object-cover cursor-pointer ${
                                                    movie.poster === poster ? "border-2 border-blue-500" : "border"
                                                }`}
                                                onClick={() => handlePosterChange(movie.id, poster)}
                                            />);
                                        })}
                                </div>

                                <div className="flex flex-row justify-between items-center">
                                    <label className="block text-gray-700 font-bold mb-2">Select Image</label>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 mb-2 rounded-md hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-800"
                                        onClick={() => {
                                            handleLoadMoreImages(mIndex);
                                        }}
                                        disabled={imagesToLoad[mIndex] === maxImagesToLoad[mIndex]}>Load More
                                    </button>
                                </div>
                                <div className="flex space-x-2 overflow-scroll">
                                    {images.filter(i => i.movieId === movie.id)[0].images
                                        .map((image, index) => {
                                            if (index >= imagesToLoad[mIndex]) {
                                                return;
                                            }
                                            return (<img
                                                key={index}
                                                src={`https://image.tmdb.org/t/p/w500${image}`}
                                                alt={`Image ${index + 1}`}
                                                className={`h-48 mb-4 object-cover cursor-pointer ${
                                                    movie.image === image ? "border-2 border-blue-500" : "border"
                                                }`}
                                                onClick={() => handleImageChange(movie.id, image)}
                                            />);
                                        })}
                                </div>
                            </div>
                        ))}

                        <h2 className="text-xl font-semibold">Preview</h2>
                        <div
                            className="flex-row flex-wrap justify-center grid grid-cols-1 lg:grid-cols-2 gap-2">
                            <NSSubmissionPreview movies={movies} title={title} rating={rating} description={description}
                                                 name={user.display_name} full={true}/>
                            <NSSubmissionPreview movies={movies} title={title} rating={rating} description={description}
                                                 name={user.display_name} full={false}/>
                        </div>
                        <button
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={() => handleSubmissionSubmit()}
                        >
                            Submit
                        </button>
                    </div>
                }
            </div>
        </Container>
    );
};

export default NewSubmission;