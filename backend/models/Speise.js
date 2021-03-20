const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let zutatenSchema = new Schema({
  menge: {
    type: Number
  },
  einheit: {
    type: String
  },
  zutat: {
    type: String
  },
});

let speiseSchema = new Schema({
  speisename: {
    type: String
  },
  zutaten: [zutatenSchema] 
},{
  collection: 'Speise'
})



module.exports = mongoose.model('Speise', speiseSchema)