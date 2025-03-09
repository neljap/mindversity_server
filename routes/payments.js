const {Router} = require("express");
const contact = require("../models/contact");
const { sendEmail } = require("../utils/sendEmail");
const stripe = require("stripe").Stripe(
  "sk_test_51NKjRZHG975uHdTHp6vWTDZP5Qai4VJv0Sr1WUko8WK57ZV0ozKsO18ssFEbLhjsufqIrOh0BNc9ywLwT3FTRUlx00RLY6Dtrj", {
  maxNetworkRetries: 0, // Disable retries
}
);

const router = Router()

const PayRoute = router.post("/payments", async(req, res) => {
      const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.images[1].lg],
          description: item.desc,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "KE"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    success_url: "https://esburger.vercel.app/cart-success",
    cancel_url: "https://esburger.vercel.app/cart",
  });

  res.send({ url: session.url });
})

const ContactRoute = router.post("/contact", async(req, res) => {
  try{
    const {firstName, lastName, state, email, phoneNo1, phoneNo2, message} = req.body;

    const newInfo = await contact.create({
      firstName, lastName, email, state, phoneNo1, phoneNo2, message
    })

    const mailOptions = {
      email,
      subject: "Welcome to Mindversity Sport",
      html: `Hi ${fullname}, Welcome to Mindversity Sport – where every investment opens doors to a world of growth and prosperity. We appreciate your trust in us and are committed to delivering exceptional returns on your investment. Our team is dedicated to navigating the dynamic landscape of opportunities, ensuring your financial goals align seamlessly with our strategic expertise. Together, let's build a future of success, innovation, and wealth. Thank you for choosing Spectrum Capitals as your investment partner.`,
    };

    sendEmail(mailOptions);
    sendEmail({
      email: "ubnkantah@gmail.com",
      subject: `You have a new message from ${firstName}`,
      text: message
    })

    res.status(201).json({
      message:'successful',
      newInfo
    })
  }catch(error){
    res.status(500).send(`Internal Server Error, ${error}`)
  }
})
module.exports = router;