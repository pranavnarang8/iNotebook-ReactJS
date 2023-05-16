const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
      //User of foreign key (sql) to link user with their notes in type:
      type: mongoose.Schema.Types.ObjectId, 
      //Need to provide a reference model, from where the foreign key will come
      ref: 'user'
    },
    title:{
      type: String,
      required: true
    },
    description:{
      type: String,
      required: true
    },
    tag:{
      type: String,
      default: "General"
    },
    date:{
      type: Date,
      default: Date.now
    }
    });
  
   const Notes = mongoose.model('notes', NotesSchema);
   module.exports = Notes