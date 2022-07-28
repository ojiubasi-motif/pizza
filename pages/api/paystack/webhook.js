import crypto from "crypto";
import dbConnect from "../../../util/mongo";


export default async function handler(req, res) {
    const secret = process.env.PAYSTACK_SECRET;
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
      console.log(event);
       
      } catch (error) {
        console.log('error returned from paystack event-->',error);
      }
    }
    res.send(200);
  }
  
