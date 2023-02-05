// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Order from "@/models/Order";
import Product from "@/models/Product";
import dbConnect from "@/uitils/dbConnect";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies,
  } = req;

  const token = cookies.token;

  // connect to mongodb and models
  dbConnect();

  if (method === "GET") {
    try {
      const orders = await Order.findById(id);
      res.status(200).json(orders);
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
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  if (method === "DELETE") {
    if (!token || token !== process.env.TOKEN) {
      toast.error("Not authenticated!");
      res.status(401).json("Not authenticated!");
    }
    try {
      await Order.findByIdAndDelete(id);
      res.status(201).json("Order deleted successfully");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
