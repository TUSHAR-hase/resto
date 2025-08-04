'use client'
import { useEffect, useState } from "react";
import Customerheader from "../customercomponent/customerheader";
import './profile.css';
import { FaUser, FaMapMarkerAlt, FaPhone, FaUtensils, FaMoneyBill, FaCheckCircle, FaTruck, FaClock, FaStar, FaHistory, FaUserCircle } from "react-icons/fa";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('orders');
    const [isLoading, setIsLoading] = useState(true);
     const [foodItems, setFoodItems] = useState({}); 
 const [error, setError] = useState(null);
     useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        setUserData(user);
        
        if (user?._id) {
            fetchOrders(user._id);
        } else {
            setIsLoading(false);
        }
    }, []);

    // Fetch food details by ID
    const fetchFoodDetails = async (foodId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/foods?id=${foodId}`);
            const data = await response.json();
            console.log(data);
            return data.result;
        } catch (err) {
            console.error("Error fetching food details:", err);
            return null;
        }
    };

    // Process orders and fetch food details
    const processOrders = async (orders) => {
        const foodDetailsMap = {};
        const foodIds = new Set();
        
        // Collect all unique food IDs from all orders
        orders.forEach(order => {
            if (order.foodids) {
                order.foodids.split(',').forEach(id => foodIds.add(id));
            }
        });
        
        // Fetch all food details in parallel
        const foodFetchPromises = Array.from(foodIds).map(id => 
            fetchFoodDetails(id).then(food => ({ id, food }))
        );
        
        const foodResults = await Promise.all(foodFetchPromises);
        
        // Create a map of food details
        foodResults.forEach(({ id, food }) => {
            if (food) {
                console.log(id);
                foodDetailsMap[id] = food;
            }
        });
        
        setFoodItems(foodDetailsMap);
        
        // Enhance orders with food details
        return orders.map(order => {
            const items = [];
            if (order.foodids) {
                order.foodids.split(',').forEach(foodId => {
                    if (foodDetailsMap[foodId]) {
                        items.push({
                            ...foodDetailsMap[foodId],
                            quantity: 1 // Default quantity
                        });
                    }
                });
            }
            return { ...order, items };
        });
    };

    const fetchOrders = async (userId) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`http://localhost:3000/api/order?id=${userId}`);
            const data = await response.json();
            
            if (data.success && data.result) {
                const processedOrders = await processOrders(data.result);
                console.log(data.result)
                setOrders(processedOrders);
            } else {
                setError("Failed to load orders");
            }
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("Error loading orders. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'on the way': return 'bg-blue-100 text-blue-800';
            case 'preparing': return 'bg-yellow-100 text-yellow-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered': return <FaCheckCircle className="text-green-500" />;
            case 'on the way': return <FaTruck className="text-blue-500" />;
            case 'preparing': return <FaClock className="text-yellow-500" />;
            case 'cancelled': return <FaClock className="text-red-500" />;
            default: return <FaClock className="text-gray-500" />;
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <Customerheader />
            
                   <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-32 relative">
                        <div className="absolute -bottom-16 left-8">
                            <div className="bg-white p-2 rounded-full shadow-lg">
                                <div className="bg-gray-200 border-2 border-dashed rounded-full w-24 h-24 flex items-center justify-center">
                                    <FaUserCircle className="text-gray-400 text-5xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-20 px-8 pb-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{userData?.name || "John Doe"}</h1>
                                <p className="text-gray-600 mt-1">Foodie since 2022</p>
                                
                                <div className="flex items-center mt-4 space-x-6">
                                    <div className="flex items-center">
                                        <FaStar className="text-amber-500 mr-2" />
                                        <span className="font-medium">4.8</span>
                                        <span className="text-gray-500 ml-1">(128 reviews)</span>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <FaHistory className="text-amber-500 mr-2" />
                                        <span className="font-medium">{orders.length} orders</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-4 md:mt-0 bg-amber-50 rounded-lg p-4 border border-amber-200">
                                <h3 className="font-bold text-amber-800 flex items-center">
                                    <FaUser className="mr-2" /> Contact Information
                                </h3>
                                <div className="mt-2 space-y-2">
                                    <p className="flex items-center">
                                        <FaPhone className="text-amber-600 mr-2" />
                                        <span>{userData?.contect || "+1 (555) 123-4567"}</span>
                                    </p>
                                    <p className="flex items-start">
                                        <FaMapMarkerAlt className="text-amber-600 mr-2 mt-1" />
                                        <span>{userData?.city || "123 Main Street, New York, NY 10001"}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Tabs */}
                   <div className="flex border-b border-gray-200 mb-8">
                    <button 
                        className={`px-6 py-3 font-medium text-lg relative ${activeTab === 'orders' ? 'text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        My Orders
                        {activeTab === 'orders' && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 rounded-t"></div>
                        )}
                    </button>
                    <button 
                        className={`px-6 py-3 font-medium text-lg relative ${activeTab === 'details' ? 'text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('details')}
                    >
                        Account Details
                        {activeTab === 'details' && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 rounded-t"></div>
                        )}
                    </button>
                    <button 
                        className={`px-6 py-3 font-medium text-lg relative ${activeTab === 'reviews' ? 'text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        My Reviews
                        {activeTab === 'reviews' && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 rounded-t"></div>
                        )}
                    </button>
                </div>
                {/* Content based on active tab */}
                    {activeTab === 'orders' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
                        
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                            </div>
                        ) : error ? (
                            <div className="bg-white rounded-xl shadow-md p-8 text-center">
                                <FaUtensils className="mx-auto text-red-300 text-5xl mb-4" />
                                <h3 className="text-xl font-medium text-gray-700 mb-2">Error Loading Orders</h3>
                                <p className="text-gray-500 mb-4">{error}</p>
                                <button 
                                    onClick={() => userData?._id && fetchOrders(userData._id)}
                                    className="px-6 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-md p-8 text-center">
                                <FaUtensils className="mx-auto text-gray-300 text-5xl mb-4" />
                                <h3 className="text-xl font-medium text-gray-700 mb-2">No orders yet</h3>
                                <p className="text-gray-500 mb-4">You haven't placed any orders. Let's find something delicious!</p>
                                <button className="px-6 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors">
                                    Browse Restaurants
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6">
                                {orders.map((order) => (
                                    <div key={order._id} className="bg-white rounded-2xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                                        <div className="p-6">
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                                                <div>
                                                    <div className="flex items-center">
                                                        <FaUtensils className="text-amber-500 mr-3 text-xl" />
                                                        <h3 className="text-xl font-bold text-gray-800">{order.data?.name || "Restaurant Name"}</h3>
                                                    </div>
                                                    <p className="text-gray-600 mt-2 flex items-start">
                                                        <FaMapMarkerAlt className="text-gray-400 mr-2 mt-1 flex-shrink-0" />
                                                        <span>{order.data?.address || "Restaurant Address"}</span>
                                                    </p>
                                               
                                                </div>
                                                
                                                <div className="mt-4 md:mt-0 flex flex-col items-end">
                                                    <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(order.status)}`}>
                                                        {getStatusIcon(order.status)}
                                                        <span className="ml-2">{order.status}</span>
                                                    </div>
                                                    <div className="mt-3 text-2xl font-bold text-gray-800">
                                                        Rs. {parseFloat(order.amount).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {order.items?.length > 0 && (
                                                <div className="mt-6 pt-4 border-t border-gray-100">
                                                    <h4 className="font-medium text-gray-700 mb-3">Order Items</h4>
                                                    <ul className="space-y-2">
                                                        {order.items.map((item, index) => (
                                                            <li key={index} className="flex justify-between">
                                                                <div className="flex items-center">
                                                                    <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs mr-3">
                                                                        {item.quantity}
                                                                    </span>
                                                                    <span className="text-gray-700">{item.name}</span>
                                                                </div>
                                                                <span className="text-gray-800 font-medium">Rs. {item.price.toFixed(2)}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="bg-gray-50 px-6 py-4 flex justify-end">
                                            <button className="px-4 py-2 text-amber-600 font-medium rounded-lg hover:bg-amber-100 transition-colors">
                                                Reorder
                                            </button>
                                            <button className="ml-3 px-4 py-2 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                {activeTab === 'details' && (
                    <div className="bg-white rounded-2xl shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Details</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-700 mb-4">Personal Information</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-600 mb-1">Full Name</label>
                                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                            {userData?.name || "John Doe"}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-gray-600 mb-1">Email Address</label>
                                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                            {userData?.email || "john.doe@example.com"}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-gray-600 mb-1">Phone Number</label>
                                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                            {userData?.contact || "+1 (555) 123-4567"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-medium text-gray-700 mb-4">Delivery Addresses</h3>
                                
                                <div className="space-y-4">
                                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                                        <div className="flex justify-between">
                                            <h4 className="font-medium text-amber-800">Primary Address</h4>
                                            <span className="text-xs bg-amber-500 text-white px-2 py-1 rounded-full">Default</span>
                                        </div>
                                        <p className="mt-2 text-gray-700">{userData?.city || "123 Main Street, New York, NY 10001"}</p>
                                        <div className="mt-3 flex space-x-3">
                                            <button className="text-sm text-amber-600 hover:text-amber-800">Edit</button>
                                            <button className="text-sm text-gray-600 hover:text-gray-800">Set as Default</button>
                                        </div>
                                    </div>
                                    
                                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <h4 className="font-medium text-gray-800">Work Address</h4>
                                        <p className="mt-2 text-gray-700">456 Business Ave, Suite 300, New York, NY 10005</p>
                                        <div className="mt-3 flex space-x-3">
                                            <button className="text-sm text-amber-600 hover:text-amber-800">Edit</button>
                                            <button className="text-sm text-gray-600 hover:text-gray-800">Set as Default</button>
                                            <button className="text-sm text-red-600 hover:text-red-800">Remove</button>
                                        </div>
                                    </div>
                                    
                                    <button className="flex items-center text-amber-600 font-medium mt-2">
                                        <span className="mr-2">+</span> Add New Address
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                            <button className="px-6 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors">
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}
                
                {activeTab === 'reviews' && (
                    <div className="bg-white rounded-2xl shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Reviews</h2>
                        
                        <div className="text-center py-12">
                            <FaStar className="mx-auto text-gray-300 text-5xl mb-4" />
                            <h3 className="text-xl font-medium text-gray-700 mb-2">No reviews yet</h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                You haven't reviewed any orders. After your next delivery, come back to share your experience!
                            </p>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Stats Section */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-12 mt-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-4xl font-bold">128</div>
                            <div className="text-amber-100">Total Orders</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold">97%</div>
                            <div className="text-amber-100">Satisfaction Rate</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold">42</div>
                            <div className="text-amber-100">Restaurants Tried</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold">3.2</div>
                            <div className="text-amber-100">Avg. Delivery Time (hrs)</div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <footer className="bg-gray-800 text-gray-300 py-8">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">FoodExpress</h3>
                            <p className="text-sm">
                                Bringing delicious meals to your doorstep with speed and care since 2018.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-4">Account</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white">Profile</a></li>
                                <li><a href="#" className="hover:text-white">Order History</a></li>
                                <li><a href="#" className="hover:text-white">Payment Methods</a></li>
                                <li><a href="#" className="hover:text-white">Addresses</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-4">Support</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-white">Help Center</a></li>
                                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white">FAQs</a></li>
                                <li><a href="#" className="hover:text-white">Refund Policy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-4">Stay Connected</h4>
                            <p className="text-sm mb-4">
                                Subscribe to our newsletter for exclusive offers and updates.
                            </p>
                            <div className="flex">
                                <input 
                                    type="email" 
                                    placeholder="Your email" 
                                    className="px-4 py-2 rounded-l-lg w-full text-gray-700 focus:outline-none"
                                />
                                <button className="bg-amber-500 text-white px-4 py-2 rounded-r-lg hover:bg-amber-600">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
                        <p>© 2023 FoodExpress. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Profile;