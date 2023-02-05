import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(process.env.base_url + "/api/login", {
        username,
        password,
      });
      router.push("/admin");
      toast.success("Login Successful");
    } catch (err) {
      setError(true);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto  w-full h-full flex items-center justify-center">
        <div className=" flex flex-col bg-slate-50 py-10 rounded-lg shadow-lg items-center w-[500px] justify-center ">
          <h1 className="text-xl md:text-2xl font-semibold">Admin Dashboard</h1>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm   flex flex-col items-center gap-5 mt-5"
          >
            <input
              type="text"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="px-5 w-full outline-none shadow-md py-3 rounded-lg"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="px-5 w-full outline-none shadow-md py-3 rounded-lg"
            />
            <button
              type="submit"
              className="bg-gray-500 hover:bg-green-400 w-1/2 py-2 rounded-lg shadow-md text-lg text-white font-serif font-semibold"
            >
              Login
            </button>
            {error && (
              <p className="text-red-500 font-serif">Something Went Wrong</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
