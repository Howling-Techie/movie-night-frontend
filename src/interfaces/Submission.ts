import User from "./User.ts";
import Movie from "./Movie.ts";
import Server from "./Server.ts";

export default interface Submission {
    "submission_id": number,
    "user_id": string,
    "server_id": string,
    "tags": null | [{ "tag_id": number, "name": string, "description": string, "icon": string }]
    "time_submitted": Date,
    "title": string,
    "description": string,
    "rating": number,
    "status": string,
    "first_appearance": Date,
    "last_appearance": Date,
    "user": User,
    "movies": SubmissionMovie[],
    "server": Server
}

export interface SubmissionMovie {
    "movie_id": number,
    "poster": string | null,
    "image": string | null,
    "movie_info": Movie
}
