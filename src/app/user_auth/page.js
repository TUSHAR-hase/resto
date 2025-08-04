'use client'
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaUtensils, FaEye, FaEyeSlash, FaMapMarkerAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

const UserAuth = ({ searchParams }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    city: ''
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (searchParams?.mode === 'signup') {
      setIsLoginMode(false);
    }
  }, [searchParams]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!isLoginMode) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number must be 10 digits';
      }
      
      if (!formData.city.trim()) {
        newErrors.city = 'City is required';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      let response;
      
      if (isLoginMode) {
        // Login API call
        response = await fetch("http://localhost:3000/api/user/login", {
          method: 'POST',
          body: JSON.stringify({ 
            email: formData.email, 
            password: formData.password 
          }),
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        // Signup API call
        response = await fetch("http://localhost:3000/api/user", {
          method: 'POST',
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            conpassword: formData.confirmPassword,
            city: formData.city,
            contect: formData.phone
          }),
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      const data = await response.json();
      
      if (data.success) {
        const user = data.result;
        delete user.password;
        if (user.conpassword) delete user.conpassword;
        localStorage.setItem('user', JSON.stringify(user));
        
        if (searchParams?.redirect?.order) {
          router.push('/order');
        } else {
          router.push(searchParams?.redirect || '/');
        }
      } else {
        alert(data.message || (isLoginMode 
          ? "Login failed. Please check your credentials." 
          : "Signup failed. Please try again."));
      }
    } catch (error) {
      console.error("Authentication error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaUtensils className="text-2xl" />
            <h1 className="text-xl font-bold">Gourmet Delights</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li className="hover:text-amber-200 transition-colors cursor-pointer">Home</li>
              <li className="hover:text-amber-200 transition-colors cursor-pointer">Menu</li>
              <li className="hover:text-amber-200 transition-colors cursor-pointer">About</li>
              <li className="hover:text-amber-200 transition-colors cursor-pointer">Contact</li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Authentication Section */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Side - Welcome Message */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-1/2 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              {isLoginMode ? "Welcome Back!" : "Create Your Account"}
            </h1>
            <p className="text-lg text-amber-800 mb-6 max-w-md">
              {isLoginMode 
                ? "Sign in to access exclusive offers, track your orders, and enjoy personalized recommendations." 
                : "Join our community of food lovers to enjoy personalized dining experiences and special discounts."}
            </p>
            
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <FaUtensils className="text-amber-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-amber-900">Exclusive Offers</h3>
                  <p className="text-sm text-amber-700">Members get 15% off first order</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-amber-100 p-3 rounded-full">
                  <FaUtensils className="text-amber-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-amber-900">Fast Checkout</h3>
                  <p className="text-sm text-amber-700">Save your details for faster ordering</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Side - Form */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full md:w-1/2 max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj4KPHBhdGggZD0iTTAgMEg0MFY0MEgwVjBaIiBmaWxsPSJub25lIi8+CjxwYXRoIGQ9Ik0xMCAxMEgzMFYzMEgxMFYxMFoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+')]"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4">
                    <FaUtensils className="text-amber-600 text-2xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {isLoginMode ? "Sign In to Your Account" : "Create New Account"}
                  </h2>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <AnimatePresence mode="wait">
                  {!isLoginMode && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      {/* Name Field */}
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaUser />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Full Name"
                          className={`w-full pl-10 pr-4 py-3 bg-white border ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>
                      
                      {/* Phone Field */}
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaPhone />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Phone Number"
                          className={`w-full pl-10 pr-4 py-3 bg-white border ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                          } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all`}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                        )}
                      </div>
                      
                      {/* City Field */}
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaMapMarkerAlt />
                        </div>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="City"
                          className={`w-full pl-10 pr-4 py-3 bg-white border ${
                            errors.city ? "border-red-500" : "border-gray-300"
                          } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all`}
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Email Field (Always visible) */}
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className={`w-full pl-10 pr-4 py-3 bg-white border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                
                {/* Password Field (Always visible) */}
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaLock />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className={`w-full pl-10 pr-12 py-3 bg-white border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all`}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
                
                {/* Confirm Password (Signup only) */}
                <AnimatePresence mode="wait">
                  {!isLoginMode && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          <FaLock />
                        </div>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm Password"
                          className={`w-full pl-10 pr-12 py-3 bg-white border ${
                            errors.confirmPassword ? "border-red-500" : "border-gray-300"
                          } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all`}
                        />
                        <button 
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {errors.confirmPassword && (
                          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Remember & Forgot (Login only) */}
                {isLoginMode && (
                  <div className="flex justify-between items-center pt-2">
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
                )}
                
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
                        {isLoginMode ? "Signing In..." : "Creating Account..."}
                      </div>
                    ) : (
                      isLoginMode ? "Sign In" : "Create Account"
                    )}
                  </motion.button>
                </div>
              </form>
              
              <div className="px-6 pb-6">
                <div className="mt-4 text-center">
                  <p className="text-gray-600">
                    {isLoginMode ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button 
                      onClick={toggleMode}
                      className="text-amber-600 font-medium hover:text-orange-600 transition-colors"
                    >
                      {isLoginMode ? "Sign up" : "Login"}
                    </button>
                  </p>
                </div>
                
                <div className="mt-6 flex items-center">
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
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-amber-800 text-amber-100 py-8 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <FaUtensils className="text-2xl text-amber-300" />
                <h2 className="text-xl font-bold">Gourmet Delights</h2>
              </div>
              <p className="mt-2 text-amber-200">Premium dining experience</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="hover:text-amber-300 transition-colors">Terms</a>
              <a href="#" className="hover:text-amber-300 transition-colors">Privacy</a>
              <a href="#" className="hover:text-amber-300 transition-colors">Careers</a>
              <a href="#" className="hover:text-amber-300 transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-amber-700">
            <p>© 2023 Gourmet Delights. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuth;