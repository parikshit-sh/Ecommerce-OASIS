import { useDispatch, useSelector } from 'react-redux';
import { removeItem, clearCart, updateQuantity } from '../redux/cartSlice';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleAddItem = (item) => {
    console.log('Adding item:', item);
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleRemoveItem = (item) => {
    console.log('Removing item from cart:', item);
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsPopupVisible(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-4 sm:p-8 mt-24"
    >
      <h2 className="text-2xl sm:text-4xl tracking-wider border-b p-3 sm:p-6 text-center uppercase mb-8">Cart</h2>
      
      {cartItems.length === 0 ? (
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl p-4 text-center"
        >
          Your cart is empty.
        </motion.p>
      ) : (
        <>
         <Helmet>
        <title>Oasis - Cart</title>
        <meta name="description" content="Welcome to Oasis - Your one-stop shop for plants and planters" />
      </Helmet>
          <ul className="space-y-4 sm:space-y-6 max-w-full">
            {cartItems.map((item, index) => (
              <motion.li 
                key={item.id} 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 bg-white shadow-md rounded-lg"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full">
                  <img
                    src={`/images/${item.image}`}
                    alt={item.name}
                    className="w-32 h-32 sm:w-44 sm:h-44 object-contain rounded-md"
                  />
                  <div className="flex flex-col items-center sm:items-start">
                    <span className="text-sm sm:text-base uppercase font-semibold mb-2">{item.name}</span>
                    <span className="text-sm sm:text-base text-gray-600">${item.price}</span>
                  </div>
                  
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden mt-4 sm:mt-0 ml-auto">
                    <button 
                      onClick={() => handleRemoveItem(item)} 
                      className="px-3 py-2 text-xl font-semibold hover:bg-gray-100 transition duration-200"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-sm w-10 text-center bg-gray-50">{item.quantity}</span>
                    <button
                      onClick={() => handleAddItem(item)}
                      className="px-3 py-2 text-xl font-semibold hover:bg-gray-100 transition duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-between items-center py-6 sm:py-8 mt-8 border-t"
          >
            <h3 className="text-xl sm:text-2xl uppercase mb-4 sm:mb-0">Total: ${totalPrice.toFixed(2)}</h3>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={handleClearCart} 
                className="bg-[#1E1E1E] text-white px-8 sm:px-12 py-3 hover:bg-red-600 transition duration-300 uppercase rounded-lg w-full sm:w-auto"
              >
                Clear Cart
              </button>
              <button 
                onClick={handleCheckout} 
                className="bg-blue-600 text-white px-8 sm:px-12 py-3 hover:bg-blue-700 transition duration-300 uppercase rounded-lg w-full sm:w-auto"
              >
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}

      <AnimatePresence>
        {isPopupVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-lg"
            onClick={() => setIsPopupVisible(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-semibold mb-4">Checkout Disabled</h3>
              <p className="text-gray-600 mb-6">CHECKOUT IS DISABLED ON THIS SITE.</p>
              <button
                onClick={() => setIsPopupVisible(false)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Cart;
