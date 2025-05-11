const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
    item:{type:String,required:true},
    Quantity:{type:Number,required:true},
    Price:{type:Number,required:true},
    Total:{type:Number,required:true}
});

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);

module.exports = ShoppingList;

