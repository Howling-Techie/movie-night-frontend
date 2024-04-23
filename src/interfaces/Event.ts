import Server from "./Server.ts";

export default interface Event {
    id: number,
    title: string,
    description: string | null,
    time_created: Date,
    start_time: null | Date,
    voting_opening_time: null | Date,
    voting_closing_time: null | Date,
    server: Server,
    tag: null | { "name": string, "description": string, "icon": string }
}
