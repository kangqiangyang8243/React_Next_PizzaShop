// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "@/models/Product";
import dbConnect from "@/uitils/dbConnect";
import { toast } from "react-toastify";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies,
  } = req;

  const token = cookies.token;
  // console.log(token);

  // connect to mongodb and models
  dbConnect();

  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  if (method === "PUT") {
    if (!token || token !== process.env.TOKEN) {
      toast.error("Not authenticated!");
      res.status(401).json("Not authenticated!");
    }
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  if (method === "DELETE") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Not authenticated!");
    }
    try {
      await Product.findByIdAndDelete(id);
      res.status(201).json("The product has been deleted");
      toast.success("The product has been deleted");
    } catch (error) {
      res.status(500).json({ message: error.message });
      toast.error(error.message);
    }
  }
}
