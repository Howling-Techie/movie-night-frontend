import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Submission from "../interfaces/Submission.ts";
import Event from "../interfaces/Event.ts";
import {getEvent, getEventEntries, getEventVotes} from "../services/API.ts";
import {Container} from "../components/Container.tsx";
import User from "../interfaces/User.ts";
import BrowsePreview from "../components/submissions/BrowsePreview.tsx";

const EventPage = () => {
    const {event_id} = useParams();
    const [event, setEvent] = useState<null | Event>(null);
    const [entries, setEntries] = useState<null | {
        entry_id: number,
        score: number,
        status: number,
        submission: Submission
    }[]>(null);
    const [votes, setVotes] = useState<null | {
        submission: Submission,
        votes: { user: User, points: number }[]
    }[]>(null);

    useEffect(() => {
        const getEventById = async () => {
            if (event_id) {
                const {event: eventResult} = await getEvent(+event_id);
                setEvent(eventResult);
                const {entries: entryResults} = await getEventEntries(+event_id);
                setEntries(entryResults);
                const {votes: voteResults} = await getEventVotes(+event_id);
                setVotes(voteResults);
            }
        }
        if (event_id)
            getEventById()
    }, [event_id]);
    return (
        <Container>
            {event &&
                <div className="w-full flex flex-col">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-2">
                        {/*EVENT DESCRIPTION*/}
                        <div className="border rounded-md col-span-1 md:col-span-2 p-2">
                            <h1 className="font-semibold text-xl mb-2">{event.title ?? "Event Description"}</h1>
                            <div>{event.description ?? "No description provided"}</div>
                        </div>
                        {/*EVENT TIMES*/}
                        <div className="border rounded-md col-span-2 md:col-span-2 lg:col-span-1  p-2">
                            <h1 className="font-semibold text-xl mb-2">Event Information</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
                                <div className="flex flex-col">
                                    {event.voting_opening_time &&
                                        <p>{new Date(event.voting_opening_time).toLocaleString()}</p>}
                                    {!event.voting_opening_time &&
                                        <p>{new Date(event.time_created).toLocaleString()}</p>}
                                    <p className="text-gray-500 font-light mb-2">Voting Opening Time</p>
                                    {event.voting_closing_time &&
                                        <p>{new Date(event.voting_closing_time).toLocaleString()}</p>}
                                    {!event.voting_closing_time && <p>N/A</p>}
                                    <p className="text-gray-500 font-light mb-2">Voting Deadline</p>
                                </div>
                                <div className="flex flex-col">
                                    {event.start_time && <p>{new Date(event.start_time).toLocaleString()}</p>}
                                    {!event.start_time && <p>N/A</p>}
                                    <p className="text-gray-500 font-light mb-2">Event Start Time</p>
                                    <a
                                        href={`https://www.themoviedb.org/events/${event.event_id}/vote`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-500 text-white px-4 py-2 rounded text-center"
                                    >
                                        Submit Vote
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 my-2">
                            {/*EVENT VOTES*/}
                            <div className="border rounded-md col-span-1 md:col-span-2 p-2">
                                <h1 className="font-semibold text-xl mb-2">Results</h1>
                                <div>Votes go here</div>
                                {/*{votes && votes.map(vote => <div>{JSON.stringify({*/}
                                {/*    submission: vote.submission.title,*/}
                                {/*    votes: vote.votes.map(voteVote => {*/}
                                {/*        return {*/}
                                {/*            name: voteVote.user.username,*/}
                                {/*            points: voteVote.points*/}
                                {/*        }*/}
                                {/*    })*/}
                                {/*}, null, 2).split("\n").map(str => <p>{str.replace(/ /g, "\u00a0")}</p>)}</div>)}*/}
                            </div>
                            {/*EVENT RESULTS*/}
                            <div className="w-full col-span-1 md:col-span-2 my-2">
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="border rounded-md flex flex-col p-2 border-l-green-400 border-l-2">
                                        <h1 className="font-semibold text-xl mb-2">Winners</h1>
                                        <div className="border rounded-md m-2 p-2">
                                            <h2 className="text-lg">Submission 1</h2>
                                            <p>User 1</p>
                                        </div>
                                        <div className="border rounded-md m-2 p-2">
                                            <h2 className="text-lg">Submission 2</h2>
                                            <p>User 2</p>
                                        </div>
                                    </div>
                                    <div className="border rounded-md flex flex-col p-2 border-l-red-400 border-l-2">
                                        <h1 className="font-semibold text-xl mb-2">Losers</h1>
                                        <div className="border rounded-md m-2 p-2">
                                            <h2 className="text-lg">Submission 3</h2>
                                            <p>User 3</p>
                                        </div>
                                        <div className="border rounded-md m-2 p-2">
                                            <h2 className="text-lg">Submission 4</h2>
                                            <p>User 4</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*EVENT SUBMISSIONS*/}
                            <div className="border rounded-md col-span-1 md:col-span-2 p-2">
                                <h1 className="font-semibold text-xl mb-2">Submissions</h1>
                                <div
                                    className="flex-row flex-wrap justify-center grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {entries && entries.map((entry => {
                                        return <BrowsePreview key={entry.entry_id} submission={entry.submission}/>
                                    }))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Container>
    );
};

export default EventPage;
