import Event from "../../interfaces/Event.ts";
import {useNavigate} from "react-router-dom";

interface EventPreviewProps {
    event: Event;
}

export const BrowsePreview = ({event}: EventPreviewProps) => {
    const {
        event_id,
        title,
        description,
        time_created,
        start_time,
        voting_open_time,
        voting_close_time,
        server,
        tag,
    } = event;
    const navigate = useNavigate();

    return (
        <div className="bg-white p-4 shadow-md rounded-md border hover:cursor-pointer"
             onClick={() => navigate(`/events/${event_id}`)}>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-gray-500">{new Date(time_created).toLocaleDateString()}</p>
            </div>
            <p className="text-gray-600">{description || 'No description available.'}</p>
            <div className="mt-2">
                <p>
                    <span className="font-semibold">Start Time:</span>{' '}
                    {start_time ? new Date(start_time).toLocaleString() : 'N/A'}
                </p>
                <p>
                    <span className="font-semibold">Voting Open Time:</span>{' '}
                    {voting_open_time ? new Date(voting_open_time).toLocaleString() : 'N/A'}
                </p>
                <p>
                    <span className="font-semibold">Voting Close Time:</span>{' '}
                    {voting_close_time ? new Date(voting_close_time).toLocaleString() : 'N/A'}
                </p>
            </div>
            <div className="mt-2">
                <h3 className="text-lg font-semibold">Server:</h3>
                <div className="flex items-center">
                    {server.avatar && (
                        <img
                            src={"https://cdn.discordapp.com/icons/" + server.server_id + "/" + server.avatar + (server.avatar.startsWith("a_") ? ".gif" : ".png")}
                            alt={server.server_name} className="w-8 h-8 mr-2 rounded-full"/>
                    )}
                    <p className="text-gray-700">{server.server_name}</p>
                </div>
            </div>
            {tag && (
                <div className="mt-2">
                    <h3 className="text-lg font-semibold">Tag:</h3>
                    <div className="flex items-center">
                        <span className="text-gray-700">{tag.name}</span>
                        <img src={tag.icon} alt={tag.name} className="w-4 h-4 ml-2"/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrowsePreview;
