const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const cors = require('cors');

const auth = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const stripeRoutes = require('./routes/stripepayment')


const app = express();

require('./prod')(app)


mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("CONNECTED TO DB")
});

//middlewares
app.use(bodyparser.json());
app.use(cookieparser());
app.use(cors());

app.use('/api',auth);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',orderRoutes);
app.use('/api',stripeRoutes)




const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`app is up and running in port ${port}`)
});
