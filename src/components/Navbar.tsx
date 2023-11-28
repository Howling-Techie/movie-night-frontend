import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import {Fragment} from 'react'

const Navbar = () => {
    const {user} = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="bg-gray-950 text-white p-4 flex justify-between items-center">
            <div className="text-xl font-bold">Materialize</div>
            <div className="flex space-x-4">
                <Link to="/" className="hover:text-text-secondary">
                    Home
                </Link>
                <Link to="/about" className="hover:text-text-secondary">
                    Users
                </Link>
                <Link to="/movies" className="hover:text-text-secondary">
                    Movies
                </Link>
                <Link to="/about" className="hover:text-text-secondary">
                    Submissions
                </Link>
                <Link to="/about" className="hover:text-text-secondary">
                    Servers
                </Link>
                <Link to="/about" className="hover:text-text-secondary">
                    Events
                </Link>
                <Link to="/about" className="hover:text-text-secondary">
                    About
                </Link>
            </div>
            <div>
                {user ? (<Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button
                                className="inline-flex w-full justify-center rounded-md bg-surface px-4 py-2 text-sm font-medium text-primary-text hover:bg-background-grey focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                                {user.display_name}
                                <ChevronDownIcon
                                    className="-mr-1 ml-2 h-5 w-5 text-primary"
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                className="absolute right-0 mt-2 w-40 origin-top-right divide-y rounded-md bg-gray-950 shadow-lg ring-1 ring-black/5 focus:outline-none">
                                <div className="px-1 py-1 ">
                                    <Menu.Item>
                                        {({active}) => (
                                            <button onClick={() => navigate("/profile")}
                                                    className={`${
                                                        active ? 'bg-gray-400' : ''
                                                    } group flex text-white w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >Profile
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({active}) => (
                                            <button onClick={() => navigate("/signout")}
                                                    className={`${
                                                        active ? 'bg-gray-400' : ''
                                                    } group flex text-white w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                Sign Out
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                ) : (
                    <Link to="/signin" className="hover:text-text-secondary">
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
