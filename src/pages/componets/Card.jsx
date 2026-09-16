import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const Card = ({ item }) => {
  const {
    cartItems,
    addToCart,
    increaseQty,
    decreaseQty,
    removeItem,
    user
  } = useContext(UserContext);

  // check if item already in cart
  const cartItem = cartItems.find(i => i.id === item.id);

  const handleAdd = () => {
    addToCart(item);
    toast.success(`${item.name} added 🛒`, { duration: 1200 });
  };

  return (
    <div className="w-65 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">

      {/* IMAGE */}
      <img
        src={item.image}
        alt={item.name}
        className="h-42.5 w-full object-cover"
      />

      {/* DETAILS */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-lg font-semibold">{item.name}</h3>

        <div className="flex justify-between items-center">
          <span className="text-green-600 font-bold">₹ {item.price}</span>
          <span className="text-sm text-green-500">{item.type}</span>
        </div>

        {/* ADD / QTY / REMOVE */}
        {!cartItem ? (
          <button 
            onClick={handleAdd}
            className="mt-auto bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold"
          >
            Add to Dish
          </button>
        ) : (
          <div className="mt-auto flex items-center justify-between border rounded-lg px-3 py-2">

            {/* DECREASE */}
            <button
              onClick={() => decreaseQty(item.id)}
              className="text-xl font-bold text-green-600"
            >
              
            </button>

            {/* QTY */}
            <span className="font-semibold">{cartItem.qty}</span>

            {/* INCREASE */}
            <button
              onClick={() => increaseQty(item.id)}
              className="text-xl font-bold text-green-600"
            >
              +
            </button>

            {/* REMOVE ICON */}
            <MdDelete
              onClick={() => removeItem(item.id)}
              className="text-red-500 text-xl cursor-pointer"
              title="Remove item"
            />
          </div>
        )}
      </div>

    </div>
  );
};

export default Card;