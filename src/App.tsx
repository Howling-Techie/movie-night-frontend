import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Navbar from "./components/Navbar.tsx";
import Login from "./pages/Login.tsx";
import Profile from "./pages/Profile.tsx";


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
                        <Route path="/about" element={<About/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
};

export default App;
