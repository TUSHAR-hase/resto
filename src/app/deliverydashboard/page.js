'use client'

import { useRouter } from "next/navigation"
import Deliveryheader from "../deliveryheader/page"
import { useState, useEffect } from "react"
import { FaMotorcycle, FaMapMarkerAlt, FaMoneyBillWave, FaHistory, FaCheckCircle, FaTruck, FaClock, FaBolt, FaUser, FaUtensils } from 'react-icons/fa'
import { motion } from 'framer-motion'

const DeliveryDashboard = () => {
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [deliveryData, setDeliveryData] = useState(null)
  const [stats, setStats] = useState({
    totalOrders: 0,
    completed: 0,
    pending: 0,
    earnings: 0
  })
  const [activeTab, setActiveTab] = useState('active')
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem('delivery'))
    if (!delivery) {
      router.push('/deliverypartner')
    } else {
      setDeliveryData(delivery)
      fetchOrders(delivery._id)
    }
  }, [])
  
  const fetchOrders = async (deliveryId) => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:3000/api/deliverypartner/orders/${deliveryId}`)
      const data = await response.json()
      
      if (data.success) {
        setOrders(data.result)
        
        // Calculate stats
        const completed = data.result.filter(order => order.status === 'Delivered').length
        const pending = data.result.filter(order => order.status !== 'Delivered').length
        
        setStats({
          totalOrders: data.result.length,
          completed,
          pending,
          earnings: data.result.reduce((sum, order) => sum + order.amount, 0)
        })
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }
  
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'on the way': return 'bg-blue-100 text-blue-800'
      case 'preparing': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return <FaCheckCircle className="text-green-500" />
      case 'on the way': return <FaTruck className="text-blue-500" />
      case 'preparing': return <FaClock className="text-yellow-500" />
      case 'cancelled': return <FaClock className="text-red-500" />
      default: return <FaClock className="text-gray-500" />
    }
  }
  
  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(`http://localhost:3000/api/order/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderId, status })
      })
      
      const data = await response.json()
      if (data.success) {
        // Update local state
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, status } : order
        ))
      }
    } catch (error) {
      console.error("Error updating order status:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Deliveryheader />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Delivery Dashboard
            </h1>
            <p className="text-gray-600">Welcome back, {deliveryData?.name || 'Partner'}!</p>
          </div>
          <div className="mt-4 md:mt-0 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="flex items-center text-gray-700">
              <FaBolt className="text-amber-500 mr-2" />
              <span>Your rating: <span className="font-bold">4.8/5</span></span>
            </p>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg">Total Orders</p>
                <h3 className="text-3xl font-bold mt-2">{stats.totalOrders}</h3>
              </div>
              <FaHistory className="text-3xl opacity-80" />
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg">Completed</p>
                <h3 className="text-3xl font-bold mt-2">{stats.completed}</h3>
              </div>
              <FaCheckCircle className="text-3xl opacity-80" />
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg">Pending</p>
                <h3 className="text-3xl font-bold mt-2">{stats.pending}</h3>
              </div>
              <FaClock className="text-3xl opacity-80" />
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg">Total Earnings</p>
                <h3 className="text-3xl font-bold mt-2">₹{stats.earnings.toFixed(2)}</h3>
              </div>
              <FaMoneyBillWave className="text-3xl opacity-80" />
            </div>
          </motion.div>
        </div>
        
        {/* Orders Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="flex border-b border-gray-200">
            <button 
              className={`px-6 py-4 font-medium relative ${activeTab === 'active' ? 'text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('active')}
            >
              Active Orders
              {activeTab === 'active' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 rounded-t"></div>
              )}
            </button>
            <button 
              className={`px-6 py-4 font-medium relative ${activeTab === 'completed' ? 'text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed
              {activeTab === 'completed' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 rounded-t"></div>
              )}
            </button>
          </div>
        </div>
        
        {/* Orders List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <FaMotorcycle className="mx-auto text-gray-300 text-5xl mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No orders assigned</h3>
            <p className="text-gray-500 mb-6">You don't have any active orders at the moment.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
            >
              Refresh Orders
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {orders
              .filter(order => 
                activeTab === 'active' ? order.status !== 'Delivered' : order.status === 'Delivered'
              )
              .map((order, index) => (
              <motion.div 
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <div className="bg-amber-100 p-2 rounded-lg mr-4">
                          <FaUtensils className="text-amber-600 text-xl" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{order.data?.name || "Restaurant Name"}</h3>
                          <p className="text-gray-600 text-sm">Order ID: {order._id}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="flex items-start">
                          <FaMapMarkerAlt className="text-gray-400 mt-1 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Delivery Address</p>
                            <p className="text-gray-700">{order.data?.address || "Customer Address"}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FaUser className="text-gray-400 mt-1 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Customer</p>
                            <p className="text-gray-700">{order.userdata?.name || "Customer Name"}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FaMoneyBillWave className="text-gray-400 mt-1 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Order Amount</p>
                            <p className="text-gray-700 font-bold">₹{order.amount?.toFixed(2) || "0.00"}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FaClock className="text-gray-400 mt-1 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-500">Order Time</p>
                            <p className="text-gray-700">30 minutes ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-2">{order.status}</span>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-2">Update Status</p>
                        <div className="flex">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          >
                            <option value="Preparing">Preparing</option>
                            <option value="On the way">On the way</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <button 
                            className="bg-amber-500 text-white px-4 py-2 rounded-r-lg hover:bg-amber-600 transition-colors"
                            onClick={() => updateOrderStatus(order._id, document.querySelector(`select[value="${order.status}"]`).value)}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                  <button className="text-amber-600 font-medium hover:text-amber-800 flex items-center">
                    <FaMapMarkerAlt className="mr-2" /> View on Map
                  </button>
                  <button className="flex items-center bg-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-600 transition-colors">
                    <FaUser className="mr-2" /> Contact Customer
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Performance Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Your Performance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-700">On-time Delivery</h3>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                  97%
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{width: '97%'}}></div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-700">Customer Rating</h3>
                <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm font-medium">
                  4.8/5
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{width: '96%'}}></div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-700">Completion Rate</h3>
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                  99%
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{width: '99%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tips Section */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">Delivery Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white bg-opacity-20 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Check Orders</h3>
              <p>Always double-check order contents before leaving the restaurant</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white bg-opacity-20 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Packaging</h3>
              <p>Ensure food is properly secured to prevent spills during transit</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white bg-opacity-20 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Be Punctual</h3>
              <p>Update customers if you anticipate delays in delivery</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <FaMotorcycle className="text-amber-500 text-2xl mr-2" />
                <h2 className="text-xl font-bold">SwiftRider Delivery</h2>
              </div>
              <p className="mt-2 text-gray-400">Efficient and reliable food delivery</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">Help Center</a>
              <a href="#" className="hover:text-white transition-colors">Partner Resources</a>
              <a href="#" className="hover:text-white transition-colors">Contact Support</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm">
            <p>© 2023 SwiftRider Delivery. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DeliveryDashboard