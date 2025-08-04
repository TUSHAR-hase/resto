'use client'
import { useEffect, useState } from "react";
import Customerheader from "../customercomponent/customerheader";
import { Delivery_charge, Tex } from "../constant";
import { useRouter } from "next/navigation";
import { FaTrash, FaChevronLeft, FaUtensils } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartNumber, setCartNumber] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const router = useRouter();
  
  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cartData);
    setCartNumber(cartData.length);
    
    // Calculate prices
    const subTotal = cartData.reduce((sum, item) => sum + item.price, 0);
    const tax = (Tex * subTotal) / 100;
    const total = subTotal + tax + Delivery_charge;
    
    setSubtotal(subTotal);
    setTaxAmount(tax);
    setTotalAmount(total);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartNumber(updatedCart.length);
    
    if(updatedCart.length === 0) {
      localStorage.removeItem('cart');
      router.push('/');
    } else {
      // Recalculate prices after removal
      const subTotal = updatedCart.reduce((sum, item) => sum + item.price, 0);
      const tax = (Tex * subTotal) / 100;
      const total = subTotal + tax + Delivery_charge;
      
      setSubtotal(subTotal);
      setTaxAmount(tax);
      setTotalAmount(total);
    }
  };

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map(item => {
      if (item._id === id) {
        return { ...item, quantity: (item.quantity || 1) + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    loadCartItems();
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems.map(item => {
      if (item._id === id && (item.quantity || 1) > 1) {
        return { ...item, quantity: (item.quantity || 1) - 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    loadCartItems();
  };

  const orderButton = () => {
    if (JSON.parse(localStorage.getItem('user'))) {
      router.push('/order');
    } else {
      router.push('/user_auth?order=true');
    }
  };

  const continueShopping = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Customerheader />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Cart Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={continueShopping}
            className="flex items-center text-amber-700 hover:text-orange-700 font-medium"
          >
            <FaChevronLeft className="mr-2" />
            Continue Shopping
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900">Your Cart</h1>
          <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-medium">
            {cartNumber} {cartNumber === 1 ? 'Item' : 'Items'}
          </div>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-6">
              <FaUtensils className="text-amber-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Your cart is empty</h2>
            <p className="text-amber-700 mb-6 max-w-md mx-auto">
              Looks like you haven't added any delicious dishes to your cart yet. 
              Start exploring our menu to find something tasty!
            </p>
            <button 
              onClick={continueShopping}
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-medium shadow-lg hover:shadow-amber-400/30 transition-all"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4">
                  <h2 className="text-xl font-bold text-white">Order Summary</h2>
                </div>
                
                <div className="p-4">
                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center py-4 border-b border-amber-100 last:border-0"
                      >
                        <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden">
                          <img 
                            src={item.path} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="ml-4 flex-grow">
                          <h3 className="font-bold text-amber-900">{item.name}</h3>
                          <p className="text-amber-600 font-medium mt-1">Rs. {item.price}</p>
                          
                          <div className="flex items-center mt-3">
                            <div className="flex items-center border border-amber-300 rounded-lg">
                              <button 
                                onClick={() => decreaseQuantity(item._id)}
                                className="px-3 py-1 text-amber-700 hover:bg-amber-50 transition-colors"
                                disabled={(item.quantity || 1) <= 1}
                              >
                                -
                              </button>
                              <span className="px-3 py-1 text-amber-900">{(item.quantity || 1)}</span>
                              <button 
                                onClick={() => increaseQuantity(item._id)}
                                className="px-3 py-1 text-amber-700 hover:bg-amber-50 transition-colors"
                              >
                                +
                              </button>
                            </div>
                            
                            <button 
                              onClick={() => removeItem(item._id)}
                              className="ml-4 text-red-500 hover:text-red-700 transition-colors flex items-center"
                            >
                              <FaTrash className="mr-1" /> Remove
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-bold text-amber-900">
                            Rs. {item.price * (item.quantity || 1)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-8">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4">
                  <h2 className="text-xl font-bold text-white">Order Total</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
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
                    
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between text-lg font-bold text-amber-900">
                        <span>Total</span>
                        <span>Rs. {totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={orderButton}
                      className="w-full mt-6 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold shadow-lg hover:shadow-amber-400/30 transition-all"
                    >
                      Proceed to Checkout
                    </button>
                    
                    <button 
                      onClick={continueShopping}
                      className="w-full mt-3 py-3 bg-white border border-amber-600 text-amber-600 rounded-xl font-medium hover:bg-amber-50 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="font-bold text-amber-900 mb-3">Special Instructions</h3>
                    <textarea 
                      placeholder="Add any special requests or delivery instructions..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Promotional Banner */}
      {cartItems.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-8 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-white p-2 rounded-full mr-4">
                  <FaUtensils className="text-amber-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Free Delivery on Orders Over Rs. 1000</h3>
                  <p className="text-amber-100">Add more items to qualify for free delivery!</p>
                </div>
              </div>
              <button 
                onClick={continueShopping}
                className="px-6 py-3 bg-white text-amber-600 rounded-xl font-medium shadow-lg hover:bg-amber-50 transition-colors"
              >
                Add More Items
              </button>
            </div>
          </div>
        </div>
      )}
      
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

export default Cart;