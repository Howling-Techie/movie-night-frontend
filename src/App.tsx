import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Navbar from "./components/Navbar.tsx";


const App = () => {
    return (
        <Router>
            <AuthProvider>
                <div className="bg-gray-900 text-white min-h-screen">
                    <Navbar/>
                    <Routes>
                        <Route path="/auth/discord/callback">
                            {/* Callback logic will be handled in the AuthProvider */}
                        </Route>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
};

export default App;
