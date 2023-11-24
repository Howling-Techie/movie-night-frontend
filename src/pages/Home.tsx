import {Container} from "../components/Container.tsx";

const Home = () => {
    return (
        <Container>
            <h1 className="text-4xl">Welcome to the Materialize</h1>
            <div className="text-lg">Sign in for a better way to organise movie nights on Discord!</div>
            <div
                className="w-full max-w-7xl mt-8 justify-center grid grid-cols-2 md:grid-cols-3 gap-4 px-8">
                <div className="rounded-2xl bg-gray-950 text-center h-80 flex-col flex justify-evenly py-4">
                    <h3 className="text-2xl">Submissions</h3>
                    <ul>
                        <div>TMDB integration</div>
                        <div>Complete history</div>
                        <div>User statistics</div>
                    </ul>
                </div>
                <div className="rounded-2xl bg-gray-950 text-center h-80 flex-col flex justify-evenly py-4">
                    <h3 className="text-2xl">Organisation</h3>
                    <ul>
                        <div>Create events</div>
                        <div>Browse submissions</div>
                        <div>User voting</div>
                    </ul>
                </div>
                <div
                    className="col-span-2 md:col-span-1 rounded-2xl bg-gray-950 text-center h-80 flex-col flex justify-evenly py-4">
                    <h3 className="text-2xl">Voting</h3>
                    <ul>
                        <div>Ranked voting</div>
                        <div>Split remaining points</div>
                        <div>Results presentation</div>
                    </ul>
                </div>
            </div>
        </Container>
    );
};

export default Home;
