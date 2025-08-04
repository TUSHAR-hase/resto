'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaUser, FaLock, FaEye, FaEyeSlash, FaUtensils } from 'react-icons/fa'
import { motion } from 'framer-motion'

const User_login = (props) => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [error, seterror] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const loginhandel = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        if (!email || !password) {
            seterror(true)
            setIsLoading(false)
            return false
        } else {
            seterror(false)
        }
        
        try {
            let response = await fetch("http://localhost:3000/api/user/login", {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            
            response = await response.json()
            
            if (response.success) {
                const { result } = response
                delete result.password
                delete result.conpassword
                localStorage.setItem('user', JSON.stringify(result))
                
                if (props?.redirect?.order) {
                    router.push('/order')
                } else {
                    router.push('/')
                }
            } else {
                alert('Please enter valid credentials')
            }
        } catch (err) {
            console.error("Login error:", err)
            alert('An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden"
            >
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/food-pattern.svg')] opacity-20"></div>
                    <div className="relative z-10">
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-5"
                        >
                            <FaUtensils className="text-amber-600 text-2xl" />
                        </motion.div>
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-amber-100">Sign in to your account</p>
                    </div>
                </div>
                
                <div className="p-8">
                    <form onSubmit={loginhandel}>
                        <div className="space-y-5">
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
                            Don't have an account?{' '}
                            <button 
                                onClick={() => router.push("/user_auth")}
                                className="text-amber-600 font-medium hover:text-orange-600 transition-colors"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default User_login