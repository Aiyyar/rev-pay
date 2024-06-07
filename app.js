const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const businessRoutes = require('./routes/businessRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/revpay')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/business', businessRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/transaction', transactionRoutes);
const PORT=process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


