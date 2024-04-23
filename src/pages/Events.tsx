import {useEffect, useState} from "react";
import Event from "../interfaces/Event.ts";
import {getEvents} from "../services/API.ts";
import {Container} from "../components/Container.tsx";
import BrowsePreview from "../components/events/BrowsePreview.tsx";

const Events = () => {
    const [events, setEvents] = useState<null | Event[]>(null);

    useEffect(() => {
        const getEventData = async () => {
            const {events: eventResults} = await getEvents();
            setEvents(eventResults);
        }
        getEventData();
    }, []);

    return (
        <Container>
            <h1 className="text-2xl font-semibold">Events</h1>
            <div className="shadow-md rounded-md border my-2 p-2">
                <h2 className="text-lg font-semibold mb-2">Upcoming Events</h2>
                <div className="flex-row flex-wrap justify-center grid grid-cols-1 md:grid-cols-2 gap-2">
                    {events && events.filter(event =>
                        ((event.voting_opening_time && new Date(event.voting_opening_time) > new Date()) || event.voting_opening_time === null) &&
                        ((event.start_time && new Date(event.start_time) > new Date()) || event.start_time === null))
                        .map((event => {
                            return <BrowsePreview key={event.event_id} event={event}/>
                        }))}
                </div>
            </div>
            <div className="shadow-md rounded-md border my-2 p-2">
                <h2 className="text-lg font-semibold mb-2">Active Events</h2>
                <div className="flex-row flex-wrap justify-center grid grid-cols-1 md:grid-cols-2 gap-2">
                    {events && events.filter(event =>
                        (event.start_time && new Date(event.start_time) < new Date()) &&
                        (event.voting_opening_time && event.voting_opening_time > new Date())).map((event => {
                        return <BrowsePreview key={event.event_id} event={event}/>
                    }))}
                </div>
            </div>
            <div className="shadow-md rounded-md border my-2 p-2">
                <h2 className="text-lg font-semibold mb-2">Past Events</h2>
                <div className="flex-row flex-wrap justify-center grid grid-cols-1 md:grid-cols-2 gap-2">
                    {events && events.filter(event => event.start_time && new Date(event.start_time) < new Date()).sort((a, b) => a.time_created < b.time_created ? 1 : -1).map((event => {
                        return <BrowsePreview key={event.event_id} event={event}/>
                    }))}
                </div>
            </div>
        </Container>
    );
};
export default Events;
