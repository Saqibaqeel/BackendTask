const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
     default: "https://images.unsplash.com/photo-1518173946687-a4c889d09e30?auto=format&fit=crop&w=800&q=60",
  },
  price: {
    type: Number,
    required: true,
  },
  quality: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('Product', listingSchema);
module.exports = Product;
