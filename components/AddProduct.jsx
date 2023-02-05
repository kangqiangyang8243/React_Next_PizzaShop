import React, { useEffect, useState } from "react";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function AddProduct({ id, EditMode }) {
  const [EditPizza, setEditPizza] = useState();
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [file, setFile] = useState(null);
  const [extra, setExtra] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await axios
          .get(process.env.base_url + `/api/products/${id}`)
          .then((res) => {
            // console.log(res.data);
            setEditPizza(res.data);
            setTitle(res.data.title);
            setDescription(res.data.description);
            setPrice(res.data.price);

            setExtraOptions(res.data.extraOptions);
          });
      }
    };
    fetchData();
  }, [id, EditMode]);

  //   console.log(EditPizza);
  //   console.log(id);

  //   console.log(extraOptions);

  const changePrice = (e, index) => {
    const currentPrices = price;
    currentPrices[index] = e.target.value;
    setPrice(currentPrices);
    // console.log(price);
  };

  const handleExtraInput = (e) => {
    e.preventDefault();

    // console.log(e.target.name);
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  //   console.log(extra);

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };
  //   console.log(extraOptions);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    //   upload folder
    formData.append("upload_preset", "fw2g9gfx");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dj5qwihzu/upload",
        formData
      );

      const { url } = uploadRes.data;
      const newProduct = {
        title: title,
        description: description,
        price: price,
        extraOptions: extraOptions,
        ProductImg: url,
      };

      if (EditMode) {
        await axios.put(
          process.env.base_url + `/api/products/${id}`,
          newProduct
        );
        toast.success("New Product Updated Successfully");
      } else {
        await axios.post(process.env.base_url + "/api/products", newProduct);
        toast.success("New Product Added Successfully");
      }

      //   router.push("/admin");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const handleDiscard = () => {
    setFile(null);
    setTitle("");
    setDescription("");
    setPrice([]);
    setExtraOptions([]);
    setExtra(null);
  };
  return (
    <div className="flex flex-col items-center font-serif gap-3 w-full h-full">
      <h3 className="text-lg lg:text-2xl text-center font-bold">
        {EditMode ? "Edit Product" : "Add New Product"}
      </h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 h-fit w-2/3 font-serif "
      >
        <div className="flex items-center">
          <div className="flex flex-col gap-1 w-full">
            <label>Choose An Image</label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                id="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label htmlFor="file">
                <PlusCircleIcon className="w-7 h-7 cursor-pointer  hover:text-red-500" />
              </label>
              {/* For Update */}
              {EditMode && (
                <div className="w-20 h-20 shadow-md rounded-lg border">
                  {file ? (
                    <img src={URL.createObjectURL(file)} alt="" />
                  ) : (
                    <img src={EditPizza?.ProductImg} alt="" />
                  )}
                </div>
              )}

              {/* For Add New Product */}
              {!EditMode && (
                <div className="w-20 h-20 shadow-md rounded-lg border">
                  {file && <img src={URL.createObjectURL(file)} alt="" />}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            type="text"
            name="name"
            placeholder="Title"
            className="w-full p-1 shadow-sm focus-within:shadow-md outline-none md:p-2 rounded-md text-sm"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Description"
            className="w-full p-1 outline-none shadow-sm focus-within:shadow-md md:p-2 rounded-md text-sm"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label>Price</label>
          <div className="w-full flex items-center justify-between">
            <input
              onChange={(e) => changePrice(e, 0)}
              type="number"
              defaultValue={price[0]}
              placeholder="Small"
              className="w-[22%] p-2 rounded-lg shadow-sm outline-none focus-within:shadow-md"
            />
            <input
              onChange={(e) => changePrice(e, 1)}
              type="number"
              defaultValue={price[1]}
              placeholder="Median"
              className="w-[22%] p-2 rounded-lg shadow-sm outline-none focus-within:shadow-md"
            />
            <input
              onChange={(e) => changePrice(e, 2)}
              type="number"
              defaultValue={price[2]}
              placeholder="Large"
              className="w-[22%] p-2 rounded-lg shadow-sm outline-none focus-within:shadow-md"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label>ExtraOptions</label>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 flex-grow items-center text-gray-500">
              <select
                onClick={(e) => handleExtraInput(e)}
                name="text"
                className="w-full px-2 py-[9px] rounded-lg shadow-sm outline-none "
              >
                <option>Garlic Sauce</option>
                <option>Spicy Sauce</option>
                <option>Tomato Sauce</option>
              </select>
              <input
                type="number"
                name="price"
                placeholder="Price"
                onChange={(e) => handleExtraInput(e)}
                // defaultValue={1}
                className="w-20 p-2 rounded-lg shadow-sm outline-none focus-within:shadow-md"
              />

              <button
                type="button"
                onClick={handleExtra}
                disabled={extra === null}
                className="disabled:cursor-not-allowed"
              >
                <PlusCircleIcon className="w-12 p-2  h-12  hover:text-red-500" />
              </button>
            </div>

            {extraOptions.length > 0 && (
              <div className="w-1/2 h-24 bg-white px-5 rounded-md shadow-md overflow-y-scroll">
                {extraOptions.length > 0 &&
                  extraOptions.map((option, index) => (
                    <div
                      key={index}
                      className="flex  items-center relative border-b py-1 justify-between"
                    >
                      {/* <XMarkIcon
                        onClick={() => {
                          extraOptions?.filter((_, i) => i !== index);
                        }}
                        className="w-4 h-4 cursor-pointer absolute top-0 -left-4 hover:text-red-400"
                      /> */}
                      <p>{option?.text}</p>
                      <p>${option?.price}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex mt-3 gap-3 ">
          <button
            type="submit"
            className="p-2  bg-green-500 w-full rounded-lg shadow-md hover:bg-green-400 active:bg-green-300"
          >
            {EditMode ? "Update" : "Create"}
          </button>
          <button
            onClick={handleDiscard}
            className="p-2 bg-red-500 w-full rounded-lg shadow-md hover:bg-red-400 active:bg-red-300"
          >
            Discard
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;

// export const getServerSideProps = async (ctx) => {
//   const myCookie = ctx.req?.cookies || "";

//   if (myCookie.token !== process.env.TOKEN) {
//     return {
//       redirect: {
//         destination: "/admin/login",
//         permanent: false,
//       },
//     };
//   }
//   const productRes = await axios.get(process.env.NEXT_URL + "/api/products");
//   const orderRes = await axios.get(process.env.NEXT_URL + "/api/orders");

//   return {
//     props: {
//       orders: orderRes.data,
//       products: productRes.data,
//     },
//   };
// };
