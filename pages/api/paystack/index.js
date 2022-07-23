import dbConnect from "../../../util/mongo";
// import Product from "../../../models/Product";
import crypto from "crypto";
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

export async function pstackh00k(req, res) {
  const secret = process.env.SECRET_KEY;
  //validate event
  const hash = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");
  if (hash == req.headers["x-paystack-signature"]) {
    try {
      // Retrieve the request's body
    const event = req.body;
    // Do something with event 
     
    } catch (error) {
      console.log('error returned from paystack event-->',error);
    }
  }
  res.send(200);
}
