import { removeFromCart, resetCart } from "@/slices/cartSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import Modal from "react-modal";

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const [XClose, setXClose] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [customer, setcustomer] = useState("");
  const [address, setaddress] = useState("");

  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };

  const CreateOrders = async (data) => {
    try {
      await axios
        .post(process.env.base_url + "/api/orders", data)
        .then((res) => {
          toast.success("Order created successfully");
          dispatch(resetCart());
          router.push(`/orders/${res.data._id}`);
        });
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              // Your code here after capture the order
              console.log(details);
              const shipping = details?.purchase_units[0]?.shipping;
              CreateOrders({
                customer: shipping?.name?.full_name,
                address: shipping?.address?.address_line_1,
                total: cart.total,
                paymentMethods: 1,
              });
            });
          }}
        />
      </>
    );
  };

  const handleCash = (e) => {
    e.preventDefault();
    CreateOrders({
      customer: customer,
      address: address,
      total: cart.total,
      paymentMethods: 0,
    });
    setCash(false);
  };

  return (
    <div className=" w-full relative h-full bg-gray-200 font-serif">
      <div className=" flex flex-col md:flex-row gap-10 p-4 max-w-7xl mx-auto ">
        {/* left */}
        <div className=" bg-white shadow-md flex-grow p-4 space-y-3 rounded-md">
          <h3 className="border-b-4 font-semibold text-xl md:text-3xl py-2 pl-3">
            {cart?.products?.length > 0 ? "Ready to Go" : "Your Cart is Empty"}
          </h3>

          <div>
            <table className="w-full e  table-fixed  text-center text-xs md:text-lg">
              <tbody>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Extras</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </tbody>

              <tbody className="hover:bg-gray-100">
                {cart.products.map((product, index) => (
                  <tr
                    key={index}
                    onMouseEnter={() => setXClose(true)}
                    onMouseLeave={() => setXClose(false)}
                    className={`shadow-md  hover:shadow-lg cursor-pointer duration-150  transform ease-linear rounded-md`}
                  >
                    <td className="flex items-center justify-center">
                      <div className="relative">
                        <img
                          src={product?.ProductImg}
                          alt="product"
                          className="w-12 h-12 md:w-20 md:h-20 rounded-full "
                        />
                        {XClose && (
                          <XMarkIcon
                            onClick={() => {
                              dispatch(removeFromCart({ _id: product._id }));
                            }}
                            className="w-4 h-4 lg:h-6 lg:w-6 absolute top-1 -left-3 md:-left-1 lg:-left-4 text-red-400 hover:text-red-600 font-bold"
                          />
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="lg:text-lg text-red-400 ">
                        {product?.title}
                      </span>
                    </td>
                    <td className="w-fit h-fit ">
                      {product?.top?.length > 0 ? (
                        <>
                          {product?.top.map((item) => (
                            <p
                              key={item._id}
                              className="w-12 md:w-20 lg:w-full truncate"
                            >
                              {item?.text}
                            </p>
                          ))}
                        </>
                      ) : (
                        <p>None</p>
                      )}
                    </td>
                    <td>
                      <span>${product?.price}</span>
                    </td>
                    <td>
                      <span>{product?.NumOfItems}</span>
                    </td>
                    <td>
                      <span>${product?.price * product?.NumOfItems}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* right */}
        <div className=" bg-white shadow-md space-y-5  p-6 font-serif rounded-md">
          <h3 className="text-xl font-semibold whitespace-nowrap">
            Subtotal <span className="text-red-400">{cart.NumOfItems}</span>{" "}
            items: ${cart.total}
          </h3>
          {open ? (
            <div className="space-y-3">
              <button
                onClick={() => setCash(true)}
                className="w-full rounded-md text-sm disabled:cursor-not-allowed hover:bg-blue-300 active:bg-blue-200 px-2 py-2 text-slate-100 font-semibold font-serif  bg-blue-400"
              >
                PAY BY CASH
              </button>
              {!cash && (
                <div style={{ maxWidth: "750px", minHeight: "200px" }}>
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        "ARQrZ-YduzvFDGsW9jQjbnE4hPLhXJSmhJGFooVA3INMa9O-Agicz9pTk8C6Y57jvV7hTJSiV-ERkRP4",
                      components: "buttons",
                      currency: "USD",
                      // "disable-funding": "credit-card",
                    }}
                  >
                    <ButtonWrapper currency={currency} showSpinner={false} />
                  </PayPalScriptProvider>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setOpen(true)}
              disabled={cart?.products?.length === 0}
              className="w-full rounded-lg disabled:cursor-not-allowed hover:bg-green-300 active:bg-green-200 p-2 shadow-md hover:shadow-lg bg-green-400"
            >
              Checkout
            </button>
          )}
        </div>
      </div>

      {cash && (
        <Modal
          isOpen={cash}
          ariaHideApp={false}
          className="h-[400px] rounded-lg shadow-lg w-3/4 lg:w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute bg-gray-100"
        >
          <div>
            <XMarkIcon
              onClick={() => {
                setCash(false);
              }}
              className="w-6 h-6 m-2 hover:text-red-500 cursor-pointer"
            />
          </div>
          <div className="flex flex-col items-center font-serif gap-2 w-full h-full">
            <h3 className="text-lg lg:text-2xl text-center font-bold">
              Your will pay ${cart.total} after delievery.
            </h3>
            <form
              onSubmit={handleCash}
              className="flex flex-col space-y-3 w-2/3"
            >
              <div className="flex flex-col gap-1 w-full">
                <label>Name</label>
                <input
                  value={customer}
                  onChange={(e) => setcustomer(e.target.value)}
                  autoFocus
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full p-1 shadow-sm focus-within:shadow-md outline-none md:p-2 rounded-md text-sm"
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label>Phone Number</label>
                <input
                  type="text"
                  placeholder="Phone number.."
                  className="w-full p-1 outline-none shadow-sm focus-within:shadow-md md:p-2 rounded-md text-sm"
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label>Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                  type="text"
                  placeholder="Address"
                  className="w-full p-1 outline-none shadow-sm focus-within:shadow-md md:p-2 rounded-md text-sm"
                />
              </div>

              <button
                type="submit"
                // disabled={cart?.products?.length === 0}
                className="w-full rounded-lg disabled:cursor-not-allowed hover:bg-green-300 active:bg-green-200 p-1 md:p-2 shadow-md hover:shadow-lg bg-green-400"
              >
                Order
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Cart;
