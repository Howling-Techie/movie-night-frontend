import User from "./User.ts";

export default interface Submission {
    "submission_id": number,
    "user_id": string,
    "server_id": string,
    "tag_id": number,
    "time_submitted": Date,
    "title": string,
    "description": string,
    "status": string,
    "first_appearance": Date,
    "last_appearance": Date,
    "user": User
}
