import {
  ArrowRightCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React from "react";
import PizzaCard from "./PizzaCard";

function PizzaList({ pizzas }) {
  const router = useRouter();

  return (
    <div className="flex flex-col max-w-7xl  mx-auto p-2 gap-5 mt-5">
      {/* top */}
      <div className="flex flex-col space-y-3 items-center font-serif  ">
        <h3 className="font-semibold text-xl lg:text-3xl">
          The Best Pizza In Town
        </h3>
        <p className="text-md lg:text-xl mx-10 md:mx-20 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit
          arcu in pretium molestie. Interdum et malesuada fames acme. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      <div
        onClick={() => router.push("/products")}
        className="flex items-center justify-end text-gray-400 gap-2 font-serif hover:text-blue-900"
      >
        <button>See More</button>
        <ArrowRightIcon className="w-5 h-5" />
      </div>

      {/* bottom */}
      <div className="px-20 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pb-10">
        {pizzas
          .slice(0, 7)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((pizza) => (
            <PizzaCard key={pizza._id} pizza={pizza} />
          ))}
      </div>
    </div>
  );
}

export default PizzaList;
