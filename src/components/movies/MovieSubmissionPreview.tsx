import {Link} from "react-router-dom";
import Submission from "../../interfaces/Submission.ts";

interface SubmissionProps {
    submission: Submission
}

const MovieSubmissionPreview = ({submission}: SubmissionProps) => {
    const {
        submission_id,
        time_submitted,
        title,
        description,
        status,
        first_appearance,
        last_appearance,
        user,
    } = submission;

    return (
        <div className="mt-4 p-4 bg-white shadow-md rounded-md border">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">{title}</h2>
                <p className="text-gray-500">{new Date(time_submitted).toLocaleDateString()}</p>
            </div>
            <p className="text-gray-600">{description}</p>
            <div className="mt-4">
                <p>
                    <span className="font-semibold">Status:</span> {status}
                </p>
                {first_appearance && <p>
                    <span className="font-semibold">First Appearance:</span>{' '}
                    {new Date(first_appearance).toLocaleDateString()}
                </p>}
                {last_appearance && <p>
                    <span className="font-semibold">Last Appearance:</span>{' '}
                    {new Date(last_appearance).toLocaleDateString()}
                </p>}
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold">Submitted by:</h3>
                <div className="flex items-center py-2">
                    {user.avatar && <img
                        src={"https://cdn.discordapp.com/avatars/" + user.user_id + "/" + user.avatar + (user.avatar.startsWith("a_") ? ".gif" : ".png")}
                        alt={user.username} className="w-10 h-10 rounded-full mr-2"/>}
                    <div>
                        <p className="text-gray-900">{user.username}</p>
                    </div>
                </div>
            </div>
            <div className="my-2">
                <Link to={`/submissions/${submission_id}`} className="bg-blue-500 text-white px-4 py-2 rounded">
                    View Submission
                </Link>
            </div>
        </div>
    );
};

export default MovieSubmissionPreview;
