import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Submission from "../interfaces/Submission.ts";
import Event from "../interfaces/Event.ts";
import {getEvent, getEventEntries, getEventVotes} from "../services/API.ts";
import {Container} from "../components/Container.tsx";
import {BarDatum, ResponsiveBar} from "@nivo/bar";
import EventSubmissionPreview from "../components/events/EventSubmissionPreview.tsx";
import {AuthContext} from "../context/AuthContext.tsx";

const EventPage = () => {
    const {event_id} = useParams();
    const authContext = useContext(AuthContext);
    const [event, setEvent] = useState<null | Event>(null);
    const [entries, setEntries] = useState<null | {
        entry_id: number,
        score: number,
        status: number,
        submission: Submission
    }[]>(null);
    const [chartData, setChartData] = useState<{ data: BarDatum[], users: string[] } | null>(null);

    useEffect(() => {
        if (event_id && authContext && authContext.loaded) {
            getEvent(+event_id, authContext.accessToken).then(({event: eventResult}) => {
                setEvent(eventResult);

                getEventEntries(+event_id).then(({entries: entryResults}) => {
                    setEntries(entryResults);

                    getEventVotes(+event_id).then(({votes: voteResults}) => {
                        // Construct chart data
                        const chartArray: BarDatum[] = [];
                        const usernames: string[] = [];

                        for (const voteResult of voteResults) {
                            const chartRow: BarDatum = {};
                            chartRow["submission"] = voteResult.submission.title;

                            for (const vote of voteResult.votes) {
                                chartRow[vote.user.username] = vote.points;

                                if (!usernames.includes(vote.user.username)) {
                                    usernames.push(vote.user.username);
                                }
                            }

                            chartArray.push(chartRow);
                        }

                        setChartData({data: chartArray, users: usernames});
                    });
                });
            });
        }
    }, [authContext, event_id]);

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
                                    <div className="flex flex-row items-center">
                                        <div className="mx-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            {event.voting_opening_time &&
                                                <p>{new Date(event.voting_opening_time).toLocaleString()}</p>}
                                            {!event.voting_opening_time &&
                                                <p>{new Date(event.time_created).toLocaleString()}</p>}
                                            <p className="text-gray-500 font-light mb-2 text-sm">Voting Opening Time</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <div className="mx-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </div>
                                        <div className="flex flex-col">
                                            {event.voting_closing_time &&
                                                <p>{new Date(event.voting_closing_time).toLocaleString()}</p>}
                                            {!event.voting_closing_time && <p>N/A</p>}
                                            <p className="text-gray-500 font-light mb-2 text-sm">Voting Deadline</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center">
                                    <div className="mx-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        {event.start_time && <p>{new Date(event.start_time).toLocaleString()}</p>}
                                        {!event.start_time && <p>N/A</p>}
                                        <p className="text-gray-500 mb-2 text-sm">Event Start Time</p>
                                    </div>
                                </div>
                                <button
                                    disabled={(event.voting_closing_time !== null && new Date(event.voting_closing_time) < new Date())}
                                    className="bg-blue-500 text-white px-4 py-2 rounded text-center disabled:bg-gray-800 disabled:text-gray-300">
                                    {(event.voting_closing_time !== null && new Date(event.voting_closing_time) < new Date()) ? "Voting Closed" : "Submit Vote"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 my-2">
                            {/*EVENT VOTES*/}
                            <div className="border rounded-md col-span-1 md:col-span-2 p-2 h-[600px] px-8">
                                <h1 className="font-semibold text-xl mb-2">Results</h1>
                                {chartData &&
                                    <ResponsiveBar
                                        data={chartData.data}
                                        keys={chartData.users}
                                        indexBy="submission"
                                        margin={{top: 0, right: 50, bottom: 80, left: 100}}
                                        padding={0.3}
                                        layout="horizontal"
                                        valueScale={{type: "linear"}}
                                        indexScale={{type: "band", round: true}}
                                        colors={{scheme: "nivo"}}

                                        borderColor={{
                                            from: "color",
                                            modifiers: [
                                                [
                                                    "darker",
                                                    1.6
                                                ]
                                            ]
                                        }}
                                        axisTop={null}
                                        axisRight={null}
                                        axisBottom={{
                                            tickSize: 5,
                                            tickPadding: 5,
                                            tickRotation: 0,
                                            legend: "points",
                                            legendPosition: "middle",
                                            legendOffset: 32,
                                            truncateTickAt: 0
                                        }}
                                        axisLeft={{
                                            tickSize: 5,
                                            tickPadding: 5,
                                            tickRotation: 0,
                                            legendOffset: -40,
                                            truncateTickAt: 0
                                        }}
                                        labelSkipWidth={12}
                                        labelSkipHeight={12}
                                        labelTextColor={{
                                            from: "color",
                                            modifiers: [
                                                [
                                                    "darker",
                                                    1.6
                                                ]
                                            ]
                                        }}
                                        role="application"
                                        ariaLabel="Voting results"
                                        barAriaLabel={e => e.id + ": " + e.formattedValue + " for submission " + e.indexValue}
                                    />
                                }
                            </div>
                            {/*EVENT RESULTS*/}
                            {entries && <div className="w-full col-span-1 md:col-span-2 my-2">
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="border rounded-md flex flex-col p-2 border-l-green-400 border-l-2">
                                        <h1 className="font-semibold text-xl mb-2">Winners</h1>
                                        {entries.filter(entry => entry.status === 1).map(entry =>
                                            <div className="border rounded-md m-2 p-2">
                                                <h2 className="text-lg">{entry.submission.title}</h2>
                                                <p>{entry.submission.user.username}</p>
                                            </div>)}
                                    </div>
                                    <div className="border rounded-md flex flex-col p-2 border-l-red-400 border-l-2">
                                        <h1 className="font-semibold text-xl mb-2">Losers</h1>
                                        {entries.filter(entry => entry.status === -1).map(entry =>
                                            <div className="border rounded-md m-2 p-2">
                                                <h2 className="text-lg">{entry.submission.title}</h2>
                                                <p>{entry.submission.user.username}</p>
                                            </div>)}
                                    </div>
                                </div>
                            </div>}
                            {/*EVENT SUBMISSIONS*/}
                            <div className="border rounded-md col-span-1 md:col-span-2 p-2">
                                <h1 className="font-semibold text-xl mb-2">Submissions</h1>
                                <div
                                    className="flex-row flex-wrap justify-center grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {entries && entries.map((entry => {
                                        return <EventSubmissionPreview key={entry.entry_id}
                                                                       submission={entry.submission}/>;
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
