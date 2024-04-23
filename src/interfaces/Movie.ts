export default interface Movie {
    id: number,
    title: string,
    release_date: Date,
    duration: number,
    description: string | null,
    image: string | null,
    poster: string | null,
    imdb_id: string | null,
    letterboxd_url: string | null,
    genres: null | [{ "name": string, "icon": string }]
}
