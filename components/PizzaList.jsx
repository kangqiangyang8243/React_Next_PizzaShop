import React from "react";
import PizzaCard from "./PizzaCard";

function PizzaList({ pizzas }) {
  // console.log(pizzas);
  return (
    <div className="flex flex-col max-w-7xl  mx-auto p-2 space-y-10 mt-5">
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

      {/* bottom */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pb-10">
        {pizzas.slice(0, 7).map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
}

export default PizzaList;
