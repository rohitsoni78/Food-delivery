import React from "react"
import { LuLeafyGreen } from "react-icons/lu"
import { GiChickenOven } from "react-icons/gi"
import { useDispatch } from "react-redux"
import { AddItem } from "../redux/cartSlice"
import { toast } from "react-toastify"

const Card = ({ name, image,id, price, type }) => {
  let dispatch=useDispatch()
  return (
    <div className="w-75 h-100 bg-white p-4 rounded-xl flex flex-col gap-3 shadow-lg hover:shadow-xl hover:border-2 border-green-300 transition-all duration-300">

      {/* Image */}
      <div className="w-full h-[60%] overflow-hidden rounded-xl">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
        />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800">
        {name}
      </h2>

      {/* Price & Type */}
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold text-green-600">
          ₹ {price}
        </span>

        <span className="flex items-center gap-2 text-lg font-semibold text-green-600 capitalize">
          {type === "veg" ? <LuLeafyGreen /> : <GiChickenOven />}
          {type}
        </span>
      </div>

      {/* Button */}
     <button
  className="mt-auto w-full py-3 bg-green-500 rounded-xl text-white font-semibold hover:bg-green-400 active:scale-95 transition-all duration-200"
  onClick={() => {

    const user = localStorage.getItem("user")

    // ❌ LOGIN NAHI → SAME POPUP OPEN
    if (!user) {
      toast.error("Please login first 🚫")
      setShowLogin(true)   // ✅ BAS YE LAGANA HAI
      return
    }

    // ✅ LOGIN HAI → ADD ITEM
    dispatch(
      AddItem({
        id: id,
        name: name,
        price: price,
        image: image,
        qty: 1,
      })
    )

    toast.success("Dish Added ")
  }}
>
  Add to Dish
</button>
    </div>
  )
}

export default Card
