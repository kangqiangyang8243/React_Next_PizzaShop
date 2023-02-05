import React from "react";
import { PhoneIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import logo from "../public/Pizza_logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function Navbar() {
  const router = useRouter();
  const cart = useSelector((state) => state.cart);
  // console.log(cart);

  const routerPathMatch = (route) => {
    if (route === router.pathname) {
      return true;
    }
  };
  return (
    <nav className="z-20 w-full h-[70px] md:h-24 bg-red-600 sticky top-0  ">
      <div className="max-w-7xl h-full mx-auto flex items-center justify-between  px-2 ">
        {/* left */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:inline-flex w-16 h-16 rounded-full items-center justify-center bg-white">
            <PhoneIcon className="text-red-400 h-10 w-10" />
          </div>
          <div className=" text-white hidden lg:inline font-serif">
            <p className="uppercase">Order Now</p>
            <p className="font-semibold text-lg">012 345 678</p>
          </div>
        </div>

        {/* middle */}
        <ul className="flex  pl-3  items-center space-x-3 lg:space-x-5 text-white text-xl  font-serif">
          <li
            onClick={() => router.push("/")}
            className={`hover:underline underline-offset-4 cursor-pointer hover:scale-105 transform duration-150 ease-out ${
              routerPathMatch("/") && "underline underline-offset-8 font-bold"
            }`}
          >
            HomePage
          </li>
          <li
            onClick={() => router.push("/products")}
            className={`hover:underline underline-offset-4 cursor-pointer hover:scale-105 transform duration-150 ease-out ${
              routerPathMatch("/products") &&
              "underline underline-offset-8 font-bold"
            }`}
          >
            Products
          </li>

          <Image
            src={logo}
            className="rounded-full hidden lg:inline p-2"
            alt="logo"
            width={95}
            height={95}
            onClick={() => router.push("/")}
          />
          <li className="hover:underline underline-offset-4 cursor-pointer hover:scale-105 transform duration-150 ease-out hidden md:inline">
            Events
          </li>

          <li className="hover:underline underline-offset-4 cursor-pointer hover:scale-105 transform duration-150 ease-out hidden md:inline">
            Contact
          </li>
        </ul>
        {/* right */}
        <div className="flex items-center gap-5 ">
          <button
            onClick={() => router.push("/admin")}
            className="px-3 py-2 text-white bg-gray-800 hover:bg-gray-600 rounded-lg shadow-md"
          >
            Admin
          </button>
          <div
            onClick={() => router.push("/cart")}
            className="relative pr-4 cursor-pointer"
          >
            <ShoppingCartIcon className="text-red-300 hover:text-red-100 h-10 w-10" />
            <div className="w-5 h-5 absolute -top-1 right-2 bg-white rounded-full flex items-center justify-center">
              <p className="font-semibold ">{cart.NumOfItems}</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
