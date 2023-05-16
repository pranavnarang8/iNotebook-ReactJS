const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdditionalDetailsSchema = new Schema({
    user:{
      //User of foreign key (sql) to link user with their notes in type:
      type: mongoose.Schema.Types.ObjectId, 
      //Need to provide a reference model, from where the foreign key will come
      ref: 'user'
    },
    contact:{
      type: Number
    },
    address:{
      type: String
    },
    locality:{
      type: String
    },
    city:{
      type: String
    },
    state:{
      type: String
    },
    zip:{
      type: Number
    }
    });
  
   const AdditionalDetails = mongoose.model('additionalDetails', AdditionalDetailsSchema);
   module.exports = AdditionalDetails