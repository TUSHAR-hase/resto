"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Header from '../header/page';

const Sign = () => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [conpassword, setconpassword] = useState('');
    const [contect, setcontect] = useState('');
    const [address, setaddress] = useState('');
    const [passworderror, setpassworderror] = useState(false);
    const [error, seterror] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const userdata = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Reset errors
        setpassworderror(false);
        seterror(false);
        
        let hasError = false;
        
        if (password !== conpassword) {
            setpassworderror(true);
            hasError = true;
        }
        
        if (!name || !email || !password || !conpassword || !contect || !address) {
            seterror(true);
            hasError = true;
        }
        
        if (hasError) {
            setIsLoading(false);
            return;
        }

        try {
            let response = await fetch("http://localhost:3000/api", {
                method: "POST",
                body: JSON.stringify({ name, email, password, conpassword, contect, address }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            response = await response.json();
            if (response.success) {
                const { info } = response;
                delete info.password;
                delete info.conpassword;
                localStorage.setItem("my_memory", JSON.stringify(info));
                router.push("/dashboard");
            } else {
                // Handle API error
                alert(response.message || "Sign up failed. Please try again.");
            }
        } catch (err) {
            console.error("Sign up error:", err);
            alert("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col">
            {/* Header Placeholder */}
            <Header></Header>
            <div className="h-20 bg-gradient-to-r from-amber-600 to-orange-600"></div>
            
            <div className="flex-grow flex items-center justify-center px-4 py-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden"
                >
                    {/* Left Side - Illustration */}
                    <div className="hidden lg:flex bg-gradient-to-br from-amber-500 to-orange-500 p-10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/food-pattern.svg')] opacity-20"></div>
                        <div className="relative z-10 flex flex-col justify-between h-full">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-4">Join Our Culinary Community</h2>
                                <p className="text-amber-100 max-w-md">
                                    Sign up to explore amazing restaurants, order delicious food, and enjoy exclusive offers.
                                </p>
                            </div>
                            
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-3" />
                                    <h3 className="text-white font-bold text-center">Discover Restaurants</h3>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-3" />
                                    <h3 className="text-white font-bold text-center">Fast Delivery</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Side - Form */}
                    <div className="p-8 md:p-12">
                        <div className="text-center mb-10">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 mb-5"
                            >
                                <FaUser className="text-white text-2xl" />
                            </motion.div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
                            <p className="text-gray-600">Join thousands of food lovers today</p>
                        </div>
                        
                        <form onSubmit={userdata}>
                            <div className="space-y-5">
                                {/* Name Field */}
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FaUser />
                                    </div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                        placeholder="Enter your Full Name"
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                                    />
                                    {error && !name && (
                                        <p className="mt-1 text-sm text-red-500">Please enter your name</p>
                                    )}
                                </div>
                                
                                {/* Email Field */}
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FaEnvelope />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        placeholder="Enter your Email"
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                                    />
                                    {error && !email && (
                                        <p className="mt-1 text-sm text-red-500">Please enter your email</p>
                                    )}
                                </div>
                                
                                {/* Contact Field */}
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FaPhone />
                                    </div>
                                    <input
                                        type="text"
                                        value={contect}
                                        onChange={(e) => setcontect(e.target.value)}
                                        placeholder="Enter your Contact Number"
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                                    />
                                    {error && !contect && (
                                        <p className="mt-1 text-sm text-red-500">Please enter your contact number</p>
                                    )}
                                </div>
                                
                                {/* Address Field */}
                                <div className="relative">
                                    <div className="absolute left-3 top-4 transform text-gray-400">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <textarea
                                        value={address}
                                        onChange={(e) => setaddress(e.target.value)}
                                        placeholder="Enter your Full Address"
                                        rows="2"
                                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                                    ></textarea>
                                    {error && !address && (
                                        <p className="mt-1 text-sm text-red-500">Please enter your address</p>
                                    )}
                                </div>
                                
                                {/* Password Field */}
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FaLock />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        placeholder="Create Password"
                                        className="w-full pl-10 pr-12 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    {error && !password && (
                                        <p className="mt-1 text-sm text-red-500">Please create a password</p>
                                    )}
                                </div>
                                
                                {/* Confirm Password Field */}
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FaLock />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={conpassword}
                                        onChange={(e) => setconpassword(e.target.value)}
                                        placeholder="Confirm Password"
                                        className="w-full pl-10 pr-12 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    {passworderror && (
                                        <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
                                    )}
                                </div>
                                
                                {/* Submit Button */}
                                <div className="pt-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold shadow-lg hover:shadow-amber-400/30 transition-all relative"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                                Creating Account...
                                            </div>
                                        ) : (
                                            "Sign Up"
                                        )}
                                    </motion.button>
                                </div>
                            </div>
                        </form>
                        
                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <button 
                                    onClick={() => router.push("/login")}
                                    className="text-amber-600 font-medium hover:text-orange-600 transition-colors"
                                >
                                    Log in
                                </button>
                            </p>
                        </div>
                        
                        <div className="mt-10 border-t border-gray-200 pt-6">
                            <p className="text-center text-gray-500 text-sm">
                                By signing up, you agree to our Terms of Service and Privacy Policy
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Sign;