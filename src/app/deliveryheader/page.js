"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaMotorcycle, FaHome, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';

const Deliveryheader = () => {
    const router = useRouter();
    const [delivery, setDelivery] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // Check for delivery partner data in localStorage
        const deliveryData = JSON.parse(localStorage.getItem('delivery'));
        setDelivery(deliveryData);
        
        // Handle scroll effect
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = () => {
        localStorage.removeItem('delivery');
        setDelivery(null);
        router.push('/deliverypartner');
        setMobileMenuOpen(false);
    };

    const signup = () => {
        router.push('/deliverysignup');
        setMobileMenuOpen(false);
    };

    const login = () => {
        router.push('/deliverypartner');
        setMobileMenuOpen(false);
    };

    return (
        <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-gradient-to-r from-amber-600 to-orange-600 py-4'}`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <FaMotorcycle className={`text-2xl ${scrolled ? 'text-amber-600' : 'text-white'}`} />
                        <Link href="/" className="ml-2">
                            <h1 className={`text-xl font-bold ${scrolled ? 'text-gray-800' : 'text-white'}`}>
                                <span className="text-amber-600">Swift</span>Rider
                            </h1>
                        </Link>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="/" className={`flex items-center ${scrolled ? 'text-gray-700 hover:text-amber-600' : 'text-amber-100 hover:text-white'}`}>
                            <FaHome className="mr-1" /> Home
                        </Link>
                        <Link href="/deliverypartner" className={`flex items-center ${scrolled ? 'text-gray-700 hover:text-amber-600' : 'text-amber-100 hover:text-white'}`}>
                            <FaMotorcycle className="mr-1" /> Delivery
                        </Link>
                        
                        {delivery ? (
                            <div className="flex items-center space-x-4">
                                <div className={`flex items-center ${scrolled ? 'text-gray-700' : 'text-amber-100'}`}>
                                    <FaUser className="mr-1" /> {delivery.name || 'Partner'}
                                </div>
                                <button 
                                    onClick={logout}
                                    className="bg-white text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg font-medium flex items-center transition-colors shadow-sm"
                                >
                                    <FaSignOutAlt className="mr-1" /> Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex space-x-3">
                                <button 
                                    onClick={signup}
                                    className="bg-white text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg font-medium flex items-center transition-colors shadow-sm"
                                >
                                    <FaUserPlus className="mr-1" /> Sign Up
                                </button>
                                <button 
                                    onClick={login}
                                    className={`px-4 py-2 rounded-lg font-medium flex items-center transition-colors ${scrolled ? 'bg-amber-600 text-white hover:bg-amber-700' : 'bg-white text-amber-600 hover:bg-amber-50'}`}
                                >
                                    <FaSignInAlt className="mr-1" /> Login
                                </button>
                            </div>
                        )}
                    </nav>
                    
                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden text-2xl focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? (
                            <FiX className={scrolled ? 'text-gray-700' : 'text-white'} />
                        ) : (
                            <FiMenu className={scrolled ? 'text-gray-700' : 'text-white'} />
                        )}
                    </button>
                </div>
            </div>
            
            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="px-4 py-3 flex flex-col space-y-3">
                        <Link 
                            href="/" 
                            className="flex items-center text-gray-700 hover:text-amber-600 py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <FaHome className="mr-2" /> Home
                        </Link>
                        <Link 
                            href="/deliverypartner" 
                            className="flex items-center text-gray-700 hover:text-amber-600 py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <FaMotorcycle className="mr-2" /> Delivery Partner
                        </Link>
                        
                        {delivery ? (
                            <>
                                <div className="flex items-center text-gray-700 py-2">
                                    <FaUser className="mr-2" /> {delivery.name || 'Partner'}
                                </div>
                                <button 
                                    onClick={logout}
                                    className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center mt-2"
                                >
                                    <FaSignOutAlt className="mr-2" /> Logout
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col space-y-3 pt-2">
                                <button 
                                    onClick={signup}
                                    className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center"
                                >
                                    <FaUserPlus className="mr-2" /> Sign Up
                                </button>
                                <button 
                                    onClick={login}
                                    className="border border-amber-600 text-amber-600 px-4 py-2 rounded-lg font-medium flex items-center justify-center"
                                >
                                    <FaSignInAlt className="mr-2" /> Login
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Deliveryheader;