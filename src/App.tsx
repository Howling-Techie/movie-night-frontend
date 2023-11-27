import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Navbar from "./components/Navbar.tsx";
import SignIn from "./pages/SignIn.tsx";
import Profile from "./pages/Profile.tsx";
import SignOut from "./pages/SignOut.tsx";
import Movies from "./pages/Movies.tsx";
import MoviePage from "./pages/Movie.tsx";


const App = () => {
    return (
        <Router>
            <AuthProvider>
                <div className="bg-background text-dark-text min-h-screen">
                    <Navbar/>
                    <Routes>
                        <Route path="/auth/discord/callback">
                            {/* Callback logic will be handled in the AuthProvider */}
                        </Route>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/movies" element={<Movies/>}/>
                        <Route path="/movies/:movie_id" element={<MoviePage/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/signin" element={<SignIn/>}/>
                        <Route path="/signout" element={<SignOut/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
};

export default App;
