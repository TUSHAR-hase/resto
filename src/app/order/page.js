'use client'
import { useEffect, useState } from "react";
import Customerheader from "../customercomponent/customerheader";
import { Delivery_charge, Tex } from "../constant";
import { useRouter } from "next/navigation";
import { FaUser, FaMapMarkerAlt, FaPhone, FaUtensils, FaReceipt, FaTruck, FaMoneyBillWave, FaCreditCard, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const Order = () => {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [estimatedTime, setEstimatedTime] = useState("30-45 mins");
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const userdata = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cartData);

        // Calculate prices
        const subTotal = cartData.reduce((sum, item) => sum + item.price, 0);
        const tax = (Tex * subTotal) / 100;
        const total = subTotal + tax + Delivery_charge;

        setSubtotal(subTotal);
        setTaxAmount(tax);
        setTotalAmount(total);

        if (cartData.length === 0) {
            router.push('/');
        }
    }, []);

    const placeOrder = async () => {
        const user_id = userdata._id;
        const city = userdata.city;
        const cart = JSON.parse(localStorage.getItem('cart'));
        const resto_id = cart[0].resto_id;
setIsLoading(true); 
        const amount = totalAmount;
        const foodids = cart.map((item) => item._id).toString();
        const status = 'Confirmed';

        try {
            let deliveryResponse = await fetch('http://localhost:3000/api/deliverypartner/' + city);
            deliveryResponse = await deliveryResponse.json();

            let deliveryIds = deliveryResponse.result.map(item => item._id);
            let deliveryboy_id = deliveryIds[Math.floor(Math.random() * deliveryIds.length)];

            if (!deliveryboy_id) {
                alert('Delivery partner not available in your area');
                return false;
            }

            let orderData = {
                user_id,
                resto_id,
                deliveryboy_id,
                amount,
                status,
                foodids,
                paymentMethod
            };

            let response = await fetch('http://localhost:3000/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            response = await response.json();

            if (response.success) {
                localStorage.removeItem('cart');
                router.push('/myprofile');
            } else {
                alert("Failed to place order. Please try again.");
            }
        } catch (error) {
            console.error("Order placement error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsLoading(false); // Always reset loading state
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
            <Customerheader />

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="text-center mb-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-bold text-amber-900 mb-3"
                    >
                        Complete Your Order
                    </motion.h1>
                    <p className="text-amber-700 max-w-2xl mx-auto">
                        Review your details and place your order. Your delicious meal is just a click away!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Customer Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Customer Details Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4">
                                <h2 className="text-xl font-bold text-white flex items-center">
                                    <FaUser className="mr-2" /> Customer Information
                                </h2>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-amber-800 font-medium mb-2">Full Name</label>
                                        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                                            {userdata?.name || "Not available"}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-amber-800 font-medium mb-2">Contact Number</label>
                                        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                                            {userdata?.contect || "Not available"}
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-amber-800 font-medium mb-2">Delivery Address</label>
                                        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 flex items-start">
                                            <FaMapMarkerAlt className="text-amber-600 mt-1 mr-2 flex-shrink-0" />
                                            <span>{userdata?.city || "Address not specified"}</span>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-amber-800 font-medium mb-2">Special Instructions</label>
                                        <textarea
                                            placeholder="Add any special requests or delivery instructions..."
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                            rows="3"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Order Items Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4">
                                <h2 className="text-xl font-bold text-white flex items-center">
                                    <FaUtensils className="mr-2" /> Your Order
                                </h2>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4">
                                    {cartItems.map((item, index) => (
                                        <div key={index} className="flex items-center py-3 border-b border-amber-100">
                                            <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                                                <img
                                                    src={item.path}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="ml-4 flex-grow">
                                                <h3 className="font-bold text-amber-900">{item.name}</h3>
                                                <p className="text-amber-600">Rs. {item.price}</p>
                                            </div>

                                            <div className="text-right">
                                                <p className="font-medium text-amber-900">Rs. {item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="sticky top-8"
                        >
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4">
                                    <h2 className="text-xl font-bold text-white flex items-center">
                                        <FaReceipt className="mr-2" /> Order Summary
                                    </h2>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-3 mb-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tax ({Tex}%)</span>
                                            <span className="font-medium">Rs. {taxAmount.toFixed(2)}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Delivery Fee</span>
                                            <span className="font-medium">Rs. {Delivery_charge}</span>
                                        </div>

                                        <div className="border-t border-gray-200 pt-3 mt-3">
                                            <div className="flex justify-between text-lg font-bold text-amber-900">
                                                <span>Total</span>
                                                <span>Rs. {totalAmount.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center bg-amber-50 p-3 rounded-lg mb-4">
                                        <FaClock className="text-amber-600 mr-2" />
                                        <span className="text-amber-800 font-medium">
                                            Estimated delivery: {estimatedTime}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                            >
                                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4">
                                    <h2 className="text-xl font-bold text-white flex items-center">
                                        <FaMoneyBillWave className="mr-2" /> Payment Method
                                    </h2>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="cash"
                                                name="payment"
                                                checked={paymentMethod === "cash"}
                                                onChange={() => setPaymentMethod("cash")}
                                                className="h-5 w-5 text-amber-600 focus:ring-amber-500"
                                            />
                                            <label htmlFor="cash" className="ml-3 flex items-center">
                                                <FaMoneyBillWave className="text-amber-600 mr-2" />
                                                <span className="text-amber-900 font-medium">Cash on Delivery</span>
                                            </label>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="card"
                                                name="payment"
                                                checked={paymentMethod === "card"}
                                                onChange={() => setPaymentMethod("card")}
                                                className="h-5 w-5 text-amber-600 focus:ring-amber-500"
                                            />
                                            <label htmlFor="card" className="ml-3 flex items-center">
                                                <FaCreditCard className="text-amber-600 mr-2" />
                                                <span className="text-amber-900 font-medium">Credit/Debit Card</span>
                                            </label>
                                        </div>

                                        {paymentMethod === "card" && (
                                            <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                                                <div className="mb-4">
                                                    <label className="block text-amber-800 font-medium mb-2">Card Number</label>
                                                    <input
                                                        type="text"
                                                        placeholder="1234 5678 9012 3456"
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-amber-800 font-medium mb-2">Expiry Date</label>
                                                        <input
                                                            type="text"
                                                            placeholder="MM/YY"
                                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-amber-800 font-medium mb-2">CVV</label>
                                                        <input
                                                            type="text"
                                                            placeholder="123"
                                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <motion.button
                                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                            onClick={placeOrder}
                                            disabled={isLoading}
                                            className={`w-full mt-6 py-4 text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center ${isLoading
                                                    ? "bg-gradient-to-r from-amber-400 to-orange-400 cursor-not-allowed"
                                                    : "bg-gradient-to-r from-amber-600 to-orange-600 hover:shadow-amber-400/30"
                                                }`}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing Order...
                                                </>
                                            ) : (
                                                "Place Your Order"
                                            )}
                                        </motion.button>

                                        <button
                                            onClick={() => router.push('/cart')}
                                            className="w-full mt-3 py-3 bg-white border border-amber-600 text-amber-600 rounded-xl font-medium hover:bg-amber-50 transition-colors"
                                        >
                                            Back to Cart
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Order Assurance Banner */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-8 mt-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center mb-4 md:mb-0">
                            <div className="bg-white p-3 rounded-full mr-4">
                                <FaTruck className="text-amber-600 text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Fast & Reliable Delivery</h3>
                                <p className="text-amber-100">We guarantee your food will arrive fresh and hot!</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="bg-white p-3 rounded-full mr-4">
                                <FaUtensils className="text-amber-600 text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Quality Guaranteed</h3>
                                <p className="text-amber-100">100% satisfaction or your money back</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-amber-800 text-amber-100 py-8">
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

export default Order;