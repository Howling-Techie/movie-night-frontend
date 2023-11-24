// src/App.tsx
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/auth/discord/callback">
                        {/* Callback logic will be handled in the AuthProvider */}
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
