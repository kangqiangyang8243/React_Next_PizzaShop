import React, { useState } from "react";
import Modal from "react-modal";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { data } from "autoprefixer";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

function AddProduct({ id, EditMode }) {
  //   console.log(id);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);
  const router = useRouter();

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

      await axios.post(process.env.base_url + "/api/products", newProduct);
      toast.success("New Product Added Successfully");
      router.push("/admin");
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
                <PlusCircleIcon className="w-7 h-7  hover:text-red-500" />
              </label>
              <div className="w-20 h-20 rounded-lg border">
                {file && <img src={URL.createObjectURL(file)} alt="" />}
              </div>
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
            className="w-full p-1 outline-none md:p-2 rounded-md text-sm"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Description"
            className="w-full p-1 outline-none md:p-2 rounded-md text-sm"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label>Price</label>
          <div className="w-full flex items-center justify-between">
            <input
              onChange={(e) => changePrice(e, 0)}
              type="number"
              placeholder="Small"
              className="w-[22%] p-2 rounded-lg shadow-sm"
            />
            <input
              onChange={(e) => changePrice(e, 1)}
              type="number"
              placeholder="Median"
              className="w-[22%] p-2 rounded-lg shadow-sm"
            />
            <input
              onChange={(e) => changePrice(e, 2)}
              type="number"
              placeholder="Large"
              className="w-[22%] p-2 rounded-lg shadow-sm"
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
                className="w-full px-2 py-[9px] rounded-lg"
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
                className="w-20 p-2 rounded-lg shadow-sm "
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
            Create
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
