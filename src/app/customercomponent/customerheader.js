"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaShoppingCart, FaUser, FaUtensils, FaMotorcycle, FaSignOutAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdRestaurantMenu } from 'react-icons/md';

const Customerheader = () => {
    const [cartnumber, setcartnumber] = useState(0);
    const [cartdata, setcartdata] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setuser] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Initialize from localStorage
        const cartstorage = JSON.parse(localStorage.getItem('cart')) || [];
        setcartnumber(cartstorage.length);
        setcartdata(cartstorage);
        
        const userdata = JSON.parse(localStorage.getItem('user'));
        setuser(userdata);

        // Handle scroll effect
        if(!userdata){
            router.push('/')
        }
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        setuser(null);
        router.push('/');
        setProfileDropdown(false);
    };

    const signup = () => {
        router.push('/user_auth');
        setIsMenuOpen(false);
    };

    const login = () => {
        router.push('/user_auth');
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gradient-to-r from-amber-800 to-orange-800 shadow-xl py-2' : 'bg-gradient-to-r from-amber-600 to-orange-600 py-3'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                                <div className="relative">
                                    <div className="absolute -top-1 -right-1 bg-amber-400 rounded-full w-3 h-3 animate-pulse"></div>
                                    <MdRestaurantMenu className="text-3xl text-amber-200" />
                                </div>
                                <span className="text-2xl font-bold text-white font-serif tracking-wide">
                                    Food Fest
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-5">
                            <Link href="/restaurant" className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-amber-700/60 transition-all duration-300 group">
                                <FaUtensils className="mr-2 text-amber-200 group-hover:text-amber-50" />
                                <span className="group-hover:font-semibold">Add Restaurant</span>
                            </Link>
                            
                            <Link href="/myprofile" className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-amber-700/60 transition-all duration-300 group">
                                <FaUser className="mr-2 text-amber-200 group-hover:text-amber-50" />
                                <span className="group-hover:font-semibold">Profile</span>
                            </Link>
                            
                            <Link href="/deliverypartner" className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-amber-700/60 transition-all duration-300 group">
                                <FaMotorcycle className="mr-2 text-amber-200 group-hover:text-amber-50" />
                                <span className="group-hover:font-semibold">Delivery Partner</span>
                            </Link>
                            
                            <Link href="/cart" className="relative flex items-center p-2 rounded-full text-white hover:bg-amber-700/60 transition-all duration-300 group">
                                <FaShoppingCart className="text-xl" />
                                {cartnumber > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border border-amber-300">
                                        {cartnumber}
                                    </span>
                                )}
                            </Link>

                            {user ? (
                                <div className="relative">
                                    <button 
                                        onClick={() => setProfileDropdown(!profileDropdown)}
                                        className="flex items-center px-4 py-2 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-lg font-medium text-white hover:bg-amber-700/60 transition-all group"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-300 to-orange-300 flex items-center justify-center mr-2">
                                            <span className="text-amber-800 font-bold text-sm">
                                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                            </span>
                                        </div>
                                        <span className="mr-1">{user.name || 'User'}</span>
                                        {profileDropdown ? <FaChevronUp className="ml-1" /> : <FaChevronDown className="ml-1" />}
                                    </button>
                                    
                                    {profileDropdown && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                                            <button 
                                                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-amber-50 flex items-center"
                                                onClick={() => {
                                                    router.push('/myprofile');
                                                    setProfileDropdown(false);
                                                }}
                                            >
                                                <FaUser className="mr-2 text-amber-600" />
                                                My Profile
                                            </button>
                                            
                                            <button 
                                                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-amber-50 flex items-center border-t border-gray-100"
                                                onClick={logout}
                                            >
                                                <FaSignOutAlt className="mr-2 text-red-500" />
                                                Log out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex space-x-3">
                                    <button onClick={signup} className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg font-medium text-white hover:shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md">
                                        Sign Up
                                    </button>
                                    <button onClick={login} className="px-4 py-2 bg-white text-amber-600 rounded-lg font-medium hover:bg-amber-50 transition-all duration-300 shadow-md">
                                        Login
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center space-x-4">
                            <Link href="/cart" className="relative p-2">
                                <FaShoppingCart className="text-xl text-white" />
                                {cartnumber > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border border-amber-300">
                                        {cartnumber}
                                    </span>
                                )}
                            </Link>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-amber-700 focus:outline-none"
                            >
                                <div className="space-y-1">
                                    <span className={`block w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                                    <span className={`block w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                                    <span className={`block w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div 
                    className={`fixed top-0 right-0 z-50 h-full w-4/5 max-w-sm bg-gradient-to-b from-amber-700 to-orange-700 shadow-xl transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className="flex flex-col h-full">
                        <div className="flex justify-between items-center p-6 border-b border-amber-600">
                            <div className="flex items-center space-x-2">
                                <MdRestaurantMenu className="text-3xl text-amber-200" />
                                <span className="text-xl font-bold text-white font-serif">Food Fest</span>
                            </div>
                            <button 
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 rounded-full hover:bg-amber-600/50"
                            >
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto py-6 px-4">
                            <div className="space-y-4">
                                <Link 
                                    href="/restaurant" 
                                    className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-white hover:bg-amber-600/50 transition-all"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <FaUtensils className="mr-3 text-amber-200" />
                                    Add Restaurant
                                </Link>
                                <Link 
                                    href="/myprofile" 
                                    className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-white hover:bg-amber-600/50 transition-all"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <FaUser className="mr-3 text-amber-200" />
                                    Profile
                                </Link>
                                <Link 
                                    href="/deliverypartner" 
                                    className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-white hover:bg-amber-600/50 transition-all"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <FaMotorcycle className="mr-3 text-amber-200" />
                                    Delivery Partner
                                </Link>
                            </div>
                            
                            {user ? (
                                <div className="mt-8 pt-4 border-t border-amber-600">
                                    <div className="flex items-center px-4 py-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-300 to-orange-300 flex items-center justify-center mr-3">
                                            <span className="text-amber-800 font-bold">
                                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{user.name || 'User'}</p>
                                            <p className="text-amber-200 text-sm">{user.email}</p>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg font-medium text-white mb-3"
                                        onClick={() => {
                                            router.push('/myprofile');
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        <FaUser className="mr-2" />
                                        My Profile
                                    </button>
                                    <button 
                                        className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg font-medium text-white"
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        <FaSignOutAlt className="mr-2" />
                                        Log out
                                    </button>
                                </div>
                            ) : (
                                <div className="mt-8 pt-4 border-t border-amber-600 space-y-3">
                                    <button 
                                        onClick={signup}
                                        className="w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg font-medium text-white shadow-md"
                                    >
                                        Sign Up
                                    </button>
                                    <button 
                                        onClick={login}
                                        className="w-full px-4 py-3 bg-white text-amber-600 rounded-lg font-medium shadow-md"
                                    >
                                        Login
                                    </button>
                                </div>
                            )}
                        </div>
                        
                        <div className="p-4 text-center text-amber-200 text-sm border-t border-amber-600">
                            © {new Date().getFullYear()} Food Fest. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Customerheader;