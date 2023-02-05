import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import AddProduct from "@/components/AddProduct";
function Admin({ orders, products }) {
  //   console.log(orders);
  //   console.log(products);
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const [addModal, setAddModal] = useState(false);
  const [EditMode, setEditMode] = useState(false);
  const [EditId, setEditId] = useState();

  const status = ["preparing", "on the way", "delivered"];

  const handleEdit = async (id) => {
    //  console.log(id);
    // try {
    //   await axios.delete(process.env.base_url + "/api/products/" + id);
    //   setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    //   toast.success("Product Deleted Successfully");
    // } catch (err) {
    //   console.log(err);
    // }
    setEditId(null);

    setEditMode(true);
    setEditId(id);

    // <AddProduct id={id} EditMode />;
  };

  const handleDelete = async (id) => {
    //  console.log(id);
    try {
      await axios.delete(process.env.base_url + "/api/products/" + id);
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
      toast.success("Product Deleted Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    console.log(item);
    const currentStatus = item.status;

    try {
      if (currentStatus < 2) {
        const res = await axios.put(
          process.env.base_url + "/api/orders/" + id,
          {
            status: currentStatus + 1,
          }
        );
        setOrderList([
          res.data,
          ...orderList.filter((order) => order._id !== id),
        ]);
        toast.success("Status has been updated");
      } else {
        const res = await axios.put(
          process.env.base_url + "/api/orders/" + id,
          {
            status: 2,
          }
        );
        setOrderList([
          // after update return new list of orders array
          res.data,
          // delete the repeating id order inside of new list of order array
          ...orderList.filter((order) => order._id !== id),
        ]);

        // after order delievered delete the order
        await axios.delete(process.env.base_url + "/api/orders/" + id);

        setOrderList(orderList.filter((order) => order._id !== id));

        toast.info("Order has been Delivered");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full  bg-gray-100 py-5 ">
      <div className="flex flex-col lg:flex-row text-xs md:text-lg max-w-7xl font-serif mx-auto p-2 justify-between gap-10">
        {/* product */}
        <div className="shadow-lg w-full lg:w-1/2  bg-white rounded-lg">
          <div className="border-b p-2 flex justify-between items-center">
            <h2 className="text-lg md:text-3xl  pb-2 mx-2 font-semibold">
              Products
            </h2>

            <button
              onClick={() => setAddModal(true)}
              className="flex items-center text-gray-400 px-2 py-2 rounded-lg cursor-pointer hover:text-gray-600 hover:border-gray-600 hover:shadow-sm gap-1 border"
            >
              <PlusIcon className="w-5 h-5" />
              <span> Add Product</span>
            </button>
          </div>
          <table className="w-full  border-separate border-spacing-2 text-center mt-3 sm:table-fixed">
            <thead>
              <tr>
                <th>Product</th>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pizzaList?.map((product) => (
                <tr key={product?._id}>
                  <td>
                    <Image
                      src={product?.ProductImg}
                      alt=""
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="rounded-full w-1/2 h-auto mx-auto"
                    />
                  </td>
                  <td>{product?._id.slice(0, 7).concat("...")}</td>
                  <td>{product?.title}</td>
                  <td>${product?.price[0]}</td>
                  <td className=" space-x-2 w-full whitespace-nowrap md:text-lg">
                    <button
                      onClick={() => handleEdit(product?._id)}
                      //   onClick={() => setAddModal(true)}
                      className="bg-green-300 cursor-pointer text-xs shadow-md hover:bg-green-200  px-2 py-1 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product?._id)}
                      className="bg-red-300 cursor-pointer text-xs  shadow-md   hover:bg-red-200 px-2 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* order */}
        <div className="shadow-lg w-full lg:w-1/2  bg-white rounded-lg p-2">
          <h2 className="text-lg md:text-3xl border-b pb-2 mx-2 font-semibold">
            Orders
          </h2>
          <table className="w-full border-separate border-spacing-2  text-center mt-3 table-fixed">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orderList?.map((order, index) => (
                <tr key={index}>
                  <td>{order?._id.slice(0, 7).concat("...")}</td>
                  <td>{order?.customer}</td>
                  <td>${order?.total}</td>
                  <td>
                    {order?.paymentMethods === 0 ? (
                      <span>Cash</span>
                    ) : (
                      <span>Paid</span>
                    )}
                  </td>
                  <td>{status[order?.status]}</td>
                  <td className="space-x-2 text-xs md:text-base">
                    <button
                      onClick={() => handleStatus(order?._id)}
                      className="bg-blue-300 cursor-pointer shadow-md hover:bg-blue-200  whitespace-nowrap p-1 md:px-2 md:py-1 rounded-lg"
                    >
                      Next Stage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(addModal || EditMode) && (
        <Modal
          isOpen={addModal || EditMode}
          ariaHideApp={false}
          className="z-50 rounded-lg mt-10  shadow-lg pb-10  w-3/4 lg:w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute bg-gray-100"
        >
          <div>
            <XMarkIcon
              onClick={() => {
                setAddModal(false);
                setEditMode(false);
              }}
              className="w-6 h-6 m-2 cursor-pointer"
            />
          </div>
          {EditMode ? <AddProduct id={EditId} EditMode /> : <AddProduct />}
        </Modal>
      )}
    </div>
  );
}

export default Admin;

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  const productRes = await axios.get(process.env.NEXT_URL + "/api/products");
  const orderRes = await axios.get(process.env.NEXT_URL + "/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};
