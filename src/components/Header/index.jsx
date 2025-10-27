import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Minus,
  Plus,
  ShoppingBasket,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  productAdd,
  productRemove,
  selectCartTotal,
} from "../../Redux/feature/Cart/CartSlice";
import "./header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartisOpen, setCartisOpen] = useState(false);
  const [userisOpen, setUserisOpen] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [userLoggedIn, setuserLoggedIn] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const cart = useSelector((pre) => pre.cart);
  const price = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);
  const handleviewcart = () => {
    setCartisOpen(false);
    navigate("/bakery-list/viewcart");
  };

  const menu = [
    {
      text: "CAKES",
      link: "/bakery-list",
      sub: [
        { text: "Birthday Cakes", link: "/bakery-list/birthday" },
        { text: "Wedding Cakes", link: "/bakery-list/wedding" },
        { text: "Custom Cakes", link: "/bakery-list/custom" },
        { text: "Cupcakes", link: "/bakery-list/cupcakes" },
      ],
    },
    {
      text: "FLORIST",
      link: "/florist",
      sub: [
        { text: "Roses", link: "/florist/roses" },
        { text: "Tulips", link: "/florist/tulips" },
        { text: "Bouquets", link: "/florist/bouquets" },
      ],
    },
    {
      text: "DECORATION",
      link: "/decoration",
      sub: [
        { text: "Balloon Decor", link: "/decoration/balloons" },
        { text: "Stage Decor", link: "/decoration/stage" },
        { text: "Party Themes", link: "/decoration/themes" },
      ],
    },
    {
      text: "GIFTING",
      link: "/gifting",
      sub: [
        { text: "Gift Hampers", link: "/gifting/hampers" },
        { text: "Chocolates", link: "/gifting/chocolates" },
        { text: "Personalized Gifts", link: "/gifting/personalized" },
      ],
    },
  ];

  // scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      setIsVisible(currentScrollTop < lastScrollTop);
      setLastScrollTop(currentScrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return (
    <motion.div className={`fixed top-0 w-full z-50`}>
      {/* MOBILE HEADER */}
      <div
        className={`flex justify-between items-center p-6 bg-white relative ${
          isOpen ? "rounded-t-3xl" : "rounded-b-3xl"
        } md:hidden`}
      >
        <div onClick={toggle} className="transition duration-500 ease-in-out">
          {isOpen ? <X /> : <Menu />}
        </div>
        <div>
          <Link to={"/"}>
            <h1 className="text-lg font-bold tracking-wide">
              FoodForMood Cakes
            </h1>
          </Link>
        </div>
        <div className="flex justify-center items-center gap-2">
          <User onClick={() => setUserisOpen((pre) => !pre)} />
          <ShoppingBasket onClick={() => setCartisOpen((pre) => !pre)} />
        </div>
      </div>

      {/* DESKTOP HEADER */}
      <div className="desktop-navbar">
        <div className="flex justify-between items-center p-5 bg-white rounded-xl relative">
          <Link to={"/"}>
            <h1 className="text-lg font-bold tracking-wide">
              FoodForMood Cakes
            </h1>
          </Link>

          <div className="flex justify-center items-center gap-8 relative">
            {menu.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setHoveredMenu(index)}
                onMouseLeave={() => setTimeout(() => setHoveredMenu(null), 150)}
              >
                <Link to={item.link}>
                  <h1 className="cursor-pointer font-medium hover:text-pink-600 transition-colors duration-300">
                    {item.text}
                  </h1>
                </Link>

                {/* Submenu */}
                <AnimatePresence>
                  {hoveredMenu === index && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute top-7 left-0 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                    >
                      {item.sub.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.link}
                          className="block px-4 py-2 hover:bg-pink-50 text-sm text-gray-700 transition-all"
                        >
                          {subItem.text}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-3 relative">
            <User
              onClick={() => setUserisOpen((pre) => !pre)}
              className="cursor-pointer"
            />
            <ShoppingBasket
              onClick={() => {
                setCartisOpen((pre) => !pre);
                setUserisOpen(false);
              }}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="h-[30vh] bg-white rounded-b-2xl "
        >
          <div className="flex justify-center items-center gap-5 flex-col">
            {menu.map((item, index) => (
              <Link key={index} to={item.link}>
                <h1
                  onClick={() => setIsOpen(false)}
                  className="text-xl font-Poppins"
                >
                  {item.text}
                </h1>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* CART COUNT */}
      {cart.length > 0 && (
        <h1 className="flex justify-center items-center bg-red-600 text-sm rounded-lg h-[20px] w-[20px] text-white absolute right-3 top-3">
          {cart.length}
        </h1>
      )}

      {/* CART SIDEBAR */}
      {cartisOpen && (
        <div className="xl:p-5 bg-black/50 min-h-[100vh] fixed top-0 left-0 right-0 bottom-0 overflow-hidden">
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.45 }}
            className="bg-white h-[70vh] absolute -bottom-10 w-full rounded-t-3xl xl:bottom-0 xl:top-0 xl:w-1/2 xl:h-screen xl:right-0"
          >
            <div className="p-5">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-medium">Your Cart</h1>
                <X
                  onClick={() => setCartisOpen((pre) => !pre)}
                  className="cursor-pointer"
                />
              </div>
              <div className="relative xl:h-[85vh] h-[50vh] overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="flex flex-col justify-center items-center mt-14">
                    <h1 className="text-2xl leading-none text-zinc-400">
                      Add Some Bread 🥲
                    </h1>
                    <img
                      src="/contactchef.png"
                      alt=""
                      className="xl:h-[550px] pointer-events-none"
                    />
                  </div>
                ) : (
                  <div className="mt-7 xl:p-5">
                    <div className="flex flex-col justify-center gap-1">
                      {cart.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center bg-zinc-50 rounded-lg h-[12vh] gap-3"
                        >
                          <img
                            src={item.img}
                            alt=""
                            className="h-[10vh] object-contain w-[100px]"
                          />
                          <div>
                            <h1 className="text-sm font-Poppins">
                              {item.name}
                            </h1>
                            <p className="text-xs text-zinc-400">
                              {item.price} x {item.quantity}
                            </p>
                          </div>
                          <div className="flex flex-col justify-end items-end p-1 gap-1">
                            <div className="flex justify-center items-center bg-zinc-100 border px-1 gap-2 py-1 rounded-lg">
                              <button
                                onClick={() => dispatch(productRemove(item.id))}
                              >
                                <Minus size={15} />
                              </button>
                              <h1 className="text-sm font-medium">
                                {item.quantity}
                              </h1>
                              <button
                                onClick={() => dispatch(productAdd(item))}
                              >
                                <Plus size={15} />
                              </button>
                            </div>
                            <h1 className="text-xs text-end pr-2 leading-none tracking-tighter">
                              $ {(item.price * item.quantity).toFixed(2)}
                            </h1>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-green-800 sticky bottom-0 mt-5 rounded-2xl">
                      <div className="p-2">
                        <div className="flex justify-between items-center w-full gap-3 text-white rounded-xl p-2">
                          <div className="flex gap-2 justify-center items-center">
                            <h1 className="text-xs">Total:</h1>
                            <h1 className="text-base font-medium">
                              $ {price.toFixed(2)}
                            </h1>
                          </div>
                          <button
                            onClick={handleviewcart}
                            className="text-base font-medium flex justify-center items-center"
                          >
                            Place Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* USER DROPDOWN */}
      {userisOpen && (
        <div
          onClick={() => setUserisOpen(false)}
          className="bg-white absolute right-16 min-h-[5vh] p-2 flex-col flex gap-4 rounded-b-lg w-[120px] text-center duration-500 transition ease-in-out"
        >
          {userLoggedIn ? (
            <div className="flex flex-col gap-3">
              <Link to={"/order_product"}>
                <h1 className="font-semibold flex justify-center items-center gap-2">
                  <ShoppingCart /> Order
                </h1>
              </Link>
              <h1 className="font-semibold">Log out</h1>
            </div>
          ) : (
            <Link to={"/login"}>
              <h1 className="font-semibold">Login</h1>
            </Link>
          )}
        </div>
      )}
    </motion.div>
  );
}
