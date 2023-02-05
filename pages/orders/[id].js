import {
  BanknotesIcon,
  CheckCircleIcon,
  CreditCardIcon,
  GiftTopIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Orders({ order }) {
  const router = useRouter();
  console.log(order);

  return (
    <div className=" w-full bg-gray-200 font-serif">
      <div className="h-fit flex flex-col md:flex-row gap-10 p-4 max-w-7xl mx-auto ">
        {/* left */}
        <div className=" bg-white shadow-md flex-grow  space-y-10 rounded-md py-7 px-2">
          <div>
            <table className="w-full table-fixed   overflow-hidden text-center text-xs md:text-lg">
              <thead>
                <tr className="text-sm lg:text-base">
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Address</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-xs lg:text-base">
                  <td>{order?._id?.slice(0, 12).concat("...")}</td>
                  <td>{order?.customer} </td>
                  <td>{order?.address}</td>
                  <td>${order?.total}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between lg:justify-evenly px-2 lg:px-5">
            <div className="flex flex-col items-center">
              <CreditCardIcon className="w-8 h-8 text-gray-600" />
              <p className="text-sm">Payment</p>
              <CheckCircleIcon className="w-6 h-6 bg-green-500 rounded-full text-white" />
            </div>
            <div className="flex flex-col items-center text-gray-500 animate-pulse">
              <BanknotesIcon className="w-8 h-8 " />
              <p className="text-sm">Preparing</p>
            </div>
            <div className="flex flex-col items-center text-gray-300">
              <PaperAirplaneIcon className="w-8 h-8 " />
              <p className="text-sm">On the way</p>
            </div>
            <div className="flex flex-col items-center text-gray-300">
              <GiftTopIcon className="w-8 h-8 " />
              <p className="text-sm">Delivered</p>
            </div>
          </div>
        </div>

        {/* right */}
        {/* <div className=" bg-white shadow-md space-y-5  p-6 font-serif rounded-md">
          <h3 className="text-xl font-semibold whitespace-nowrap">
            Subtotal -- <span className="text-red-500">${order?.total}</span>
          </h3>
          <button className="w-full rounded-lg hover:bg-green-300 active:bg-green-200 p-2 shadow-md hover:shadow-lg bg-green-400">
            PAID
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default Orders;

export async function getServerSideProps({ params }) {
  const order = await axios
    .get(process.env.NEXT_URL + `/api/orders/${params.id}`)
    .then((res) => res.data);

  return {
    props: {
      order,
    },
  };
}
