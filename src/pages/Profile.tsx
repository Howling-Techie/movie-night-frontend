import {useAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import {Container} from "../components/Container.tsx";

const Profile = () => {
    const {user} = useAuth();
    const navigate = useNavigate();

    // Redirect to home if user is null
    if (user === null) {
        navigate("/");
    }
    return (
        <Container>
            {user && <div
                className="bg-surface  w-full max-w-2xl text-white flex flex-col items-center rounded-2xl">

                <div
                    className="bg-cover bg-center w-full h-60 rounded-t-2xl"
                    style={{
                        backgroundImage: `url(${user.banner ? "https://cdn.discordapp.com/banners/" + user.user_id + "/" + user.banner + (user.banner.startsWith("a_") ? ".gif" : ".png") + "?size=600" : ''})`,
                        backgroundColor: user.banner_color
                    }}
                >
                    {/* You can add additional styling or components for the banner */}
                </div>
                <div className="flex flex-row items-center p-8 justify-center w-full">
                    <img
                        src={"https://cdn.discordapp.com/avatars/" + user.user_id + "/" + user.avatar + (user.avatar.startsWith("a_") ? ".gif" : ".png")}
                        alt="Avatar" className="w-20 h-20 rounded-2xl flex"/>
                    <div className="px-8 flex flex-col grow">
                        <h2 className="text-2xl font-bold text-text-primary">{user.display_name}</h2>
                        <p className="text-text-secondary">@{user.username}</p>
                    </div>
                </div>
            </div>
            }
        </Container>
    );
};

export default Profile;
