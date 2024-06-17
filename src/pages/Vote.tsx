import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Vote from "../interfaces/Vote";
import Event from "../interfaces/Event";
import {getEvent, getEventUserVote} from "../services/API.ts";
import {useAuth} from "../context/AuthContext.tsx";

export const Vote = () => {
    const {event_id} = useParams();
    const {user} = useAuth();

    const [vote, setVote] = useState<Vote>();
    const [votes, setVotes] = useState<{ submission_id: number, points: number }[]>([]);
    const [event, setEvent] = useState<Event>();

    useEffect(() => {
        if (user && event_id) {
            getEventUserVote(+event_id, user.user_id).then((data) => {
                    setVote(data.vote);
                    setVotes(data.vote.votes);
                }
            );
            getEvent(+event_id).then((data) => {
                setEvent(data.event);
            });
        }
    }, [event_id, user]);

    return (
        <></>
    );
};
