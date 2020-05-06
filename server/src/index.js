const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const middlewares = require('./middlewares');
const logs = require('./api/logs')



const app = express();
const url = process.env.DATABASE_URL;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database Successfully Connected')
}, error => {
    console.log(error)
});



app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: "hi!"
    })
})

app.use('/api/logs', logs)


app.use(middlewares.notFound);
app.use(middlewares.errorHandler)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('server up!');
});
