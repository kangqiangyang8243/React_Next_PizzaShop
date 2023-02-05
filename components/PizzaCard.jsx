import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function PizzaCard({ pizza }) {
  // console.log(pizza);
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/products/${pizza._id}`)}
      className="flex p-3 shadow-md rounded-lg hover:shadow-lg flex-col items-center bg-slate-50 font-serif hover:scale-105 transform duration-150 ease-in cursor-pointer"
    >
      <Image
        src={pizza?.ProductImg}
        alt="product"
        width={200}
        height={200}
        className="mb-4 rounded-full"
      />

      <h3 className="text-lg font-bold text-red-600">{pizza?.title}</h3>

      <p className="text-[#666666] text-lg">{pizza?.price[0]}</p>

      <p className="text-center text-gray-500">{pizza?.description}</p>
    </div>
  );
}

export default PizzaCard;
