const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

connectToMongo();




const app = express()
const port = 5000

app.use(cors());
app.use(express.json());


//Available Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/additionaldetails', require('./routes/additionalDetails'))

app.listen(port, () => {
  console.log(`iNotebook backend app listening on port ${port}`)
})