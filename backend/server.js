let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./config/db');

const dbconnection = async () => {
   await mongoose.connect(dbConfig.db, {
      useNewUrlParser: true
   }).then(() => {
      console.log('Database sucessfully connected')
   },
      error => {
         console.log('Database could not connected: ' + error)
      }
   )
}
dbconnection();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: false
}));
app.use(cors()); 

const customersRoutes = require('./routes/customers.routes')
app.use('/api', customersRoutes);


app.all("*", (req, res) => {
   res.status(404).send(`
      Try any other URLs. (Eg: /api/customers)
   `);
});

const port = 8080;
app.listen(port, () => {
   console.log('Connected to port ' + port)
})