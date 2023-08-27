const express = require('express');
const mongoose = require('mongoose');
const mathRoutes = require('./routes/math');

const app = express();
const PORT = 3000;

app.use(express.json());

async function connection(){
    try{
        await mongoose.connect('mongodb+srv://kr9532:Chinni0107@cluster0.1zi7bon.mongodb.net/Kalvium');
        console.log("Database connected sucessfully");
    }
    catch(err){
        console.error(err);
    }
}
  
connection();


app.use('/', mathRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


