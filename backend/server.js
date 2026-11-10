require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRouter = require('./router.js');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(userRouter);
app.use('/user', userRouter);

app.listen(PORT, (error) => {
    if (!error) {
        console.log(
            'Server is Successfully Running, and App is listening on port ' +
                PORT
        );
    } else {
        console.log("Error occurred, server can't start", error);
    }
});
