import {Container} from "../components/Container.tsx";

const Home = () => {
    return (
        <Container>
            <h1 className="text-5xl font-bold">Welcome to the Materialize</h1>
            <div className="text-lg mb-8 mt-4">Sign in for a better way to organise movie nights on Discord!</div>
            <div
                className="w-full font-extrabold max-w-7xl justify-center grid grid-cols-2 md:grid-cols-3 gap-4">
                <div
                    className="col-span-1 rounded-2xl  text-center h-80 flex-col flex justify-evenly pb-4 border shadow-2xl">
                    <h3 className="text-2xl font-bold pt-8">Submissions</h3>
                    <div className="font-normal grow flex-col justify-center flex">
                        <div className="my-2">TMDB integration</div>
                        <div className="my-2">Complete history</div>
                        <div className="my-2">User statistics</div>
                    </div>
                </div>
                <div
                    className="col-span-1 rounded-2xl text-center h-80 flex-col flex justify-evenly pb-4 border shadow-2xl">
                    <h3 className="text-2xl font-bold pt-8">Organisation</h3>
                    <div className="font-normal grow flex-col justify-center flex">
                        <div className="my-2">Create events</div>
                        <div className="my-2">Browse submissions</div>
                        <div className="my-2">User voting</div>
                    </div>
                </div>
                <div
                    className="col-span-2 md:col-span-1 rounded-2xl text-center h-80 flex-col flex justify-evenly pb-4 border shadow-2xl">
                    <h3 className="text-2xl font-bold pt-8">Voting</h3>
                    <div className="font-normal grow flex-col justify-center flex">
                        <div className="my-2">Ranked voting</div>
                        <div className="my-2">Split remaining points</div>
                        <div className="my-2">Results presentation</div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Home;
