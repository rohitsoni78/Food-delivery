import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

  // ✅ ADD THIS (MAIN FIX)
  const [user, setUser] = useState(null);

  const [input, setInput] = useState("");
  const [cate, setCate] = useState("All");
  const [showCart, setShowCart] = useState(false);

  const [showLogin, setShowLogin] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCartItems(prev =>
      prev.map(i =>
        i.id === id ? { ...i, qty: i.qty + 1 } : i
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(prev =>
      prev
        .map(i =>
          i.id === id ? { ...i, qty: i.qty - 1 } : i
        )
        .filter(i => i.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const deliveryFee = subTotal > 0 ? 20 : 0;
  const tax = Math.round(subTotal * 0.005);
  const totalAmount = subTotal + deliveryFee + tax;

  return (
    <UserContext.Provider
      value={{
        // ✅ ADD THIS
        user,
        setUser,

        input,
        setInput,
        cate,
        setCate,
        showCart,
        setShowCart,

        showLogin,
        setShowLogin,

        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,

        cartCount,
        subTotal,
        deliveryFee,
        tax,
        totalAmount
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;