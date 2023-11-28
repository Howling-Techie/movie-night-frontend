import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Submission from "../interfaces/Submission.ts";
import Event from "../interfaces/Event.ts";
import {getSubmission, getSubmissionEvents} from "../services/API.ts";
import SubmissionEventPreview from "../components/submissions/SubmissionEventPreview.tsx";
import SubmissionMoviePreview from "../components/submissions/SubmissionMoviePreview.tsx";
import Server from "../interfaces/Server.ts";

const SubmissionPage = () => {
    const {submission_id} = useParams();
    const [submission, setSubmission] = useState<null | Submission>(null);
    const [events, setEvents] = useState<null | Event[]>(null);
    const [eventServers, setEventServers] = useState<null | Server[]>(null);
    useEffect(() => {
        const getSubmissionById = async () => {
            if (submission_id) {
                const {submission: submissionResult} = await getSubmission(+submission_id);
                setSubmission(submissionResult);
                const {events: eventResults} = await getSubmissionEvents(+submission_id);
                setEvents(eventResults);
                const allServers = eventResults.map((event) => event.server);
                const servers: Server[] = [];
                for (let i = 0; i < allServers.length; i++) {
                    if (!servers.some((server => server.server_id === allServers[i].server_id))) {
                        servers.push(allServers[i]);
                    }
                }
                setEventServers(servers);
            }
        }
        if (submission_id)
            getSubmissionById()
    }, [submission_id]);

    return (
        <div className="container mx-auto mt-8">
            {submission && <div className="bg-white p-4 shadow-md rounded-md border">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">{submission.title}</h2>
                    <p className="text-gray-500">{new Date(submission.time_submitted).toLocaleDateString()}</p>
                </div>
                <p className="text-gray-600">{submission.description}</p>
                <div className="mt-4">
                    <p>
                        <span className="font-semibold">Status:</span> {submission.status}
                    </p>
                    {submission.first_appearance && <p>
                        <span className="font-semibold">First Appearance:</span>{' '}
                        {new Date(submission.first_appearance).toLocaleDateString()}
                    </p>}
                    {submission.last_appearance && <p>
                        <span className="font-semibold">Last Appearance:</span>{' '}
                        {new Date(submission.last_appearance).toLocaleDateString()}
                    </p>}
                </div>
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">Submitted by:</h3>
                    <div className="flex items-center">
                        <img
                            src={"https://cdn.discordapp.com/avatars/" + submission.user.user_id + "/" + submission.user.avatar + (submission.user.avatar.startsWith("a_") ? ".gif" : ".png")}
                            alt={submission.user.username}
                            className="w-10 h-10 rounded-full mr-2"/>
                        <div>
                            <p className="text-gray-700">{submission.user.username}</p>
                            <p className="text-gray-500">{submission.user.description}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">Movies:</h3>
                    {submission.movies.map((movie) => (
                        <SubmissionMoviePreview key={movie.movie_id} movie={movie}/>
                    ))}
                </div>
                {submission.tags && <div className="mt-4">
                    <h3 className="text-xl font-semibold">Tags:</h3>
                    <ul className="flex space-x-2">
                        {submission.tags.map((tag) => (
                            <li key={tag.tag_id} className="text-gray-500">
                                {tag.name}
                            </li>
                        ))}
                    </ul>
                </div>}
            </div>}
            {eventServers && events &&
                <div className="bg-white p-4 my-16 shadow-md rounded-md border">
                    <div className="flex-col flex w-full px-4">
                        <h1 className="text-2xl font-semibold">Event History</h1>
                        {eventServers.map((server) => {
                            const serverEvents = events.filter((event) => event.server.server_id === server.server_id);
                            return (
                                <div className="border rounded shadow-md flex flex-col p-4 mt-4">
                                    <div className="flex flex-row">
                                        {server.avatar && <img
                                            src={"https://cdn.discordapp.com/icons/" + server.server_id + "/" + server.avatar + (server.avatar.startsWith("a_") ? ".gif" : ".png")}
                                            alt={server.server_name || 'Server'}
                                            className="w-8 h-8 mr-2 rounded-full"/>}
                                        <h2 className="text-lg font-medium">{server.server_name || 'N/A'}</h2>
                                    </div>
                                    {serverEvents.map((event) => {
                                        return <SubmissionEventPreview event={event}/>
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>}
        </div>
    );
};

export default SubmissionPage;
