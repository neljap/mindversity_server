const express = require('express');
const app = express()
const cors = require('cors')
const port = 5000
const router = require('./routes/payments')
const database = require('./config/mongodbConnect');

app.use(cors());
app.use(express.json());
database()
app.get("/", (req, res) => {
    res.send('Welcome')
})

app.use("/api", router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})