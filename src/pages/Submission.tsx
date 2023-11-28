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
    const [banners, setBanners] = useState<string[]>([]);

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
                const bannerArray: string[] = [];
                for (const submissionMovie of submissionResult.movies) {
                    if (submissionMovie.image || submissionMovie.movie_info.image)
                        bannerArray.push(`https://image.tmdb.org/t/p/original${submissionMovie.image ?? submissionMovie.movie_info.image}`)
                }
                setBanners(bannerArray);
            }
        }
        if (submission_id)
            getSubmissionById()
    }, [submission_id]);

    return (
        <div
            className="-mt-1 pt-1 w-full">
            <div
                className="absolute -z-20 w-full h-[768px] overflow-clip">
                <img src={banners[0]} alt="Background image"
                     className="w-full blur-sm object-cover"/>
            </div>
            <div
                className="absolute -z-10 w-full h-[768px] bg-gradient-to-b from-gray-800 to-white mix-blend-screen">
            </div>
            <div className="px-8 mx-auto mt-8 max-w-7xl">
                {submission && <div className="bg-opacity-70 bg-white p-8 shadow-md rounded-md border">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold">{submission.title}</h2>
                        <p className="text-black">{new Date(submission.time_submitted).toLocaleDateString()}</p>
                    </div>
                    <p className="text-black">{submission.description}</p>
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
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="">
                            <h3 className="text-xl font-semibold">Submitted by:</h3>
                            <div className="bg-gray-100 shadow-md rounded-md border p-4 mt-4 flex items-center">
                                {submission.user.avatar && <img
                                    src={"https://cdn.discordapp.com/avatars/" + submission.user.user_id + "/" + submission.user.avatar + (submission.user.avatar.startsWith("a_") ? ".gif" : ".png")}
                                    alt={submission.user.username}
                                    className="w-10 h-10 rounded-full mr-2"/>}
                                <div>
                                    <p className="text-lg font-medium">{submission.user.username}</p>
                                    <p className="text-gray-500">{submission.user.description}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Server:</h3>
                            <div className="bg-gray-100 shadow-md rounded-md border flex flex-col p-4 mt-4">
                                <div className="flex flex-row items-center">
                                    {submission.server.avatar && <img
                                        src={"https://cdn.discordapp.com/icons/" + submission.server.server_id + "/" + submission.server.avatar + (submission.server.avatar.startsWith("a_") ? ".gif" : ".png")}
                                        alt={submission.server.server_name || 'Server'}
                                        className="w-10 h-10 rounded-full mr-2"/>}
                                    <h2 className="text-lg font-medium">{submission.server.server_name || 'N/A'}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold my-4">Movies:</h3>
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
                    <div className="bg-opacity-70 bg-white p-4 my-8 shadow-md rounded-md border">
                        <div className="flex-col flex w-full px-4">
                            <h1 className="text-2xl font-semibold">Event History</h1>
                            {events.map((event) => {
                                return <SubmissionEventPreview event={event}/>
                            })}
                        </div>
                    </div>}
            </div>
        </div>
    );
};

export default SubmissionPage;
