const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Customers = new Schema({
   name: {
      type: String
   },
   email: {
      type: String
   },
   address: {
      type: String
   },
   phoneNumber: {
      type: Number
   }
}, {
   collection: 'customers'
})

module.exports = mongoose.model('customers', Customers)