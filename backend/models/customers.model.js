const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Customers = new Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   address: {
      type: String,
      required: true
   },
   phoneNumber: {
      type: Number,
      required: true
   }
}, {
   collection: 'customers'
})

module.exports = mongoose.model('customers', Customers)