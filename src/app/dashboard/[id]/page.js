'use client'

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaUtensils, FaImage, FaDollarSign, FaInfoCircle, FaSave, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Editfooditem = (probs) => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [error, seterror] = useState(false);
  const [path, setpath] = useState("");
  const [description, setdescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [preview, setPreview] = useState("");
  const router = useRouter();
  
  useEffect(() => {
    loaddata();
  }, []);
  
  const loaddata = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/foods/edit/${probs.params.id}`);
      const data = await response.json();
      
      if (data.success) {
        setname(data.result.name);
        setprice(data.result.price);
        setpath(data.result.path);
        setdescription(data.result.description);
        setPreview(data.result.path);
      }
    } catch (error) {
      console.error("Error loading food data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleImageChange = (e) => {
    const value = e.target.value;
    setpath(value);
    setPreview(value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !price || !path || !description) {
      seterror(true);
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3000/api/foods/edit/${probs.params.id}`, {
        method: "PUT",
        body: JSON.stringify({ name, price, path, description })
      });
      
      const data = await response.json();
      
      if (data.success) {
        router.push("/dashboard");
      } else {
        alert("Failed to update food item");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while updating");
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button 
            onClick={() => router.back()}
            className="flex items-center text-amber-600 font-medium hover:text-orange-700 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to Dashboard
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4">
            Edit Food Item
          </h1>
          <p className="text-gray-600 mt-2">
            Update your menu item details below
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4">
              <FaUtensils className="text-amber-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-white">Edit Menu Item</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Image Preview */}
              <div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3 flex items-center">
                    <FaImage className="mr-2 text-amber-600" /> Food Image Preview
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl h-64 flex items-center justify-center overflow-hidden">
                    {preview ? (
                      <img 
                        src={preview} 
                        alt="Food preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 text-center p-4">
                        <FaImage className="text-4xl mx-auto mb-2" />
                        <p>Image preview will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2 flex items-center">
                    <FaImage className="mr-2 text-amber-600" /> Image URL
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={path}
                      onChange={handleImageChange}
                      placeholder="Enter image URL"
                      className={`w-full pl-10 pr-4 py-3 bg-white border ${
                        error && !path ? "border-red-500" : "border-gray-300"
                      } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all`}
                    />
                    <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  {error && !path && (
                    <p className="mt-1 text-sm text-red-500">Please enter a valid image URL</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">
                    Paste a direct image link (e.g. from Imgur, Cloudinary, etc.)
                  </p>
                </div>
              </div>
              
              {/* Right Column - Form Fields */}
              <div>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2 flex items-center">
                    <FaUtensils className="mr-2 text-amber-600" /> Food Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      placeholder="Enter food name"
                      className={`w-full pl-10 pr-4 py-3 bg-white border ${
                        error && !name ? "border-red-500" : "border-gray-300"
                      } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all`}
                    />
                    <FaUtensils className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  {error && !name && (
                    <p className="mt-1 text-sm text-red-500">Please enter a food name</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2 flex items-center">
                    <FaDollarSign className="mr-2 text-amber-600" /> Price
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setprice(e.target.value)}
                      placeholder="Enter price"
                      className={`w-full pl-10 pr-4 py-3 bg-white border ${
                        error && !price ? "border-red-500" : "border-gray-300"
                      } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all`}
                    />
                    <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  {error && !price && (
                    <p className="mt-1 text-sm text-red-500">Please enter a valid price</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2 flex items-center">
                    <FaInfoCircle className="mr-2 text-amber-600" /> Description
                  </label>
                  <div className="relative">
                    <textarea
                      value={description}
                      onChange={(e) => setdescription(e.target.value)}
                      placeholder="Enter food description"
                      rows="4"
                      className={`w-full pl-10 pr-4 py-3 bg-white border ${
                        error && !description ? "border-red-500" : "border-gray-300"
                      } rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all`}
                    ></textarea>
                    <FaInfoCircle className="absolute left-3 top-4 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  {error && !description && (
                    <p className="mt-1 text-sm text-red-500">Please enter a description</p>
                  )}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold shadow-lg hover:shadow-amber-400/30 transition-all flex items-center justify-center"
                >
                  <FaSave className="mr-2" /> Save Changes
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
        
        <div className="mt-12 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Food Image Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-full mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">High Quality</h3>
                <p className="text-gray-600 text-sm">Use high-resolution images for best results</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-full mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Well-Lit</h3>
                <p className="text-gray-600 text-sm">Ensure good lighting to showcase your food</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-full mr-4 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Direct Link</h3>
                <p className="text-gray-600 text-sm">Use direct image links for proper display</p>
              </div>
            </div>
          </div>
        </div>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2023 Restaurant Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Editfooditem;