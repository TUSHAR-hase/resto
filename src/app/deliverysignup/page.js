'use client'
import { useRouter } from 'next/navigation'
import Deliveryheader from '../deliveryheader/page'
import { useState, useEffect } from 'react'
import { FaUser, FaEnvelope, FaLock, FaPhone, FaCity, FaEye, FaEyeSlash, FaMotorcycle } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Deliverysignup = () => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [conpassword, setconpassword] = useState('');
    const [city, setcity] = useState('');
    const [passworderror, setpassworderror] = useState(false);
    const [error, seterror] = useState(false);
    const [contect, setcontect] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem('delivery'))
        if (delivery) {
            router.push('/deliverydashboard')
        }
    }, [])
    
    const signuphamdel = async () => {
        // Reset errors
        setpassworderror(false);
        seterror(false);
        
        // Validation
        let hasError = false;
        
        if (password !== conpassword) {
            setpassworderror(true);
            hasError = true;
        }
        
        if (!name || !email || !password || !conpassword || !contect || !city) {
            seterror(true);
            hasError = true;
        }
        
        if (hasError) return;
        
        setIsLoading(true);
        
        try {
            const response = await fetch("http://localhost:3000/api/deliverypartner/signup", {
                method: 'POST',
                body: JSON.stringify({ name, email, password, city, contect })
            });
            
            const data = await response.json();
            
            if (data.success) {
                const { result } = data;
                delete result.password;
                localStorage.setItem('delivery', JSON.stringify(result));
                router.push('/deliverydashboard');
            } else {
                alert(data.message || 'Sign Up Unsuccessful');
            }
        } catch (err) {
            console.error("Signup error:", err);
            alert('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Deliveryheader />
            
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    {/* Left side - Illustration and benefits */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="md:w-1/2 text-center md:text-left"
                    >
                        <div className="mb-10">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                Become a Delivery Partner
                            </h1>
                            <p className="text-lg text-gray-600 max-w-lg">
                                Join our team of delivery partners and earn money on your own schedule. Deliver delicious food to happy customers!
                            </p>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="bg-amber-100 p-3 rounded-full mr-4 flex-shrink-0">
                                    <FaMotorcycle className="text-amber-600 text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg mb-1">Flexible Schedule</h3>
                                    <p className="text-gray-600">Work whenever you want - days, evenings, or weekends</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="bg-amber-100 p-3 rounded-full mr-4 flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg mb-1">Earn Good Money</h3>
                                    <p className="text-gray-600">Competitive pay with tips and bonuses</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="bg-amber-100 p-3 rounded-full mr-4 flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg mb-1">Support & Training</h3>
                                    <p className="text-gray-600">We provide onboarding and 24/7 support</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    
                    {/* Right side - Signup form */}
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full md:w-1/2 max-w-lg"
                    >
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4">
                                    <FaMotorcycle className="text-amber-600 text-2xl" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Create Your Partner Account</h2>
                            </div>
                            
                            <div className="p-6 space-y-5">
                                {/* Name Field */}
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FaUser />
                                    </div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                        placeholder="Full Name"
                                        className={`w-full pl-10 pr-4 py-3 bg-white border ${
                                            error && !name ? "border-red-500" : "border-gray-300"
                                        } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all`}
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
                                        placeholder="Email Address"
                                        className={`w-full pl-10 pr-4 py-3 bg-white border ${
                                            error && !email ? "border-red-500" : "border-gray-300"
                                        } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all`}
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
                                        type="tel"
                                        value={contect}
                                        onChange={(e) => setcontect(e.target.value)}
                                        placeholder="Contact Number"
                                        className={`w-full pl-10 pr-4 py-3 bg-white border ${
                                            error && !contect ? "border-red-500" : "border-gray-300"
                                        } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all`}
                                    />
                                    {error && !contect && (
                                        <p className="mt-1 text-sm text-red-500">Please enter your contact number</p>
                                    )}
                                </div>
                                
                                {/* City Field */}
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FaCity />
                                    </div>
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setcity(e.target.value)}
                                        placeholder="City"
                                        className={`w-full pl-10 pr-4 py-3 bg-white border ${
                                            error && !city ? "border-red-500" : "border-gray-300"
                                        } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all`}
                                    />
                                    {error && !city && (
                                        <p className="mt-1 text-sm text-red-500">Please enter your city</p>
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
                                        placeholder="Password"
                                        className={`w-full pl-10 pr-12 py-3 bg-white border ${
                                            error && !password ? "border-red-500" : "border-gray-300"
                                        } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all`}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    {error && !password && (
                                        <p className="mt-1 text-sm text-red-500">Please enter a password</p>
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
                                        className={`w-full pl-10 pr-12 py-3 bg-white border ${
                                            passworderror || (error && !conpassword) ? "border-red-500" : "border-gray-300"
                                        } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all`}
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
                                    {error && !conpassword && (
                                        <p className="mt-1 text-sm text-red-500">Please confirm your password</p>
                                    )}
                                </div>
                                
                                {/* Terms and Conditions */}
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            type="checkbox"
                                            className="h-4 w-4 text-amber-600 rounded focus:ring-amber-500"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="text-gray-600">
                                            I agree to the <a href="#" className="text-amber-600 hover:underline">Terms of Service</a> and <a href="#" className="text-amber-600 hover:underline">Privacy Policy</a>
                                        </label>
                                    </div>
                                </div>
                                
                                {/* Submit Button */}
                                <div className="pt-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={signuphamdel}
                                        disabled={isLoading}
                                        className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold shadow-lg hover:shadow-amber-400/30 transition-all relative"
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                                Creating Account...
                                            </div>
                                        ) : (
                                            "Create Account"
                                        )}
                                    </motion.button>
                                </div>
                                
                                {/* Login Link */}
                                <div className="mt-4 text-center">
                                    <p className="text-gray-600">
                                        Already have an account?{' '}
                                        <button 
                                            onClick={() => router.push('/deliverypartner')}
                                            className="text-amber-600 font-medium hover:text-orange-600 transition-colors"
                                        >
                                            Sign in
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            
            {/* Benefits Section */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-12 mt-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-10">Why Join Our Delivery Team?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white bg-opacity-20 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Flexible Hours</h3>
                            <p>Work when you want - day or night, weekdays or weekends</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white bg-opacity-20 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Great Earnings</h3>
                            <p>Competitive pay, 100% of tips, and weekly bonuses</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white bg-opacity-20 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Supportive Team</h3>
                            <p>24/7 support and resources to help you succeed</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <footer className="bg-gray-800 text-gray-300 py-8">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">SwiftRider</h3>
                            <p className="text-sm">
                                Connecting hungry customers with great food and reliable delivery partners.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-4">For Partners</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white">Sign Up</a></li>
                                <li><a href="#" className="hover:text-white">Earnings</a></li>
                                <li><a href="#" className="hover:text-white">Requirements</a></li>
                                <li><a href="#" className="hover:text-white">Resources</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-4">Support</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white">Help Center</a></li>
                                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white">FAQs</a></li>
                                <li><a href="#" className="hover:text-white">Safety</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white">Terms</a></li>
                                <li><a href="#" className="hover:text-white">Privacy</a></li>
                                <li><a href="#" className="hover:text-white">Licenses</a></li>
                                <li><a href="#" className="hover:text-white">Policies</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
                        <p>© 2023 SwiftRider. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Deliverysignup;