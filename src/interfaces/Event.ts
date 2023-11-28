import Server from "./Server.ts";

export default interface Event {
    event_id: number,
    title: string,
    description: string | null,
    time_created: Date,
    start_time: null | Date,
    voting_open_time: null | Date,
    voting_close_time: null | Date,
    server: Server,
    tag: null | { "name": string, "description": string, "icon": string }
}
