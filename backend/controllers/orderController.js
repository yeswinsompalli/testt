import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//config variables
const currency = "usd";
const deliveryCharge = 5;
const frontend_URL = 'http://localhost:5173';

// Placing User Order for Frontend using stripe
const placeOrder = async (req, res) =>{
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charge"
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
            line_items: line_items,
            mode: 'payment',
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const verifyorder = async (req,res) => {
    const {orderId, sucess} = req.body;
    try {
        if (sucess=="true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({sucess:true,messga:"paid"})
        }
        else{
            await orderModel.findByIdAndUpdate(orderId);
            res.json({sucesss:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:"Error"})
    }
}

// user orders for frontend
const userorders = async (req,res) => {
    try {
        const orders = await orderModel.find({userid:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,mesaage:"Error"})
    }
}

export{placeOrder,verifyorder}