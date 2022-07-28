import dbConnect from "../../../util/mongo";
// import Product from "../../../models/Product";
import p_api from "paystack-api";
const paystack = p_api(process.env.PAYSTACK_SECRET);

export default async function handler(req, res) {
  const {
    method,
    // query: { id },
    // cookies
  } = req;

  // connect to database
  dbConnect();

  if (method === "POST") {
    try {
      console.log("trying to pay....");
      const paystackRes = await paystack.transaction.initialize(req.body);
      console.log(paystackRes);
      res.status(200).json(paystackRes);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "GET") {
    try {
      const verifyPayment = await paystack.transaction.verify(req.body);
      res.status(200).json(verifyPayment);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
