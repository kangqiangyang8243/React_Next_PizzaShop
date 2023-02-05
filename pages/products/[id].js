import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/slices/cartSlice";
function Products({ pizza }) {
  // console.log(pizza);
  const [Size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza?.price[0]);
  const [top, setTop] = useState([]);
  const [NumOfItems, setNumOfItems] = useState(1);
  const dispatch = useDispatch();

  // console.log(NumOfItems);
  // console.log(Size);
  // console.log(top);
  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      // checked then + price
      changePrice(option?.price);
      setTop((prev) => [...prev, option]);
    } else {
      // unchecked then - price
      changePrice(option?.price * -1);
      setTop(top.filter((item) => item._id !== option._id));
    }
  };

  const handleSize = (sizeIndex) => {
    // price[1] - price[0];
    // 13 - 12 = 1
    const difference = pizza?.price[sizeIndex] - pizza?.price[Size];

    //update size to 1
    setSize(sizeIndex);

    // set difference between new price and old price == 1
    changePrice(difference);
  };

  const handleClick = () => {
    dispatch(addToCart({ ...pizza, price, NumOfItems, top }));
  };
  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto pb-10 p-3 gap-10">
      {/* left */}
      <div className="h-full flex items-center justify-center md:w-[40%] md:my-auto">
        <Image
          src={pizza?.ProductImg}
          alt={pizza?.title}
          height={0}
          width={0}
          sizes="100vw"
          className="w-full rounded-full  h-auto object-cover"
        />
      </div>

      {/* right */}
      <div className="flex-grow flex flex-col text-center md:text-left gap-5 p-5 font-serif">
        <h3 className="font-semibold text-2xl">{pizza?.title}</h3>
        <p className="text-red-500 underline underline-offset-8 text-xl">
          ${price}
        </p>
        <p className="px-5 md:px-0">{pizza?.description}</p>

        <div className="flex flex-col items-center md:items-start gap-5">
          <h3 className="font-semibold text-xl">Choose the Size</h3>
          <select
            className=" border py-2 px-4 rounded-lg"
            value={Size}
            onChange={(e) => handleSize(e.target.value)}
          >
            <option value={0}>Small</option>
            <option value={1}>Medium</option>
            <option value={2}>Large</option>
          </select>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="font-semibold text-xl">
            Choose additional ingredients
          </h3>
          {/* bottom */}
          <div className="  gap-5 flex-col flex justify-center items-start mx-auto md:mx-0 ">
            {pizza?.extraOptions.map((option) => (
              <div
                key={option._id}
                className="flex item-center text-lg  space-x-2 tracking-wide"
              >
                <input
                  type="checkbox"
                  name={option?.text}
                  id={option?.text}
                  onChange={(e) => handleChange(e, option)}
                />
                <label htmlFor="Double Ingredients">{option?.text}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-evenly gap-10">
          <input
            type="number"
            min={1}
            max={50}
            defaultValue={1}
            onChange={(e) => setNumOfItems(e.target.value)}
            className="border px-2  py-1 rounded-lg text-gray-500 text-lg"
          />
          <button
            onClick={handleClick}
            className="bg-red-500 disabled:cursor-not-allowed hover:bg-red-300 w-1/2 lg:w-1/2 rounded-lg px-4 py-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Products;

export async function getServerSideProps({ params }) {
  const pizza = await axios
    .get(process.env.NEXT_URL + `/api/products/${params.id}`)
    .then((res) => res.data);

  return {
    props: {
      pizza,
    },
  };
}
