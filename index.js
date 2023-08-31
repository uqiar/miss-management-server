const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
//const Cron = require('./mongodb_backup')
require('dotenv').config();

//mongoose connections
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, ((err, db) => {
    if (err) {
        console.log(process.env.DATABASE)
        console.log("mongodb connection failed!!!!")
    } else {
        console.log("mongodb connected success")
        require("./cron")
    }
}))

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use(cookieParser());
app.use(cors());

app.get("/test",(req,res)=>{
    console.log("requiest come here",new Date())
    res.status(200).json("your server is running")
})


require('./api/routes/user')(app)
require('./api/routes/uploadImage')(app)
require('./api/routes/items')(app)
require('./api/routes/monthly_config')(app)
require('./api/routes/otherExpenses')(app)
require('./api/routes/myBook')(app)
require('./api/routes/tourFunBooking')(app)

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`server is running on port ${port} time- ${new Date()}`)
})