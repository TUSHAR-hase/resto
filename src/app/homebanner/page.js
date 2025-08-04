"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaMapMarkerAlt, FaUtensils, FaStar, FaPizzaSlice, FaHamburger, FaIceCream, FaWineBottle, FaRegClock ,FaSpinner} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Homebanner = () => {
  const [selectloction, setselectloction] = useState([]);
  const [location, setlocation] = useState('');
  const [resturent, setresturent] = useState([]);
  const [showlocation, setshowlocation] = useState(false);
  // const [searchTerm, setSearchTerm] = useState('');
  // const [isFocused, setIsFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const router = useRouter();
  const [loadingRestaurant, setLoadingRestaurant] = useState(null); 

  useEffect(() => {
    getlocations();
    getrestorent();
  }, []);

  const getrestorent = async (params) => {
    let url = "http://localhost:3000/api/customer";
    let queryParams = [];
    
    if (params?.address) {
      queryParams.push(`address=${params.address}`);
    }
    
    if (params?.name) {
      queryParams.push(`name=${params.name}`);
    }
    
    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setresturent(data.result);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };
const handleRestaurantClick = (item) => {
    setLoadingRestaurant(item._id); // Set loading state for this restaurant
    router.push(`explor/${item.name}?id=${item._id}`);
  };
  const getlocations = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/customer/location");
      const data = await response.json();
      if (data.success) {
        setselectloction(data.result);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handallocation = (item) => {
    setlocation(item);
    getrestorent({ address: item });
    setshowlocation(false);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    getrestorent({ name: term });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setshowlocation(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
      setshowlocation(false);
    }, 200);
  };

  // Mock categories for filtering
  const categories = [
    { id: 'all', name: 'All Cuisines', icon: <FaUtensils /> },
    { id: 'indian', name: 'Indian', icon: <FaHamburger /> },
    { id: 'italian', name: 'Italian', icon: <FaPizzaSlice /> },
    { id: 'desserts', name: 'Desserts', icon: <FaIceCream /> },
    { id: 'beverages', name: 'Beverages', icon: <FaWineBottle /> }
  ];

  return (
    <div className="font-sans bg-white">
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Background with food pattern */}
        <div className="absolute inset-0 bg-[url('/food-pattern.svg')] opacity-10 z-0"></div>
        
        {/* Animated floating food elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 text-amber-600 text-6xl z-10"
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaPizzaSlice />
        </motion.div>
        
        <motion.div 
          className="absolute top-1/3 right-1/3 text-orange-500 text-5xl z-10"
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -8, 8, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <FaHamburger />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-1/4 left-1/3 text-amber-700 text-4xl z-10"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 15, -15, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <FaIceCream />
        </motion.div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-400/10 to-orange-500/30 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center bg-amber-100 px-5 py-2 rounded-full mb-6 shadow-lg"
              >
                <FaStar className="text-amber-500 mr-2 animate-pulse" />
                <span className="text-amber-800 font-bold">Gujarat's Best Restaurant 2023</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
              >
                Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Authentic Flavors</span> of Gujarat
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0"
              >
                Experience culinary excellence with handcrafted dishes made from locally-sourced ingredients and traditional recipes passed down for generations.
              </motion.p>
              
              {/* Search Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white rounded-2xl shadow-2xl p-6 mb-8 border border-amber-100"
              >
                <div className="text-xl font-bold text-gray-800 mb-5 flex items-center">
                  <FaSearch className="text-amber-500 mr-2" />
                  Find Your Perfect Dining Experience
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="flex items-center text-gray-500 mb-1 ml-1">
                      <FaMapMarkerAlt className="mr-2" />
                      <span className="text-sm">Select Location</span>
                    </div>
                    <input
                      placeholder="Enter your city"
                      onClick={handleFocus}
                      onBlur={handleBlur}
                      value={location}
                        onChange={(e) => setlocation(e.target.value)}
                      className="w-full p-4 pl-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all shadow-sm"
                    />
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 text-xl" />
                    
                    <AnimatePresence>
                      {showlocation && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="absolute z-20 w-full mt-2 bg-white border border-amber-100 rounded-xl shadow-xl overflow-hidden"
                        >
                          {selectloction.map((item, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              onClick={() => handallocation(item)}
                              className="px-5 py-4 hover:bg-amber-50 cursor-pointer transition-colors border-b border-amber-50 last:border-0 flex items-center"
                            >
                              <FaMapMarkerAlt className="text-amber-500 mr-3" />
                              <span className="font-medium">{item}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-center text-gray-500 mb-1 ml-1">
                      <FaUtensils className="mr-2" />
                      <span className="text-sm">Search Restaurants</span>
                    </div>
                    <input
                      onChange={handleSearch}
                      placeholder="Find by name, cuisine, etc."
                      className="w-full p-4 pl-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all shadow-sm"
                    />
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 text-xl" />
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/user_auth')}
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold shadow-lg shadow-amber-300/50 hover:shadow-amber-400/50 transition-all flex items-center"
                >
                  <FaPizzaSlice className="mr-2 text-xl" /> 
                  ORDER NOW
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white border-2 border-amber-500 text-amber-600 rounded-xl font-bold shadow-lg hover:bg-amber-50 transition-all flex items-center"
                >
                  <FaRegClock className="mr-2 text-xl" /> 
                  RESERVE TABLE
                </motion.button>
              </motion.div>
            </motion.div>
            
            {/* Right side - Image showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative h-[550px] rounded-3xl overflow-hidden shadow-2xl shadow-amber-400/30 border-8 border-white transform rotate-1">
                {/* Food showcase with layered images */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 flex flex-col justify-center items-center p-8">
                  <div className="relative w-full h-full">
                    {/* Pizza */}
                    <motion.div 
                      className="absolute top-10 left-10 w-48 h-48 bg-white rounded-full shadow-2xl flex items-center justify-center"
                      animate={{ rotate: [0, 0, 0, 0] }}
                      transition={{ duration: 8, repeat: Infinity }}
                    >
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-40 h-40 flex items-center justify-center">
                        <FaPizzaSlice className="text-5xl text-amber-600" />
                      </div>
                    </motion.div>
                    
                    {/* Burger */}
                    <motion.div 
                      className="absolute top-1/2 right-20 w-40 h-40 bg-white rounded-2xl shadow-2xl flex items-center justify-center"
                      animate={{ y: [0, -15, 0] }}
                      transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}
                    >
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-36 h-36 flex items-center justify-center">
                        <FaHamburger className="text-4xl text-amber-600" />
                      </div>
                    </motion.div>
                    
                    {/* Dessert */}
                    <motion.div 
                      className="absolute bottom-20 left-1/3 w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    >
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-28 h-28 flex items-center justify-center">
                        <FaIceCream className="text-3xl text-amber-600" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Floating tags */}
              <div className="absolute -right-6 top-1/3 bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 rounded-full shadow-lg transform rotate-6 z-20">
                <span className="text-white font-bold flex items-center">
                  <FaStar className="mr-1 animate-pulse" /> Authentic Gujarati
                </span>
              </div>
              
              <div className="absolute -left-6 bottom-1/4 bg-gradient-to-r from-amber-700 to-orange-700 px-6 py-3 rounded-full shadow-lg transform -rotate-6 z-20">
                <span className="text-white font-bold flex items-center">
                  <FaUtensils className="mr-1" /> Family Recipes
                </span>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Waves divider */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
            <path 
              fill="#fff" 
              d="M0,96L48,85.3C96,75,192,53,288,48C384,43,480,53,576,69.3C672,85,768,107,864,106.7C960,107,1056,85,1152,69.3C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="py-10 bg-amber-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Explore Cuisines
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium flex items-center transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <span className="mr-2 text-lg">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Restaurant Listing Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
          >
            Discover Amazing Restaurants
          </motion.h2>
          
          {resturent.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <FaUtensils className="text-5xl text-amber-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">No restaurants found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try changing your search criteria or explore all locations
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resturent.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -15 }}
                   onClick={() => handleRestaurantClick(item)}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl border border-amber-100 hover:shadow-2xl transition-all cursor-pointer group"
               
               >
                  <AnimatePresence>
                    {loadingRestaurant === item._id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-3xl"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="text-amber-600 text-3xl"
                        >
                          <FaSpinner />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="relative h-48 bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/food-pattern.svg')] opacity-20"></div>
                    <div className="relative z-10 text-center p-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3 group-hover:rotate-12 transition-transform">
                        <FaUtensils className="text-3xl text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{item.name}</h3>
                      <div className="flex justify-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-amber-300 mx-0.5" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <FaMapMarkerAlt className="text-amber-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 truncate">{item.address}</span>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <FaRegClock className="text-amber-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">Open: 10:00 AM - 10:00 PM</span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <FaStar className="text-amber-500 mr-2" /> 
                        Contact Information
                      </h4>
                      <p className="text-gray-600">{item.contect}</p>
                      <p className="text-gray-600 truncate">{item.email}</p>
                    </div>
                    
                    <button className="w-full py-3 bg-amber-50 text-amber-700 rounded-xl font-bold group-hover:bg-gradient-to-r group-hover:from-amber-100 group-hover:to-orange-100 group-hover:text-amber-800 transition-all flex items-center justify-center">
                      <span>View Menu</span>
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-amber-500 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/food-pattern.svg')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Ready to Experience Culinary Excellence?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-amber-100 mb-10 max-w-2xl mx-auto"
          >
            Join thousands of satisfied customers enjoying authentic Gujarati cuisine
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/user_auth')}
              className="px-8 py-4 bg-white text-amber-600 rounded-xl font-bold shadow-lg hover:bg-amber-50 transition-all flex items-center"
            >
              <FaPizzaSlice className="mr-2 text-xl" /> 
              ORDER NOW
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all flex items-center"
            >
              <FaRegClock className="mr-2 text-xl" /> 
              BOOK A TABLE
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Homebanner;