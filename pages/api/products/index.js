// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "@/models/Product";
import dbConnect from "@/uitils/dbConnect";

export default async function handler(req, res) {
  const { method } = req;

  // connect to mongodb and models
  dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  if (method === "POST") {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
