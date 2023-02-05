import axios from "axios";
import React from "react";
import PizzaCard from "@/components/PizzaCard";
function Products({ pizzas }) {
  //   console.log(pizzas);
  return (
    <div className="w-full bg-gray-100">
      <div className="max-w-7xl mx-auto p-4 font-serif">
        <h1 className="text-3xl font-semibold border-b-2 py-2 pb-4">
          Choose Your Favorite Pizza
        </h1>
        <div className="grid sm:grid-cols-2 p-4 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
          {pizzas.map((pizza) => (
            <PizzaCard pizza={pizza} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;

export async function getServerSideProps() {
  const pizzas = await axios
    .get(process.env.NEXT_URL + "/api/products")
    .then((res) => res.data);

  return {
    props: {
      pizzas,
    },
  };
}
