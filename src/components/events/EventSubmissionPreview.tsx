import Submission from "../../interfaces/Submission.ts";
import {ReactElement} from "react";

interface SubmissionProp {
    submission: Submission
}

const EventSubmissionPreview = ({submission}: SubmissionProp) => {
    const posters: string[] = [];
    const images: string[] = [];
    for (const movie of submission.movies) {
        if (movie.poster)
            posters.push(movie.poster)
        else if (movie.movie_info.poster)
            posters.push(movie.movie_info.poster)
        if (movie.image)
            images.push(movie.image)
        else if (movie.movie_info.image)
            images.push(movie.movie_info.image)
    }
    const stars: ReactElement[] = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= submission.rating) {
            stars.push(<svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="#777200" viewBox="0 0 22 20">
                <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>)
        } else {
            stars.push(<svg className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>)
        }
    }
    return (
        <a
            className="flex flex-col lg:flex-row m-4 lg:h-80 lg:max-h-80 rounded-2xl overflow-hidden border shadow-2xl hover:cursor-pointer"
            href={`/submissions/${submission.submission_id}`}
        >
            {posters.length > 0 && <img
                className="object-cover hidden lg:inline"
                src={`https://image.tmdb.org/t/p/w500${posters[0]}`}
                alt={submission.title}
            />}
            {images.length > 0 && <img
                className="object-cover inline lg:hidden"
                src={`https://image.tmdb.org/t/p/w500${images[0]}`}
                alt={submission.title}
            />}
            <div className="p-2 w-full overflow-scroll">
                <div className="flex flex-row justify-between">
                    <div className="font-bold text-xl flex-row">
                        {submission.title}
                    </div>
                    <div className="text-gray-500">
                        {new Date(submission.time_submitted).toLocaleDateString()}
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex items-center mr-2">
                        {stars}
                    </div>
                    <div className="text-gray-600">
                        {submission.user.display_name ?? submission.user.username}
                    </div>
                </div>
                <div className="">
                    {submission.description}
                </div>
                <div className="font-semibold">
                    Movies
                </div>
                {submission.movies.map(movie => {
                    return (
                        <div key={movie.movie_id}>
                            {movie.movie_info.title} <span
                            className="text-gray-500">({new Date(movie.movie_info.release_date).getFullYear()})</span>
                        </div>
                    )
                })}
            </div>
        </a>
    );
};

export default EventSubmissionPreview
