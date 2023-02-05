import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <footer className=" bg-black flex text-white gap-10 lg;gap-0">
      <Image
        height={0}
        width={0}
        sizes="100vw"
        className="hidden md:inline w-[30%] h-auto"
        alt=""
        src="https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-1617996277.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*"
      />

      <div className="hidden lg:inline-flex lg:w-[30%] px-10  items-center">
        <p className="font-serif font-bold text-3xl text-center">
          OH YES, WE DID.THE LAMA PIZZA, WELL BAKED SLICE OF PIZZA.
        </p>
      </div>

      <div className="flex flex-grow my-auto gap-10 p-5">
        <div className="flex flex-col space-y-5 text-md md:text-xl font-serif text-gray-300">
          <h1 className="text-lg md:text-2xl uppercase font-bold text-yellow-500">
            FIND OUR RESTAURANTS
          </h1>
          <p>
            1654 R. Don Road #304.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>
          <p>
            1654 R. Don Road #304.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>
          <p>
            2356 K. Laquie Rd #235.
            <br /> NewYork, 85022
            <br /> (602) 867-1011
          </p>
          <p>
            2356 K. Laquie Rd #235.
            <br /> NewYork, 85022
            <br /> (602) 867-1011
          </p>
        </div>

        <div className="flex flex-col space-y-5 text-md md:text-xl font-serif text-gray-300">
          <h1 className="text-lg md:text-2xl uppercase font-bold text-yellow-500">
            Working Hours
          </h1>
          <p>
            MONDAY UNTIL FRIDAY
            <br /> 9:00 – 22:00
          </p>

          <p>
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
