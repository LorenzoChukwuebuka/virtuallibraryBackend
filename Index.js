const express = require('express');
const cors = require('cors');
const db = require('./db');
const logRoute = require('./Routes/loginRoute');
const adminRoute = require('./Routes/admin/adminRoute')
const userRoute = require('./Routes/admin/userRoutes')
 

const app = express();

const PORT = 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}))
 
//routes go here 

app.use('/api/login',logRoute);
app.use('/api/admin',adminRoute)
app.use('/api/user',userRoute)

 





db.connect((err)=>{
    if(err)throw err
});


app.listen(PORT, console.log(`Server running on ${PORT}`));

