import {ReactElement} from "react";
import Movie from "../../interfaces/Movie.ts";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Pagination, Navigation} from "swiper/modules";

// Import Swiper styles
import "swiper/css";

interface SubmissionProp {
    movies: Movie[],
    title: string,
    rating: number,
    description: string,
    name: string,
    full: boolean
}

const NSSubmissionPreview = ({movies, title, rating, description, name, full}: SubmissionProp) => {

    const posters: string[] = [];
    const images: string[] = [];
    for (const movie of movies) {
        if (movie.poster)
            posters.push(movie.poster);
        if (movie.image)
            images.push(movie.image);
    }
    const stars: ReactElement[] = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" stroke="#777200" viewBox="0 0 22 20">
                <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>);
        } else {
            stars.push(<svg className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>);
        }
    }
    return (
        <div
            className={`flex ${full ? "flex-row" : "flex-col"} m-4 ${full ? "h-80 max-h-80" : ""} rounded-2xl overflow-hidden border shadow-2xl`}
        >
            {posters.length > 0 &&
                <Swiper
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,

                    }}
                    speed={600}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className={`${full ? "max-w-[220px]" : "hidden"}`}
                >
                    {posters.map(p => {
                        return (<SwiperSlide><img
                            className={`max-h-80 object-cover max-w-[220px]`}
                            src={`https://image.tmdb.org/t/p/w500${p}`}
                            alt={title}
                        /></SwiperSlide>);
                    })}
                </Swiper>
            }
            {images.length > 0 &&
                <Swiper
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,

                    }}
                    speed={600}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className={`${full ? "hidden" : "max-w-full"}`}
                >
                    {images.map(i => {
                        return (<SwiperSlide>
                            <img
                                className={`${full ? "hidden" : "object-cover w-full"}`}
                                src={`https://image.tmdb.org/t/p/w500${i}`}
                                alt={title}
                            /></SwiperSlide>);
                    })}
                </Swiper>
            }
            <div className="p-2 w-full overflow-scroll">
                <div className="flex flex-row justify-between">
                    <div className="font-bold text-xl flex-row">
                        {title}
                    </div>
                    <div className="text-gray-500">
                        {new Date().toLocaleDateString()}
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex items-center mr-2">
                        {stars}
                    </div>
                    <div className="text-gray-600">
                        {name}
                    </div>
                </div>
                <div className="">
                    {description}
                </div>
                <div className="font-semibold">
                    Movies
                </div>
                {movies.map(movie => {
                    return (
                        <div key={movie.tmdb_id}>
                            {movie.title} <span
                            className="text-gray-500">({new Date(movie.release_date).getFullYear()})</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NSSubmissionPreview;
