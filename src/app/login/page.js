"use client";
import { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaUtensils } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '../header/page';
const Login = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const router = useRouter();
    
    const logindata = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        if(!email || !password){
            seterror(true);
            setIsLoading(false);
            return false;
        } else {
            seterror(false);
        }
        
        try {
            let response = await fetch("http://localhost:3000/api", {
                method: 'POST',
                body: JSON.stringify({email, password, login:true}),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            response = await response.json();
            
            if(response.success){
                let {info} = response;
                delete info.password;
                localStorage.setItem("my_memory", JSON.stringify(info));
                router.push("/dashboard");
            } else {
                alert("Login failed. Please check your credentials.");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col">
            {/* Header Placeholder */}
            <Header></Header>
            <div className="h-20 bg-gradient-to-r from-amber-600 to-orange-600"></div>
            
            <div className="flex-grow flex items-center justify-center px-4 py-8">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                >
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/food-pattern.svg')] opacity-20"></div>
                        <div className="relative z-10">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-5"
                            >
                                <FaUtensils className="text-amber-600 text-2xl" />
                            </motion.div>
                            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
                            <p className="text-amber-100">Sign in to continue your culinary journey</p>
                        </div>
                    </div>
                    
                    <div className="p-8">
                        <form onSubmit={logindata}>
                            <div className="space-y-6">
                                {/* Email Field */}
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FaUser />
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
                                
                                {/* Password Field */}
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FaLock />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        placeholder="Enter your Password"
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
                                        <p className="mt-1 text-sm text-red-500">Please enter your password</p>
                                    )}
                                </div>
                                
                                {/* Remember & Forgot */}
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            className="h-4 w-4 text-amber-600 rounded focus:ring-amber-500"
                                        />
                                        <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                            Remember me
                                        </label>
                                    </div>
                                    <button 
                                        type="button"
                                        className="text-sm text-amber-600 hover:text-orange-600 font-medium"
                                    >
                                        Forgot password?
                                    </button>
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
                                                Signing In...
                                            </div>
                                        ) : (
                                            "Login"
                                        )}
                                    </motion.button>
                                </div>
                            </div>
                        </form>
                        
                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                               Don&apos;t have an account?

                                <button 
                                    onClick={() => router.push("/signup")}
                                    className="text-amber-600 font-medium hover:text-orange-600 transition-colors"
                                >
                                    Sign up
                                </button>
                            </p>
                        </div>
                        
                        <div className="mt-8 flex items-center">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="mx-4 text-gray-400">or continue with</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>
                        
                        <div className="mt-6 grid grid-cols-3 gap-4">
                            <button className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 20h-4v-8h4v8zm-2-10.874c-.897 0-1.626-.728-1.626-1.624s.729-1.624 1.626-1.624 1.626.728 1.626 1.624-.729 1.624-1.626 1.624zm8 10.874h-4v-5.5c0-1.1-.9-2-2-2s-2 .9-2 2v5.5h-4v-8h4v1.5c.7-1.1 2.1-1.9 3.5-1.9 2.2 0 4 1.8 4 4v4.4z"/>
                                </svg>
                            </button>
                            <button className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"/>
                                </svg>
                            </button>
                            <button className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.441 16.892c-2.102.144-6.784.144-8.883 0-2.276-.156-2.541-1.27-2.558-4.892.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0 2.277.156 2.541 1.27 2.559 4.892-.018 3.629-.285 4.736-2.559 4.892zm-6.441-7.234l4.917 2.338-4.917 2.346v-4.684z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;