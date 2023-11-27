interface Server {
    server_id: string | null,
    avatar: string,
    server_name: string
}

interface ServerCardProps {
    server: Server
}

export const ServerCard = ({server}: ServerCardProps) => {
    return (
        <div
            className="bg-surface w-full max-w-2xl text-white flex flex-col items-center rounded-2xl">
            <div className="flex flex-row items-center p-0 justify-center w-full h-full">
                {server.avatar && <img
                    src={"https://cdn.discordapp.com/icons/" + server.server_id + "/" + server.avatar + (server.avatar.startsWith("a_") ? ".gif" : ".png")}
                    alt="Avatar" className="w-20 h-20 rounded-2xl flex"/>}
                <div className="px-2 flex flex-col grow">
                    <h1 className="text-lg font-bold text-text-primary">{server.server_name}</h1>
                </div>
            </div>
        </div>
    );
};

