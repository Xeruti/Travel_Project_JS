const mongoose = require('mongoose')

const TripSchema = new mongoose.Schema({
    title:String,
    photos: [String],
    shortDescription:String,
    description:String,
    maxPersons:Number,
    days:Number,
    departure:Date,
    returnDate:Date,
    price:Number,
    users:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
})

const TripModel = mongoose.model('Trip', TripSchema)

module.exports = TripModel