const mongoose = require('mongoose')
const Schema = mongoose.Schema

const item = new Schema ({
    name : String,
    gender : String, 
    description : String,
    date : {type : Date, default : Date.now},
    image : String
    
})
 module.exports = mongoose.model('item', item)