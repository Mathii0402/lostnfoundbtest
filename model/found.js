const mongoose =require('mongoose');
const FoundsSchema =new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'please provide name']
    },
    objid:{
        type:String,
    },
    number:{
        type:String,
    },
    place:{
        type:String
    },
    address:{
        type:String 
    }

});
module.exports = mongoose.model('founds',FoundsSchema);