const mongoose = require("mongoose")
const dogsSchema = mongoose.Schema({
dogname: String,
place: String,
price: Number,
family: String
})
module.exports = mongoose.model("Dog", dogsSchema)