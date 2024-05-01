

const mongoose =require('mongoose');
const ExpensesSchema =new mongoose.Schema({
    objid:
    {
        type:String
    },
    name:{
        type:String,
        trim:true,
        required:[true,'please provide name']
    },
    amount:{
        type:String,
        required:[true,'please positive']
    },
    desc:{
        type:String
    },
    title:{
        type:String 
    },
    date:
    {
        type:String
    },
    place:
    {
        type:String
    },
    image:
    {
        type:String
    },
});
module.exports =mongoose.model('losts',ExpensesSchema);