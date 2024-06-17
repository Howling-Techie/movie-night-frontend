import {useNavigate} from "react-router-dom";
import {Container} from "../components/Container.tsx";
import {useContext, useEffect, useState} from "react";
import {getServers} from "../services/API.ts";
import {ServerCard} from "../components/ServerCard.tsx";
import Server from "../interfaces/Server.ts";
import {AuthContext} from "../context/AuthContext.tsx";

const Profile = () => {
    const [servers, setServers] = useState<Server[]>([]);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (authContext && authContext.loaded && authContext.accessToken) {
            getServers(authContext.accessToken).then(({servers}) => {
                setServers(servers);
            });
        } else if (authContext && authContext.loaded && !authContext.user) {
            navigate("/");
        }
    }, [authContext, navigate]);

    return (
        <Container>
            {authContext && authContext.user && <div
                className="bg-surface w-full max-w-2xl text-white flex flex-col items-center rounded-2xl">

                <div
                    className="bg-cover bg-center w-full h-60 rounded-t-2xl"
                    style={{
                        backgroundImage: `url(${authContext.user.banner ? "https://cdn.discordapp.com/banners/" + authContext.user.id + "/" + authContext.user.banner + (authContext.user.banner.startsWith("a_") ? ".gif" : ".png") + "?size=600" : ""})`,
                        backgroundColor: authContext.user.banner_color
                    }}
                >
                    {/* You can add additional styling or components for the banner */}
                </div>
                <div className="flex flex-row items-center p-8 justify-center w-full">
                    {authContext.user.avatar && <img
                        src={"https://cdn.discordapp.com/avatars/" + authContext.user.id + "/" + authContext.user.avatar + (authContext.user.avatar.startsWith("a_") ? ".gif" : ".png")}
                        alt="Avatar" className="w-20 h-20 rounded-2xl flex"/>
                    }
                    <div className="px-8 flex flex-col grow">
                        <h2 className="text-2xl font-bold text-text-primary">{authContext.user.display_name}</h2>
                        <p className="text-text-secondary">@{authContext.user.username}</p>
                    </div>
                </div>
            </div>
            }
            {servers && <div className="my-8 w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-text-primary">Servers</h2>
                <div className="grid grid-cols-2 gap-2">
                    {servers.map((server) => {
                        return (<ServerCard server={server}/>);
                    })}</div>
            </div>}
        </Container>
    );
};

export default Profile;
