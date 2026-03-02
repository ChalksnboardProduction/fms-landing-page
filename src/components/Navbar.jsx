import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LocationDisplay } from './LocationDisplay';
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import Login from './Login';
import { useUser } from '../context/UserContext';

const Header = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const location = useLocation();
    const { user, logout } = useUser();
    // const isLoggedIn = user !== null;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const userButtonRef = useRef(null);

    const handleLogout = () => {
        logout();
    };

    const isActive = (path) => {
        return location.pathname.startsWith(path);
    };

    const handleRequestLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log("Location access granted")
                },
                (error) => {
                    console.log("Location access denied")
                }
            )
        }
    }

    useEffect(() => {
        if (!user) {
            const interval = setInterval(() => {
                setIsLoginOpen(true);
            }, 300000); // 5min
            return () => clearInterval(interval);
        }
    }, [user]);

    useEffect(() => {
        if (!isDropdownOpen) return;
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                userButtonRef.current &&
                !userButtonRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <header className="fixed top-0 left-0 right-0 bg-[#2b3366] backdrop-blur-sm z-[50002] shadow-sm transition-all duration-300 ease-in-out border-b border-gray-100">

            {/* <header className="fixed top-0 left-0 right-0 bg-white backdrop-blur-sm z-50 shadow-sm transition-all duration-300 ease-in-out border-b border-gray-100"></header> */}

            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between md:justify-center h-16 ">
                    {/* Logo */}
                    <Link to="/" className="flex items-center w-1/3 font-marcellus">
                        {/* <span className="text-xl sm:text-2xl font-bold">
                            FindMy<span className="text-[#3645B9]">School</span>
                        </span> */}

                        <img src="/images/logo.png" alt="logo" className="w-40" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex w-1/3 items-center justify-center gap-8">
                        <Link
                            to="/"
                            className={`font-medium border-b-2 transition-colors ${location.pathname === '/'
                                    ? 'text-[#0ac2b6] border-[#0ac2b6] hover:text-green-400 hover:border-green-400'
                                    : 'text-white border-transparent hover:text-green-400 hover:border-green-400'
                                }`}
                        >
                            Home
                        </Link>

                        <Link
                            to="/blogs"
                            className={`font-medium border-b-2 transition-colors ${location.pathname === '/blogs'
                                    ? 'text-[#0ac2b6] border-[#0ac2b6] hover:text-green-400 hover:border-green-400'
                                    : 'text-white border-transparent hover:text-green-400 hover:border-green-400'
                                }`}
                        >
                            Blogs
                        </Link>

                        <Link
                            to="/schools"
                            className={`font-medium border-b-2 transition-colors ${isActive('/schools')
                                    ? 'text-[#0ac2b6] border-[#0ac2b6] hover:text-green-400 hover:border-green-400'
                                    : 'text-white border-transparent hover:text-green-400 hover:border-green-400'
                                }`}
                        >
                            Schools
                        </Link>

                    </nav>

                    {/* Location and Login - Hidden on mobile when menu is open */}
                    <div className={`hidden md:flex w-1/3 items-center justify-end gap-4 ${isMenuOpen ? 'md:flex' : 'flex'}`}>
                        <LocationDisplay onRequestLocation={handleRequestLocation} />
                        {user ? (
                            <div className="relative flex items-center gap-2">
                                {/* User Icon */}
                                <button
                                    ref={userButtonRef}
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="ml-4 mr-0 items-center gap-2 text-white border-2 border-transparent hover:border-white p-0 rounded-full focus:outline-none transition-all ease-in-out duration-300"
                                >
                                    <User size={24} />
                                </button>
                                {/* Greeting */}
                                <span className="text-white font-medium hidden lg:inline-block">{user.name}</span>
                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div
                                        ref={dropdownRef}
                                        className="absolute right-[-40px] mt-40 p-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                                    >
                                        <button
                                            onClick={() => navigate('/wishlist')}
                                            className="block w-full text-left px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                                        >
                                            Wishlist
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsLoginOpen(true)}
                                className="relative inline-flex h-11 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-50"
                            >
                                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#3645B9_50%,#E2CBFF_100%)]" />
                                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-indigo-900 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl gap-2 hover:bg-indigo-800 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                                    <LogIn size={18} />
                                    <span className="hidden sm:inline">Login</span>
                                </span>
                            </button>
                        )}
                    </div>
                    <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        <nav className="flex flex-col space-y-4">
                            <Link
                                to="/"
                                className={`font-medium py-2 transition-colors ${isActive('/') && location.pathname === '/'
                                        ? 'text-white'
                                        : 'text-gray-300'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                HOME
                            </Link>
                            <Link
                                to="/blogs"
                                className={`font-medium py-2 transition-colors ${isActive('/blogs')
                                        ? 'text-white'
                                        : 'text-gray-300'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                BLOGS
                            </Link>
                            <Link
                                to="/schools"
                                className={`font-medium py-2 transition-colors ${isActive('/schools')
                                        ? 'text-white'
                                        : 'text-gray-300'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                SCHOOLS
                            </Link>
                            {/* Mobile Location */}
                            <div className="py-2">
                                <LocationDisplay onRequestLocation={handleRequestLocation} />
                            </div>
                            {user ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-white">

                                        <Link to={'/wishlist'} className="flex items-center gap-2 mb-2">
                                            WISHLIST
                                        </Link>

                                    </div>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="relative inline-flex h-11 w-full overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 focus:ring-offset-slate-50"
                                    >
                                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#94A3B8_50%,#E2E8F0_100%)]" />
                                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-4 py-1 text-sm font-medium text-gray-700 backdrop-blur-3xl gap-2 hover:bg-gray-50 transition-colors border border-gray-200">
                                            <LogOut size={18} />
                                            <span>Logout</span>
                                        </span>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        setIsLoginOpen(true);
                                        setIsMenuOpen(false);
                                    }}
                                    className="relative inline-flex h-11 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-[#3645B9]/50 focus:ring-offset-2 focus:ring-offset-slate-50"
                                >
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#3645B9_50%,#E2CBFF_100%)]" />
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl gap-2 hover:bg-slate-900 transition-colors">
                                        <LogIn size={18} />
                                        <span>Login</span>
                                    </span>
                                </button>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
