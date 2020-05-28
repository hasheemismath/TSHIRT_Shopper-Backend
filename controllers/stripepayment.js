const stripe =require('stripe')(process.env.STRIPE_SECRETKEY);
const uuid = require('uuid/v4');




exports.makepayment=(req,res)=>{
    const {products,token} = req.body;

    let amount = 0;
    products.map(p => {
        amount = amount + p.price;
    });

    const idempotencyKey = uuid()

    return stripe.customers.create({
        email: token.email,
        source:token.id
    }).then(customer=>{
        stripe.charges.create({
            amount:amount * 100,
            currency:'usd',
            customer:customer.id,
            receipt_email:token.email,
            description: 'A test Account',
            shipping:{
                name:token.card.name,
                address:{
                    line1:token.card.address_line1,
                    line2:token.card.address_line2,
                    city:token.card.address_city,
                    country:token.card.address_country,
                    postalCode: token.card.address_postal_code
                }
            }
        },{idempotencyKey})
            .then(result=>res.status(200).json(result))
            .catch(error=>console.log(error))
    })


}