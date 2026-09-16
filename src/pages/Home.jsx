import React, { useState, useContext, useEffect } from 'react'
import Nav from './componets/Nav'
import { Categories } from '../Category'
import { useNavigate } from "react-router-dom";
import Card from './Card'
import { food_items } from '../food'
import { UserContext } from '../context/UserContext'
import { RxCross2 } from "react-icons/rx";
import Card2 from "./componets/Card2";
import { useSelector } from 'react-redux'
import Login from "./Login"   

const Home = () => {

  const navigate = useNavigate();
  const { input, showCart, setShowCart } = useContext(UserContext)
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [cate, setCate] = useState(food_items)
  const [activeCategory, setActiveCategory] = useState("All")

  const [showLogin,setShowLogin] = useState(false)  

  const filter = (category) => {
    setActiveCategory(category)

    if (category === "All") {
      setCate(food_items)
    } else {
      const filteredData = food_items.filter(
        (item) =>
          item.food_category?.toLowerCase().trim() ===
          category.toLowerCase().trim()
      )
      setCate(filteredData)
    }
  }

  useEffect(() => {
    let data = food_items

    if (activeCategory !== "All") {
      data = data.filter(
        (item) =>
          item.food_category?.toLowerCase().trim() ===
          activeCategory.toLowerCase().trim()
      )
    }

    if (input.trim() !== "") {
      data = data.filter((item) =>
        item.food_name.toLowerCase().includes(input.toLowerCase())
      )
    }

    setCate(data)
  }, [input, activeCategory])
  useEffect(() => {
    const openLogin = () => setShowLogin(true);

    window.addEventListener("openLogin", openLogin);

    return () => {
      window.removeEventListener("openLogin", openLogin);
    };
  }, []);


  let items=useSelector(state=>state.cart)
  let subtotal=items.reduce((total,item)=>total+item.qty*item.price,0)
  let deliveryFee = 20;
  let taxes = subtotal * 0.5 / 100;
  let total=Math.floor(subtotal+deliveryFee+taxes)
  

  return (
    <div className='bg-slate-200 w-full min-h-screen'>

      <Nav setShowLogin={setShowLogin} />

      {/* CATEGORY */}
      <div className='flex flex-wrap justify-center items-center gap-5 w-full p-5'>
        {Categories.map((item, index) => (
          <div
            key={index}
            className='w-35 h-35 bg-white flex flex-col items-start gap-5 p-5 text-[20px] font-semibold text-gray-600 rounded-lg shadow-xl hover:bg-green-200 cursor-pointer transition-all duration-200'
            onClick={() => filter(item.name)}
          >
            {item.icon}
            {item.name}
          </div>
        ))}
      </div>

      {/* FOOD ITEMS */}
      <div className='w-full flex flex-wrap gap-5 p-5 justify-center items-center pt-8 pb-8'>
        {cate.length > 0 ? (
          cate.map((item) => (
            <Card
              key={item.id}
              name={item.food_name}
              image={item.food_image}
              price={item.price}
              id={item.id}
              type={item.food_type}
              setShowLogin={setShowLogin}
            />
          ))
        ) : (
          <p className="text-xl text-green-600">No items found</p>
        )}
      </div>

      {/* CART SECTION */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[40vw] bg-white shadow-xl p-6 z-50 transform transition-all duration-500 ease-in-out flex flex-col items-center overflow-auto ${
          showCart ? "translate-x-0" : "translate-x-full"
        }`}
      >

        <header className='w-full flex justify-between items-center'>
          <span className='text-green-500 text-[18px] font-semibold'>
            Order Items
          </span>

          <RxCross2
            className='w-7 h-7 text-green-500 cursor-pointer hover:text-gray-600'
            onClick={() => setShowCart(false)}
          />
        </header>

        {items.length>0 ? (
          <>
            <div className='w-full mt-9 flex flex-col gap-8 items-center'>
              {items.map((item) => (
                <Card2 key={item.id} {...item} />
              ))}
            </div>

            <div className='w-full border-t-2 border-gray-400 border-b-2 mt-7 flex flex-col gap-2 p-8'>

              <div className='w-full flex justify-between items-center'>
                <span className='text-lg text-gray-600 font-semibold'>Subtotal</span>
                <span className='text-green-400 font-semibold text-lg'> Rs { subtotal }/-</span>
              </div>

              <div className='w-full flex justify-between items-center'>
                <span className='text-lg text-gray-600 font-semibold'>Deliver Fee</span>
                <span className='text-green-400 font-semibold text-lg'> Rs { deliveryFee }/-</span>
              </div>

              <div className='w-full flex justify-between items-center'>
                <span className='text-lg text-gray-600 font-semibold'>Taxes</span>
                <span className='text-green-400 font-semibold text-lg'> Rs { taxes }/-</span>
              </div>

            </div>

            <div className='w-full flex justify-between items-center'>
              <span className='text-xl text-gray-600 font-semibold p-9'>Total</span>
              <span className='text-green-400 font-semibold text-lg'> Rs { total }/-</span>
            </div>

            <button
                  onClick={() => navigate("/success")}
                  className='mt-auto w-[80%] py-3 bg-green-500 rounded-xl text-white font-semibold hover:bg-green-400 active:scale-95 transition-all'
                >
                  Place Order
                </button>
          </>
        ) : (
          <div className='text-center text-2xl text-green-500 font-semibold pt-5'>
            Empty Cart
          </div>
        )}
      </div>

      {/* LOGIN POPUP */}
      {showLogin && <Login setShowLogin={setShowLogin}/>}

    </div>
  )
}

export default Home;