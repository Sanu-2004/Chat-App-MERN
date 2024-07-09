const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRoute = require('./routes/auth.route.js')
const massageRoute = require('./routes/massage.route.js');
const userRoute = require('./routes/users.route.js');
const {dbConnect} = require('./db/dbConnect.js');
const {app, server} = require('./socket/Socket.js');

const _dirname = path.resolve();

dotenv.config();


const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: true,
}));


app.use('/api/auth', authRoute);
app.use('/api/massage', massageRoute);
app.use('/api/users', userRoute);

app.use(express.static(path.join(_dirname, "/Frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "/Frontend/dist/index.html"));
});


app.get('/', (req, res) => {
    res.send('Server is running');
    });


server.listen(PORT, () => {
    dbConnect();
    console.log(`Server is running on port ${PORT}`);
});