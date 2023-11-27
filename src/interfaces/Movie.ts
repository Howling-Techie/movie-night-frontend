export default interface Movie {
    movie_id: number,
    title: string,
    release_date: Date,
    duration: number,
    description: string | null,
    image: string | null,
    poster: string | null,
    imdb_id: string | null,
    letterboxd_url: string | null
}
