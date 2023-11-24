import {Link} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const Navbar = () => {
    const {user} = useAuth();

    return (
        <nav className="bg-appbar-background p-4 flex justify-between items-center">
            <div className="text-xl font-bold">Materialize</div>
            <div className="flex space-x-4">
                <Link to="/" className="hover:text-gray-300">
                    Home
                </Link>
                <Link to="/about" className="hover:text-gray-300">
                    Users
                </Link>
                <Link to="/about" className="hover:text-gray-300">
                    Movies
                </Link>
                <Link to="/about" className="hover:text-gray-300">
                    Submissions
                </Link>
                <Link to="/about" className="hover:text-gray-300">
                    Servers
                </Link>
                <Link to="/about" className="hover:text-gray-300">
                    Events
                </Link>
                <Link to="/about" className="hover:text-gray-300">
                    About
                </Link>
            </div>
            <div>
                {user ? (
                    <Link to="/profile" className="hover:text-gray-300">
                        Profile
                    </Link>
                ) : (
                    <Link to="/login" className="hover:text-gray-300">
                        Log In
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
