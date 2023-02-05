// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Order from "@/models/Order";
import Product from "@/models/Product";
import dbConnect from "@/uitils/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  // connect to mongodb and models
  dbConnect();

  if (method === "GET") {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  if (method === "POST") {
    try {
      const orders = await Order.create(req.body);
      res.status(201).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
