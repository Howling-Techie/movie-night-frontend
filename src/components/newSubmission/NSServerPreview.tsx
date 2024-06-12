import Server from "../../interfaces/Server.ts";

interface ServerCardProps {
    server: Server;
    selectServer: (serverId: string) => (void);
}

export const NSServerPreview = ({server, selectServer}: ServerCardProps) => {
    return (
        <button
            className="bg-gray-100 shadow-xl outline outline-1 overflow-clip outline-gray-200 w-full max-w-2xl flex flex-col items-center rounded-xl"
            onClick={() => selectServer(server.id)}>
            <div className="flex flex-row items-center p-0 justify-center w-full h-full">
                {server.avatar && <img
                    src={"https://cdn.discordapp.com/icons/" + server.id + "/" + server.avatar + (server.avatar.startsWith("a_") ? ".gif" : ".png")}
                    alt="Avatar" className="w-20 h-20  flex"/>}
                <div className="px-2 flex flex-col grow">
                    <h1 className="text-lg font-semibold text-text-primary">{server.server_name}</h1>
                </div>
            </div>
        </button>
    );
};

