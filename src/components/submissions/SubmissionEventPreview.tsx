import Event from "../../interfaces/Event.ts"
import {Link} from "react-router-dom";

interface EventProp {
    event: Event
}

const SubmissionEventPreview = ({event}: EventProp) => {
    const {
        id,
        title,
        description,
        time_created,
        start_time,
        tag,
    } = event;

    return (
        <div className="mt-4 p-4 bg-white shadow-md rounded-md border">
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">{title}</h4>
                <span
                    className="text-gray-500">{start_time ? new Date(start_time).toLocaleDateString() : new Date(time_created).toLocaleDateString()}</span>
            </div>
            <p className="py-2">{description || 'No description available.'}</p>
            <div className="mt-2">
                <Link to={`/events/${id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
                    View Event
                </Link>
            </div>
            <div className="mt-2">
                {tag && (
                    <div>
                        <h5 className="text-sm font-semibold">Tag:</h5>
                        <div className="flex items-center">
                            <span className="text-gray-700">{tag.name}</span>
                            <img src={tag.icon} alt={tag.name} className="w-4 h-4 ml-2"/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubmissionEventPreview
