import User from "./User.ts";

export default interface Submission {
    "submission_id": Number,
    "user_id": String,
    "server_id": String,
    "tag_id": Number,
    "time_submitted": Date,
    "title": String,
    "description": String,
    "status": String,
    "first_appearance": Date,
    "last_appearance": Date,
    "user": User
}
