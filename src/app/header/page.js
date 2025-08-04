"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaUser, FaShoppingCart, FaPizzaSlice, FaBars, FaTimes, FaHome, FaUtensils, FaInfoCircle, FaEnvelope, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
    const [detail, setDetail] = useState(null);
    const router = useRouter();
    const [login, setLogin] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== "undefined") {
            let data = localStorage.getItem("my_memory");
            if (!data && pathname === "/dashboard") {
                router.push("/signup");
            } else if (data && (pathname === "/signup" || pathname === "/login")) {
                router.push("/dashboard");
            } else {
                setDetail(JSON.parse(data || "{}"));
            }
        }
    }, [pathname, router]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [menuOpen]);

    const logout = () => {
        localStorage.removeItem("my_memory");
        router.push("/signup");
        setDetail(null);
    };

    const loginChange = () => {
        if (login) {
            router.push("/login");
        } else {
            router.push("/signup");
        }
    };

    return (
        <header 
            className={`fixed w-full z-50 transition-all duration-300 ${
                scrolled 
                    ? "bg-white shadow-md py-2" 
                    : "bg-transparent py-4"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center">
                                <FaPizzaSlice className="text-white text-xl" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                    RV PIZZA
                                </h1>
                                <p className="text-xs text-gray-600 -mt-1">Authentic Italian Flavors</p>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link 
                            href="/" 
                            className={`flex items-center gap-1.5 py-2 px-3 rounded-lg transition-colors ${
                                pathname === '/' 
                                    ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-orange-600 font-medium' 
                                    : 'text-gray-700 hover:text-amber-600'
                            }`}
                        >
                            <FaHome className="text-sm" />
                            <span>Home</span>
                        </Link>
                        <Link 
                            href="/menu" 
                            className={`flex items-center gap-1.5 py-2 px-3 rounded-lg transition-colors ${
                                pathname === '/menu' 
                                    ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-orange-600 font-medium' 
                                    : 'text-gray-700 hover:text-amber-600'
                            }`}
                        >
                            <FaUtensils className="text-sm" />
                            <span>Menu</span>
                        </Link>
                        <Link 
                            href="/about" 
                            className={`flex items-center gap-1.5 py-2 px-3 rounded-lg transition-colors ${
                                pathname === '/about' 
                                    ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-orange-600 font-medium' 
                                    : 'text-gray-700 hover:text-amber-600'
                            }`}
                        >
                            <FaInfoCircle className="text-sm" />
                            <span>About</span>
                        </Link>
                        <Link 
                            href="/contact" 
                            className={`flex items-center gap-1.5 py-2 px-3 rounded-lg transition-colors ${
                                pathname === '/contact' 
                                    ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-orange-600 font-medium' 
                                    : 'text-gray-700 hover:text-amber-600'
                            }`}
                        >
                            <FaEnvelope className="text-sm" />
                            <span>Contact</span>
                        </Link>
                        
                        <div className="ml-4 flex items-center space-x-4">
                            <button 
                                className="relative p-2 text-gray-700 hover:text-amber-600 transition-colors"
                                onClick={() => router.push('/cart')}
                            >
                                <FaShoppingCart className="text-xl" />
                                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    3
                                </span>
                            </button>
                            
                            {detail && detail.name ? (
                                <div className="flex items-center space-x-3">
                                    <div className="relative group">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white">
                                            <FaUser />
                                        </div>
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-amber-100">
                                            <div className="px-4 py-2 border-b border-amber-50">
                                                <p className="font-medium text-gray-900 truncate">{detail.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{detail.email}</p>
                                            </div>
                                            <button 
                                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                                                onClick={() => router.push("/profile")}
                                            >
                                                My Profile
                                            </button>
                                            <button 
                                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                                                onClick={() => router.push("/orders")}
                                            >
                                                My Orders
                                            </button>
                                            <button 
                                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors flex items-center gap-2"
                                                onClick={logout}
                                            >
                                                <FaSignOutAlt className="text-sm" />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => {
                                        setLogin(!login);
                                        loginChange();
                                    }}
                                    className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2 rounded-full font-medium hover:from-amber-700 hover:to-orange-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                                >
                                    {login ? "Login" : "Signup"}
                                </button>
                            )}
                        </div>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button 
                            className="relative p-2 text-gray-700"
                            onClick={() => router.push('/cart')}
                        >
                            <FaShoppingCart className="text-xl" />
                            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                3
                            </span>
                        </button>
                        
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-gray-700 focus:outline-none"
                        >
                            {menuOpen ? (
                                <FaTimes className="text-2xl" />
                            ) : (
                                <FaBars className="text-2xl" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div 
                className={`md:hidden fixed inset-0 bg-gradient-to-b from-amber-500 to-orange-500 z-40 transition-transform duration-300 transform ${
                    menuOpen ? "translate-y-0" : "-translate-y-full"
                }`}
                style={{ paddingTop: '4.5rem' }} // Adjusted padding to prevent space above
            >
                <div className="container mx-auto px-4 py-6 h-full overflow-y-auto">
                    <nav className="flex flex-col space-y-4">
                        <Link 
                            href="/" 
                            className={`flex items-center gap-3 py-3 px-4 rounded-xl ${
                                pathname === '/' 
                                    ? 'bg-white/20 text-white font-medium' 
                                    : 'text-amber-100'
                            }`}
                            onClick={() => setMenuOpen(false)}
                        >
                            <FaHome className="text-lg" />
                            <span className="text-lg">Home</span>
                        </Link>
                        <Link 
                            href="/menu" 
                            className={`flex items-center gap-3 py-3 px-4 rounded-xl ${
                                pathname === '/menu' 
                                    ? 'bg-white/20 text-white font-medium' 
                                    : 'text-amber-100'
                            }`}
                            onClick={() => setMenuOpen(false)}
                        >
                            <FaUtensils className="text-lg" />
                            <span className="text-lg">Menu</span>
                        </Link>
                        <Link 
                            href="/about" 
                            className={`flex items-center gap-3 py-3 px-4 rounded-xl ${
                                pathname === '/about' 
                                    ? 'bg-white/20 text-white font-medium' 
                                    : 'text-amber-100'
                            }`}
                            onClick={() => setMenuOpen(false)}
                        >
                            <FaInfoCircle className="text-lg" />
                            <span className="text-lg">About</span>
                        </Link>
                        <Link 
                            href="/contact" 
                            className={`flex items-center gap-3 py-3 px-4 rounded-xl ${
                                pathname === '/contact' 
                                    ? 'bg-white/20 text-white font-medium' 
                                    : 'text-amber-100'
                            }`}
                            onClick={() => setMenuOpen(false)}
                        >
                            <FaEnvelope className="text-lg" />
                            <span className="text-lg">Contact</span>
                        </Link>
                    </nav>
                    
                    <div className="mt-8 pt-6 border-t border-amber-400/30">
                        {detail && detail.name ? (
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center gap-3 px-4 py-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white">
                                        <FaUser className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{detail.name}</p>
                                        <p className="text-amber-100 text-sm">{detail.email}</p>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={() => {
                                        router.push("/profile");
                                        setMenuOpen(false);
                                    }}
                                    className="w-full py-3 px-4 bg-white/10 text-white rounded-xl font-medium backdrop-blur-sm text-left"
                                >
                                    My Profile
                                </button>
                                
                                <button 
                                    onClick={() => {
                                        router.push("/orders");
                                        setMenuOpen(false);
                                    }}
                                    className="w-full py-3 px-4 bg-white/10 text-white rounded-xl font-medium backdrop-blur-sm text-left"
                                >
                                    My Orders
                                </button>
                                
                                <button 
                                    onClick={() => {
                                        logout();
                                        setMenuOpen(false);
                                    }}
                                    className="w-full py-3 px-4 bg-white text-amber-600 rounded-xl font-bold shadow-md flex items-center gap-3"
                                >
                                    <FaSignOutAlt />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => {
                                    setLogin(!login);
                                    loginChange();
                                    setMenuOpen(false);
                                }}
                                className="w-full py-4 bg-white text-amber-600 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                            >
                                {login ? "Login" : "Signup"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;