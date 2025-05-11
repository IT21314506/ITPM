const mongoose = require('mongoose');
const schema = mongoose.Schema;


const InventorySchema = new mongoose.Schema({
    item:{type:String,required:true},
    Quantity:{type:Number,required:true},
    Price:{type:Number,required:true},
    Category:{type:String,required:true},
    Total:{type:Number,required:true}
})

module.exports=mongoose.model('inventory',InventorySchema);