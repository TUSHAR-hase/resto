'use client';
import { use, useEffect, useState } from "react";
import Customerheader from "../../customercomponent/customerheader";
import { FaStar, FaUtensils, FaClock, FaMapMarkerAlt, FaShoppingCart, FaRegClock, FaHeart, FaShareAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Page = (props) => {
    const [resturentdetail, setresturentdetail] = useState({});
    const [fooddetail, setfooddetail] = useState([]);
    const [cartitem, setcartitem] = useState();
    const [cartstorage, setcartsorage] = useState(
      typeof window !== 'undefined' 
        ? JSON.parse(localStorage.getItem('cart')) || [] 
        : []
    );
    const [cartid, setcartid] = useState(
      cartstorage.length > 0 
        ? cartstorage.map(item => item._id) 
        : []
    );
    const [removecartdata, setremovecartdata] = useState();
    const [activeCategory, setActiveCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const params = use(props.params);
    const name = params.name;
    const searchParams = use(props.searchParams);
    const id = searchParams.id; 

    useEffect(() => {
        resturentfooddetail();
    }, []);

    const resturentfooddetail = async () => {
        setIsLoading(true);
        try {
            let response = await fetch(`http://localhost:3000/api/customer/${id}`);
            response = await response.json();
            if (response.success) {
                setresturentdetail(response.result);
                setfooddetail(response.foodsdetail);
            }
        } catch (error) {
            console.error("Error fetching restaurant details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const removecart = (id) => {
        setremovecartdata(id);
        const localcartid = cartid.filter(item => item !== id);
        setcartid(localcartid);
        setcartitem(null);
        
        // Update local storage
        const updatedCart = cartstorage.filter(item => item._id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const addtocart = (item) => {
        const localcartid = [...cartid, item._id];
        setcartid(localcartid);
        setcartitem(item);
        setremovecartdata(null);
        
        // Update local storage
        const updatedCart = [...cartstorage, item];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Categories for filtering
    const categories = [
        { id: 'all', name: 'All Items', icon: <FaUtensils className="mr-1" /> },
        { id: 'appetizers', name: 'Appetizers', icon: <span className="text-xl">🍤</span> },
        { id: 'main', name: 'Main Course', icon: <span className="text-xl">🍛</span> },
        { id: 'desserts', name: 'Desserts', icon: <span className="text-xl">🍰</span> },
        { id: 'beverages', name: 'Beverages', icon: <span className="text-xl">🥤</span> }
    ];

    // Filter food items based on category
    const filteredFoods = activeCategory === 'all' 
        ? fooddetail 
        : fooddetail.filter(item => item.category === activeCategory);

    return (
        <div className="font-sans bg-amber-50 min-h-screen">
            <Customerheader cartitem={cartitem} removecartdata={removecartdata} />
            
            {/* Restaurant Header Banner */}
            <div className="relative h-80 md:h-[28rem] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('/food-pattern.svg')] opacity-10"></div>
                    <div className="relative z-10 text-center px-4">
                        <motion.h1 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
                        >
                            {name}
                        </motion.h1>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex justify-center items-center space-x-4 flex-wrap"
                        >
                            <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                                <FaStar className="text-amber-300 mr-1" />
                                <span className="text-white font-medium">4.9 (120 reviews)</span>
                            </div>
                            <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                                <FaUtensils className="text-white mr-1" />
                                <span className="text-white font-medium">Gujarati Cuisine</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
                
                {/* Restaurant Info Card */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-4xl z-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center">
                            <div className="relative w-16 h-16 mr-4 rounded-xl overflow-hidden bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
                                {resturentdetail?.logo ? (
                                    <Image 
                                        src={resturentdetail.logo} 
                                        alt="Restaurant Logo" 
                                        width={64}
                                        height={64}
                                        className="object-cover"
                                    />
                                ) : (
                                    <FaUtensils className="text-amber-600 text-2xl" />
                                )}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{resturentdetail?.name}</h3>
                                <p className="text-gray-600 line-clamp-1">{resturentdetail?.description || "Authentic Gujarati restaurant serving traditional flavors"}</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col justify-center md:border-l md:border-gray-200 md:pl-6">
                            <div className="flex items-center mb-2">
                                <FaMapMarkerAlt className="text-amber-500 mr-2 flex-shrink-0" />
                                <span className="text-gray-700 truncate">{resturentdetail?.address || "Ahmedabad, Gujarat"}</span>
                            </div>
                            <div className="flex items-center">
                                <FaClock className="text-amber-500 mr-2 flex-shrink-0" />
                                <span className="text-gray-700">10:00 AM - 10:00 PM</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-center gap-3">
                            <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-bold hover:shadow-lg transition-all flex items-center text-sm md:text-base">
                                <FaRegClock className="mr-1" />
                                Reserve
                            </button>
                            <button 
                                onClick={() => setIsFavorite(!isFavorite)}
                                className={`p-3 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-amber-100 text-amber-600'} transition-all`}
                            >
                                <FaHeart className={isFavorite ? "text-white" : "text-amber-600"} />
                            </button>
                            <button className="p-3 bg-amber-100 text-amber-600 rounded-full transition-all hover:bg-amber-200">
                                <FaShareAlt />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Main Content with Adjusted Padding */}
            <div className="pt-24 pb-16 max-w-7xl mx-auto px-4"> {/* Increased from pt-24 to pt-48 */}
                {/* Category Filter */}
                <div className="mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-center mb-8 text-gray-900 relative inline-block mx-auto"
                    >
                        Our Culinary Delights
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                    </motion.h2>
                    
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {categories.map(category => (
                            <motion.button
                                key={category.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveCategory(category.id)}
                                className={`flex items-center px-4 py-2 rounded-full font-medium transition-all ${
                                    activeCategory === category.id
                                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                                        : 'bg-white text-gray-700 border border-amber-200 hover:bg-amber-100'
                                }`}
                            >
                                <span className="mr-2">{category.icon}</span>
                                {category.name}
                            </motion.button>
                        ))}
                    </div>
                </div>
                
                {/* Food Items Grid */}
                {isLoading ? (
                    <div className="text-center py-16">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
                        <p className="text-xl text-gray-700">Loading delicious menu...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredFoods.map((item) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-amber-100 relative group"
                            >
                                {/* Favorite button */}
                                <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-amber-100 transition-all">
                                    <FaHeart className="text-gray-400 hover:text-amber-500" />
                                </button>
                                
                                {/* Food Image */}
                                <div className="relative h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center overflow-hidden">
                                    {item.path ? (
                                        <Image 
                                            src={item.path} 
                                            alt={item.name} 
                                            layout="fill"
                                            objectFit="cover"
                                            className="transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="bg-gradient-to-br from-amber-200 to-orange-200 w-full h-full flex items-center justify-center">
                                            <FaUtensils className="text-amber-600 text-4xl" />
                                        </div>
                                    )}
                                    <div className="absolute bottom-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full font-bold shadow-md">
                                        ₹{item.price}
                                    </div>
                                </div>
                                
                                {/* Food Details */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                                        <div className="flex text-amber-400">
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-600 mb-5 min-h-[60px]">
                                        {item.description || "Delicious traditional dish made with authentic ingredients and family recipes"}
                                    </p>
                                    
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                                            {item.category || "Main Course"}
                                        </div>
                                        
                                        {cartid.includes(item._id) ? (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => removecart(item._id)}
                                                className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full font-medium shadow-md flex items-center"
                                            >
                                                <FaShoppingCart className="mr-2" />
                                                Remove
                                            </motion.button>
                                        ) : (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => addtocart(item)}
                                                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium shadow-md flex items-center"
                                            >
                                                <FaShoppingCart className="mr-2" />
                                                Add to Cart
                                            </motion.button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
                
                {/* Empty State */}
                {!isLoading && filteredFoods.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 mb-6">
                            <FaUtensils className="text-3xl text-amber-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No items found</h3>
                        <p className="text-gray-600 max-w-md mx-auto mb-6">
                            Try selecting a different category or check back later for new menu items.
                        </p>
                        <button 
                            onClick={() => setActiveCategory('all')}
                            className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-medium"
                        >
                            View All Items
                        </button>
                    </motion.div>
                )}
            </div>
            
            {/* CTA Section */}
            <div className="py-16 bg-gradient-to-r from-amber-500 to-orange-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/food-pattern.svg')] opacity-10"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-bold text-white mb-6"
                    >
                        Ready to savor the flavors?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-amber-100 mb-10 max-w-2xl mx-auto"
                    >
                        Experience authentic Gujarati cuisine delivered to your doorstep or reserve a table for a memorable dining experience
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
                            className="px-8 py-4 bg-white text-amber-600 rounded-xl font-bold shadow-lg hover:bg-amber-50 transition-all flex items-center"
                        >
                            <FaShoppingCart className="mr-2 text-xl" /> 
                            View Cart & Order
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all flex items-center"
                        >
                            <FaRegClock className="mr-2 text-xl" /> 
                            Reserve a Table
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Page;