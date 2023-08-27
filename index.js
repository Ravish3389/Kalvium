const express = require('express');
const mongoose = require('mongoose');
const mathRoutes = require('./routes/math');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb+srv://kr9532:Chinni0107@cluster0.1zi7bon.mongodb.net/Kalvium', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (err) {
        console.error(err);
    }
}

connectToDatabase();

app.use('/', mathRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
